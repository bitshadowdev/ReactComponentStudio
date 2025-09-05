'use client';

import { useEffect } from 'react';
import { commandManager } from '@/utils/commands';
import { useNotificationStore } from '@/stores/notificationStore';

export default function ClientLayout({ children }) {
  const { addCommandNotification } = useNotificationStore();

  // Initialize notification system with CommandManager
  useEffect(() => {
    commandManager.setNotificationCallback((commandType, command) => {
      addCommandNotification(commandType, command);
    });
  }, [addCommandNotification]);

  return <>{children}</>;
}
