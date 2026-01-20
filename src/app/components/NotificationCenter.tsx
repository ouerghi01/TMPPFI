import React, { useState } from 'react';
import { Bell, X, Check, CheckCheck, Filter, Trash2 } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { useNotifications, useMarkNotificationAsRead } from '@/app/hooks/useApi';
import type { NotificationDTO } from '@/app/types';
import { Link } from 'react-router-dom';

/**
 * NotificationCenter - Centre de notifications UI
 * 
 * Affiche les notifications de l'utilisateur avec:
 * - Panneau latéral (Sheet) pour mobile/desktop
 * - Filtrage par état (toutes/non lues)
 * - Actions de lecture/suppression
 * - Badge de compteur sur l'icône
 */
export function NotificationCenter() {
  const { t, language, tLocal } = useLanguage();
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  
  const { data: allNotifications, isLoading } = useNotifications(false);
  const { data: unreadNotifications } = useNotifications(true);
  const markAsReadMutation = useMarkNotificationAsRead();

  const notifications = filter === 'unread' 
    ? (unreadNotifications || [])
    : (allNotifications || []);

  const unreadCount = unreadNotifications?.length || 0;

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await markAsReadMutation.mutateAsync(notificationId);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    if (!unreadNotifications) return;
    
    try {
      for (const notification of unreadNotifications) {
        if (!notification.read) {
          await markAsReadMutation.mutateAsync(notification.id);
        }
      }
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'normal':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'low':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMins = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMs / 3600000);
    const diffInDays = Math.floor(diffInMs / 86400000);

    if (diffInMins < 1) {
      return language === 'fr' ? "À l'instant" : language === 'de' ? 'Gerade eben' : 'Just now';
    } else if (diffInMins < 60) {
      return language === 'fr' ? `Il y a ${diffInMins} min` : 
             language === 'de' ? `Vor ${diffInMins} Min` : 
             `${diffInMins} min ago`;
    } else if (diffInHours < 24) {
      return language === 'fr' ? `Il y a ${diffInHours}h` : 
             language === 'de' ? `Vor ${diffInHours}h` : 
             `${diffInHours}h ago`;
    } else if (diffInDays < 7) {
      return language === 'fr' ? `Il y a ${diffInDays}j` : 
             language === 'de' ? `Vor ${diffInDays}d` : 
             `${diffInDays}d ago`;
    } else {
      return date.toLocaleDateString(language);
    }
  };

  const NotificationItem = ({ notification }: { notification: NotificationDTO }) => {
    const handleClick = () => {
      if (!notification.read) {
        handleMarkAsRead(notification.id);
      }
      if (notification.actionUrl) {
        setOpen(false);
      }
    };

    const content = (
      <div 
        className={`
          p-4 border-b hover:bg-gray-50 transition-colors cursor-pointer
          ${!notification.read ? 'bg-blue-50/50' : ''}
        `}
        onClick={handleClick}
      >
        <div className="flex items-start gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h4 className="font-semibold text-sm line-clamp-1">
                {tLocal(notification.title)}
              </h4>
              {!notification.read && (
                <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1.5" />
              )}
            </div>
            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
              {tLocal(notification.message)}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">
                {formatDate(notification.createdAt)}
              </span>
              {notification.priority !== 'normal' && (
                <Badge className={getPriorityColor(notification.priority)} variant="outline">
                  {notification.priority}
                </Badge>
              )}
            </div>
          </div>
          {!notification.read && (
            <Button
              variant="ghost"
              size="sm"
              className="flex-shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                handleMarkAsRead(notification.id);
              }}
            >
              <Check className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    );

    if (notification.actionUrl) {
      return <Link to={notification.actionUrl}>{content}</Link>;
    }

    return content;
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-md p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="p-4 border-b">
            <div className="flex items-center justify-between">
              <SheetTitle>
                {language === 'fr' ? 'Notifications' : 
                 language === 'de' ? 'Benachrichtigungen' : 
                 'Notifications'}
              </SheetTitle>
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleMarkAllAsRead}
                  disabled={markAsReadMutation.isPending}
                >
                  <CheckCheck className="w-4 h-4 mr-2" />
                  {language === 'fr' ? 'Tout lire' : 
                   language === 'de' ? 'Alle lesen' : 
                   'Mark all read'}
                </Button>
              )}
            </div>
          </SheetHeader>

          {/* Filtres */}
          <div className="p-4 border-b">
            <Tabs value={filter} onValueChange={(v) => setFilter(v as 'all' | 'unread')}>
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="all">
                  {language === 'fr' ? 'Toutes' : language === 'de' ? 'Alle' : 'All'}
                  {allNotifications && (
                    <Badge variant="secondary" className="ml-2">
                      {allNotifications.length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="unread">
                  {language === 'fr' ? 'Non lues' : language === 'de' ? 'Ungelesen' : 'Unread'}
                  {unreadCount > 0 && (
                    <Badge variant="secondary" className="ml-2 bg-blue-100">
                      {unreadCount}
                    </Badge>
                  )}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Liste des notifications */}
          <ScrollArea className="flex-1">
            {isLoading ? (
              <div className="p-8 text-center text-gray-500">
                {language === 'fr' ? 'Chargement...' : 
                 language === 'de' ? 'Laden...' : 
                 'Loading...'}
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-gray-500">
                  {filter === 'unread' 
                    ? (language === 'fr' ? 'Aucune notification non lue' : 
                       language === 'de' ? 'Keine ungelesenen Benachrichtigungen' : 
                       'No unread notifications')
                    : (language === 'fr' ? 'Aucune notification' : 
                       language === 'de' ? 'Keine Benachrichtigungen' : 
                       'No notifications')
                  }
                </p>
              </div>
            ) : (
              <div>
                {notifications.map((notification) => (
                  <NotificationItem key={notification.id} notification={notification} />
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
}
