import React from 'react';
import { Bell, Star, Users, MessageSquare } from 'lucide-react';
import { useProject } from '../contexts/ProjectContext';

const notifications = [
  {
    id: 1,
    type: 'collaboration',
    icon: Users,
    message: 'Sarah invited you to collaborate on "Digital Dreams"',
    time: '2 minutes ago',
    unread: true
  },
  {
    id: 2,
    type: 'message',
    icon: MessageSquare,
    message: 'New message in Sound Designers United',
    time: '1 hour ago',
    unread: true
  },
  {
    id: 3,
    type: 'feature',
    icon: Star,
    message: 'Your project "Ethereal Soundscapes" was featured',
    time: '2 hours ago',
    unread: false
  }
];

export function Notifications() {
  const { activeColor } = useProject();

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <Bell className="h-8 w-8" />
        <h1 className="text-3xl font-light tracking-wider">Notifications</h1>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => {
          const Icon = notification.icon;
          return (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border border-zinc-800 transition-all duration-700 ${
                notification.unread ? 'bg-zinc-900/50' : 'bg-transparent'
              }`}
              style={{
                borderColor: notification.unread && activeColor 
                  ? `rgba(${activeColor}, 0.2)` 
                  : undefined,
                backgroundColor: notification.unread && activeColor 
                  ? `rgba(${activeColor}, 0.02)` 
                  : undefined
              }}
            >
              <div className="flex items-center gap-4">
                <div 
                  className="p-2 rounded-lg"
                  style={{
                    backgroundColor: activeColor 
                      ? `rgba(${activeColor}, 0.1)` 
                      : 'rgba(255, 255, 255, 0.05)'
                  }}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm">{notification.message}</p>
                  <span className="text-xs text-zinc-400">{notification.time}</span>
                </div>
                {notification.unread && (
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: activeColor 
                        ? `rgb(${activeColor})` 
                        : 'rgb(255, 255, 255)'
                    }}
                  ></div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}