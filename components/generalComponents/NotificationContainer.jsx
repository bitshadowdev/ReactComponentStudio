'use client';

import React from 'react';
import { useNotificationStore } from '@/stores/notificationStore';
import NotificationToast from './NotificationToast';

const NotificationContainer = () => {
  const notifications = useNotificationStore(state => state.notifications);
  const removeNotification = useNotificationStore(state => state.removeNotification);

  const handleUndo = (notification) => {
    if (notification.command && typeof notification.command.undo === 'function') {
      notification.command.undo();
    }
  };

  const handleClose = (id) => {
    removeNotification(id);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      {notifications.map((notification) => (
        <div key={notification.id} className="pointer-events-auto">
          <NotificationToast
            id={notification.id}
            message={notification.message}
            commandType={notification.commandType}
            canUndo={notification.canUndo}
            onUndo={() => handleUndo(notification)}
            onClose={() => handleClose(notification.id)}
            duration={notification.duration}
          />
        </div>
      ))}
    </div>
  );
};

export default NotificationContainer;
