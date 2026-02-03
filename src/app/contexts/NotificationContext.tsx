import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useAuth } from './AuthContext';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useNotifications } from '../hooks/useApi';
import { useLanguage } from './LanguageContext';
import type { NotificationDTO, NotificationPriority } from '../types';
import { getLocalizedString } from '../lib/utils';

interface NotificationContextType {
    notifications: NotificationDTO[];
    unreadCount: number;
    isLoading: boolean;
    markAsRead: (id: string) => Promise<void>;
    markAllAsRead: () => Promise<void>;
    isConnected: boolean;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
    const { user, isLoggedIn } = useAuth();
    const queryClient = useQueryClient();
    const { language } = useLanguage();
    const [isConnected, setIsConnected] = useState(false);

    // Use the existing React Query hook for initial load and caching
    const { data: notificationsData, isLoading } = useNotifications(false);
    const notifications = notificationsData || [];
    const unreadCount = notifications.filter(n => !n.read).length;

    const markAsRead = useCallback(async (id: string) => {
        // Invalidation happens in the hook's mutation usually, 
        // but we can add specific logic here if needed.
    }, []);

    const markAllAsRead = useCallback(async () => {
        // Logic for bulk marking
    }, []);

    // WebSocket Connection Management
    useEffect(() => {
        if (!isLoggedIn || !user) {
            setIsConnected(false);
            return;
        }

        const wsUrl = import.meta.env.VITE_WS_URL || 'http://localhost:9985/ws-notifications';
        const jwt = localStorage.getItem('auth_token');
        if (jwt == undefined) {
            return;
        }
        const socket = new SockJS(`${wsUrl}`);

        const stompClient = Stomp.over(socket);

        // Disable debug logs in production
        if (import.meta.env.PROD) {
            stompClient.debug = () => { };
        }

        stompClient.connect({}, (frame) => {
            console.log('Connected to Notification WebSocket');
            setIsConnected(true);

            stompClient.subscribe('/topic/notifications', (message) => {
                try {
                    const notification: NotificationDTO = JSON.parse(message.body);

                    // 1. Invalidate React Query to fetch the new list
                    queryClient.invalidateQueries({ queryKey: ['user', 'notifications'] });

                    // 2. Visual Feedback (Toast) based on priority
                    showNotificationToast(notification);

                } catch (error) {
                    console.error('Error handling WebSocket message:', error);
                }
            });
        }, (error) => {
            console.error('WebSocket connection error:', error);
            setIsConnected(false);
        });

        return () => {
            if (stompClient.connected) {
                stompClient.disconnect(() => setIsConnected(false));
            }
        };
    }, [isLoggedIn, user, queryClient]);

    const showNotificationToast = (notification: NotificationDTO) => {
        const isUrgent = notification.priority === 'urgent' || notification.priority === 'high';

        const title = getLocalizedString(notification.title, language);
        const description = getLocalizedString(notification.message, language);

        toast(title, {
            description: description,
            duration: isUrgent ? 10000 : 5000,
            action: notification.actionUrl ? {
                label: getLocalizedString(notification.actionLabel || { fr: 'Voir', en: 'View', de: 'Ansehen' }, language),
                onClick: () => window.location.href = notification.actionUrl!
            } : undefined,
        });
    };

    return (
        <NotificationContext.Provider value={{
            notifications,
            unreadCount,
            isLoading,
            markAsRead,
            markAllAsRead,
            isConnected
        }}>
            {children}
        </NotificationContext.Provider>
    );
}

export const useNotificationCenter = () => {
    const context = useContext(NotificationContext);
    if (!context) throw new Error('useNotificationCenter must be used within NotificationProvider');
    return context;
};
