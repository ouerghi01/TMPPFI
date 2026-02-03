import { useState } from 'react';
import {
  Bell, X, Check, CheckCheck,
  FileQuestion, ScrollText, Vote, Users,
  Presentation, MessageCircle, Cpu, AlertTriangle,
  ExternalLink, Info, MapPin, Rocket, Palette
} from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { useMarkNotificationAsRead } from '@/app/hooks/useApi';
import type { NotificationDTO, NotificationType, NotificationPriority } from '@/app/types';
import { Link } from 'react-router-dom';
import { useNotificationCenter } from '@/app/contexts/NotificationContext';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/app/lib/utils';

/**
 * UX Mapping for Notification Types
 */
const TYPE_CONFIG: Record<NotificationType, { icon: any, color: string }> = {
  consultation: { icon: FileQuestion, color: 'text-blue-600' },
  petition: { icon: ScrollText, color: 'text-purple-600' },
  vote: { icon: Vote, color: 'text-emerald-600' },
  assembly: { icon: Users, color: 'text-indigo-600' },
  conference: { icon: Presentation, color: 'text-orange-600' },
  comment: { icon: MessageCircle, color: 'text-pink-600' },
  system: { icon: Cpu, color: 'text-gray-600' },
  signalement: { icon: MapPin, color: 'text-red-600' },
  youth_space: { icon: Rocket, color: 'text-cyan-600' },
  theme: { icon: Palette, color: 'text-pink-500' }
};

/**
 * UX Mapping for Priority Levels
 */
const PRIORITY_STYLES: Record<NotificationPriority, string> = {
  urgent: "border-l-4 border-l-red-600 bg-red-50/50 shadow-sm",
  high: "border-l-4 border-l-orange-500 bg-orange-50/30",
  normal: "border-l-4 border-l-blue-500",
  low: "border-l-4 border-l-gray-300 opacity-80"
};

export function NotificationCenter() {
  const { language, tLocal } = useLanguage();
  const { notifications, unreadCount, isConnected, isLoading } = useNotificationCenter();
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const markAsReadMutation = useMarkNotificationAsRead();

  const filteredNotifications = filter === 'unread'
    ? notifications.filter(n => !n.read)
    : notifications;

  const handleMarkAllAsRead = async () => {
    const unread = notifications.filter(n => !n.read);
    for (const n of unread) {
      await markAsReadMutation.mutateAsync(n.id);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative group">
          <Bell className={cn(
            "w-5 h-5 transition-transform group-hover:rotate-12",
            isConnected ? "text-gray-700" : "text-gray-400"
          )} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center ring-2 ring-white animate-in zoom-in">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
          {/* Connection Status Indicator */}
          <span className={cn(
            "absolute bottom-0 right-0 w-2 h-2 rounded-full ring-1 ring-white",
            isConnected ? "bg-green-500" : "bg-orange-400"
          )} />
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-md p-0 flex flex-col">
        <SheetHeader className="p-6 border-b bg-white/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <SheetTitle className="text-xl font-bold">
                {language === 'fr' ? 'Notifications' : language === 'de' ? 'Mitteilungen' : 'Notifications'}
              </SheetTitle>
              <p className="text-sm text-gray-500">
                {isConnected ?
                  (language === 'fr' ? 'Connecté en temps réel' : 'Real-time connected') :
                  (language === 'fr' ? 'Mode hors-ligne' : 'Offline mode')}
              </p>
            </div>
            {unreadCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleMarkAllAsRead}
                disabled={markAsReadMutation.isPending}
                className="text-xs gap-2"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                {language === 'fr' ? 'Tout lire' : 'Mark all read'}
              </Button>
            )}
          </div>

          <Tabs value={filter} onValueChange={(v) => setFilter(v as 'all' | 'unread')} className="mt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="all">
                {language === 'fr' ? 'Toutes' : 'All'}
              </TabsTrigger>
              <TabsTrigger value="unread" className="relative">
                {language === 'fr' ? 'Non lues' : 'Unread'}
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-700 pointer-events-none">
                    {unreadCount}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </SheetHeader>

        <ScrollArea className="flex-1">
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              <div className="p-12 text-center space-y-3">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-gray-500 animate-pulse">Synchronisation...</p>
              </div>
            ) : filteredNotifications.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-12 text-center"
              >
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  {language === 'fr' ? 'C\'est calme ici' : 'Everything is read'}
                </h3>
                <p className="text-gray-500 max-w-[200px] mx-auto mt-2 text-sm">
                  {language === 'fr' ? 'Vous n\'avez pas de nouvelles notifications pour le moment.' : 'You have no new notifications right now.'}
                </p>
              </motion.div>
            ) : (
              <div className="divide-y">
                {filteredNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onClose={() => setOpen(false)}
                  />
                ))}
              </div>
            )}
          </AnimatePresence>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

