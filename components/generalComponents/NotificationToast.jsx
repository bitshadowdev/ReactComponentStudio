'use client';

import React from 'react';
import { FaUndo, FaTimes, FaCheck, FaCog, FaCode } from 'react-icons/fa';
import { useNotificationHandlers, getNotificationIcon } from '@/utils/notificationLogic';
import ToastWrapper from '@/components/animationWrappers/ToastWrapper';

const NotificationToast = ({ 
  id,
  message, 
  commandType, 
  canUndo, 
  duration 
}) => {
  const { handleUndo, handleClose } = useNotificationHandlers();
  const icon = getNotificationIcon(commandType);

  return (
    <ToastWrapper id={id}>
      <div
        className="bg-notification-bg-primary border border-notification-border-primary rounded-lg shadow-lg p-4 min-w-80 max-w-96"
      >
        <div className="flex items-start gap-3">
          {icon}
          
          <div className="flex-1">
            <p className="text-sm text-notification-text-primary font-medium">
              {message}
            </p>
          </div>
          
          <div className="flex items-center gap-1">
            {canUndo && (
              <button
                onClick={() => handleUndo({ id, commandType })}
                className="p-1.5 text-component-interactive-undo-text hover:text-component-interactive-undo-hover-text hover:bg-component-interactive-undo-hover-bg rounded transition-colors"
                title="Deshacer"
              >
                <FaUndo size={12} />
              </button>
            )}
            
            <button
              onClick={() => handleClose(id)}
              className="p-1.5 text-component-interactive-close-text hover:text-component-interactive-close-hover-text hover:bg-component-interactive-close-hover-bg rounded transition-colors"
            >
              <FaTimes size={12} />
            </button>
          </div>
        </div>
      </div>
    </ToastWrapper>
  );
};

export default NotificationToast;
