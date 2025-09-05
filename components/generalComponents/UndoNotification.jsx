'use client';

import { useState, useEffect } from 'react';
import { gsap } from 'gsap';

const UndoNotification = ({ 
  show, 
  message, 
  onUndo, 
  onClose, 
  duration = 5000 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      // Auto-hide after duration
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [show, duration]);

  useEffect(() => {
    if (isVisible) {
      // Animate in from bottom
      gsap.fromTo('.undo-notification', 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [isVisible]);

  const handleClose = () => {
    // Animate out to bottom
    gsap.to('.undo-notification', {
      y: 100,
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        setIsVisible(false);
        onClose();
      }
    });
  };

  const handleUndo = () => {
    onUndo();
    handleClose();
  };

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
            Deshacer
          </button>
          <button
            onClick={handleClose}
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
