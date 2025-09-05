'use client';

import { useNotificationStore } from '@/stores/notificationStore';

export const useNotificationHandlers = () => {
  const { removeNotification } = useNotificationStore();

  const handleUndo = (notification) => {
    if (notification.command && typeof notification.command.undo === 'function') {
      notification.command.undo();
    }
    removeNotification(notification.id);
  };

  const handleClose = (id) => {
    removeNotification(id);
  };

  return { handleUndo, handleClose };
};

export const getNotificationIcon = (commandType) => {
  // Icon mapping logic here
  // Return appropriate icon based on commandType
};