function NotificationItem({ notification, onClose }: { notification: NotificationDTO, onClose: () => void }) {
  const { language, tLocal } = useLanguage();
  const markAsReadMutation = useMarkNotificationAsRead();
  const config = TYPE_CONFIG[notification.type] || TYPE_CONFIG.system;
  const TypeIcon = config.icon;

  const handleAction = async (e: React.MouseEvent) => {
    if (!notification.read) {
      await markAsReadMutation.mutateAsync(notification.id);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      drag="x"
      dragConstraints={{ left: -100, right: 0 }}
      dragElastic={0.2}
      onDragEnd={async (_, info) => {
        if (info.offset.x < -80 && !notification.read) {
          await markAsReadMutation.mutateAsync(notification.id);
        }
      }}
      className={cn(
        "relative p-4 transition-all duration-200 hover:bg-gray-50 group cursor-default active:cursor-grabbing",
        PRIORITY_STYLES[notification.priority],
        !notification.read ? "bg-white" : "bg-gray-50/50 grayscale-[0.5]"
      )}
    >
      <div className="flex gap-4">
        {/* Icon Container block */}
        <div className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
          !notification.read ? "bg-white shadow-sm ring-1 ring-gray-100" : "bg-gray-100"
        )}>
          <TypeIcon className={cn("w-5 h-5", config.color)} />
          {notification.priority === 'urgent' && (
            <span className="absolute top-3 left-3 w-3 h-3 bg-red-500 rounded-full animate-ping opacity-75" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-1">
            <h4 className={cn(
              "text-sm font-semibold truncate pr-4",
              !notification.read ? "text-gray-900" : "text-gray-600"
            )}>
              {tLocal(notification.title)}
            </h4>
            <span className="text-[10px] text-gray-400 whitespace-nowrap mt-1">
              {new Date(notification.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>

          <p className={cn(
            "text-sm line-clamp-2 leading-relaxed mb-3",
            !notification.read ? "text-gray-600" : "text-gray-400"
          )}>
            {tLocal(notification.message)}
          </p>

          <AnimatePresence>
            {!notification.read && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className="flex gap-2 overflow-hidden"
              >
                {notification.actionUrl ? (
                  <Button
                    asChild
                    size="sm"
                    className="h-8 text-xs font-medium"
                    onClick={handleAction}
                  >
                    <Link to={notification.actionUrl} onClick={onClose}>
                      {notification.actionLabel ? tLocal(notification.actionLabel) : (language === 'fr' ? 'Consulter' : 'View')}
                      <ExternalLink className="w-3 h-3 ml-2" />
                    </Link>
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    onClick={handleAction}
                  >
                    <Check className="w-3.5 h-3.5 mr-1" />
                    {language === 'fr' ? 'Marquer comme lu' : 'Mark as read'}
                  </Button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Urgent/High Priority Badge */}
        {(notification.priority === 'urgent' || notification.priority === 'high') && (
          <div className="absolute top-0 right-0 p-1">
            <AlertTriangle className={cn(
              "w-4 h-4",
              notification.priority === 'urgent' ? "text-red-500" : "text-orange-400"
            )} />
          </div>
        )}
      </div>
    </motion.div>
  );
}
