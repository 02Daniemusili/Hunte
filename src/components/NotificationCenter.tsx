import React, { useState } from 'react';
import { NotificationItem, Property } from '../types';
import { 
  Bell, 
  Check, 
  Trash2, 
  Sparkles, 
  DollarSign, 
  Calendar, 
  MessageCircle, 
  Volume2, 
  VolumeX, 
  X,
  Radio,
  ExternalLink
} from 'lucide-react';

interface NotificationCenterProps {
  notifications: NotificationItem[];
  unreadCount: number;
  isOpen: boolean;
  onToggle: () => void;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
  onSelectNotification: (notification: NotificationItem) => void;
  onSimulateAlert: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  unreadCount,
  isOpen,
  onToggle,
  onMarkAllAsRead,
  onClearAll,
  onSelectNotification,
  onSimulateAlert
}) => {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const displayedNotifications = filter === 'unread'
    ? notifications.filter((n) => !n.read)
    : notifications;

  const getIconForType = (type: NotificationItem['type']) => {
    switch (type) {
      case 'price_drop':
        return <DollarSign className="w-4 h-4 text-emerald-600" />;
      case 'viewing_status':
        return <Calendar className="w-4 h-4 text-blue-600" />;
      case 'enquiry_reply':
        return <MessageCircle className="w-4 h-4 text-purple-600" />;
      case 'new_listing':
      default:
        return <Sparkles className="w-4 h-4 text-amber-600" />;
    }
  };

  return (
    <div className="relative">
      {/* Bell Trigger Button */}
      <button
        onClick={onToggle}
        className="relative p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
        title="Real-time Notifications"
        aria-label="Real-time notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-emerald-600 rounded-full ring-2 ring-white">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Popover Flyout */}
      {isOpen && (
        <div className="absolute right-0 top-12 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-top-2">
          {/* Header */}
          <div className="p-4 border-b border-slate-100 bg-slate-50/70">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-emerald-600 animate-pulse" />
                <h4 className="font-bold text-slate-900 text-sm">Real-time Rental Alerts</h4>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50"
                  title={soundEnabled ? 'Disable Chime' : 'Enable Chime'}
                >
                  {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={onToggle}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Filter Tabs & Quick Action */}
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-1 bg-slate-200/60 p-0.5 rounded-lg text-xs">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    filter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All ({notifications.length})
                </button>
                <button
                  onClick={() => setFilter('unread')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    filter === 'unread' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Unread ({unreadCount})
                </button>
              </div>

              {unreadCount > 0 && (
                <button
                  onClick={onMarkAllAsRead}
                  className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" />
                  Mark all read
                </button>
              )}
            </div>
          </div>

          {/* Test Live Notification Button */}
          <div className="px-4 py-2 bg-emerald-50/70 border-b border-emerald-100 flex items-center justify-between">
            <span className="text-[11px] text-emerald-900 font-medium">
              Want to see real-time triggers?
            </span>
            <button
              onClick={onSimulateAlert}
              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              Simulate Live Alert
            </button>
          </div>

          {/* Notification List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
            {displayedNotifications.length === 0 ? (
              <div className="py-8 px-4 text-center text-slate-400">
                <Bell className="w-8 h-8 mx-auto text-slate-300 mb-2 stroke-[1.5]" />
                <p className="text-xs font-medium">No alerts right now</p>
                <p className="text-[11px] text-slate-400 mt-1">
                  You'll be instantly notified when new rentals or price drops happen in your preferred estates.
                </p>
              </div>
            ) : (
              displayedNotifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => onSelectNotification(notif)}
                  className={`p-3.5 hover:bg-slate-50 transition-colors cursor-pointer flex items-start gap-3 ${
                    !notif.read ? 'bg-emerald-50/30' : ''
                  }`}
                >
                  <div className="p-2 bg-white rounded-xl shadow-xs border border-slate-200 shrink-0">
                    {getIconForType(notif.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-semibold text-xs text-slate-900 truncate">
                        {notif.title}
                      </span>
                      <span className="text-[10px] text-slate-400 shrink-0 tabular-nums">
                        {notif.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5 leading-snug">
                      {notif.message}
                    </p>
                    {notif.estate && (
                      <div className="mt-1 flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                        <span>Estate: {notif.estate}</span>
                        <ExternalLink className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="text-[11px]">Instant alerts powered by HouseHunt Engine</span>
              <button
                onClick={onClearAll}
                className="text-slate-400 hover:text-red-600 p-1 transition-colors"
                title="Clear all alerts"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
