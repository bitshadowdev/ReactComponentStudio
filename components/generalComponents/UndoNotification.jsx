'use client';

import { useCallback } from 'react';
import { useUndoNotification } from '@/hooks/notifications/useUndoNotification';
import { useStrings } from '@/hooks/configuration/useStrings';

const UndoNotification = ({ 
  show, 
  message, 
  onUndo, 
  onClose, 
  duration = 5000 
}) => {
  const { strings } = useStrings();
  const { isVisible, handleClose } = useUndoNotification({ show, duration });

  const handleUndo = useCallback(() => {
    onUndo();
    handleClose(onClose);
  }, [onUndo, onClose, handleClose]);

  const handleNotificationClose = useCallback(() => {
    handleClose(onClose);
  }, [onClose, handleClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 undo-notification">
      <div className="bg-settings-bg-primary dark:bg-settings-dark-bg-primary border border-settings-surface-border dark:border-settings-dark-surface-border rounded-settings shadow-settings-lg dark:shadow-settings-lg-dark px-4 py-3 flex items-center space-x-3 min-w-80">
        <div className="flex-1">
          <p className="text-settings-sm text-settings-text-primary dark:text-settings-dark-text-primary">{message}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleUndo}
            className="px-3 py-1 text-settings-sm font-medium text-settings-accent-primary dark:text-settings-dark-accent-primary hover:text-settings-accent-hover dark:hover:text-settings-dark-accent-hover transition-colors"
          >
            {strings?.actions?.undo || 'Deshacer'}
          </button>
          <button
            onClick={handleNotificationClose}
            className="px-3 py-1 text-settings-sm font-medium text-settings-text-secondary dark:text-settings-dark-text-secondary hover:text-settings-text-primary dark:hover:text-settings-dark-text-primary transition-colors"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default UndoNotification;
