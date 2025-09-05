'use client';

import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { FaUndo, FaTimes, FaCheck, FaCog, FaCode } from 'react-icons/fa';

const NotificationToast = ({ 
  id,
  message, 
  commandType, 
  onUndo, 
  canUndo = false, 
  onClose, 
  duration = 5000 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const getIcon = () => {
    switch (commandType) {
      case 'reindent':
        return <FaCode className="text-notification-icon-code" size={16} />;
      case 'configuration':
        return <FaCog className="text-notification-icon-config" size={16} />;
      default:
        return <FaCheck className="text-notification-icon-success" size={16} />;
    }
  };

  const handleUndo = () => {
    if (onUndo) {
      onUndo();
    }
    handleClose();
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  useEffect(() => {
    // Animate in
    setIsVisible(true);
    
    // Auto close after duration
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  useEffect(() => {
    // GSAP animation
    const element = document.getElementById(`toast-${id}`);
    if (!element) return;

    if (isVisible) {
      gsap.fromTo(element, 
        { 
          x: 400, 
          opacity: 0,
          scale: 0.8 
        },
        { 
          x: 0, 
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: 'power2.out'
        }
      );
    } else {
      gsap.to(element, {
        x: 400,
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: 'power2.in'
      });
    }
  }, [isVisible, id]);

  return (
    <div
      id={`toast-${id}`}
      className="bg-notification-bg-primary border border-notification-border-primary rounded-lg shadow-lg p-4 min-w-80 max-w-96"
    >
      <div className="flex items-start gap-3">
        {getIcon()}
        
        <div className="flex-1">
          <p className="text-sm text-notification-text-primary font-medium">
            {message}
          </p>
        </div>
        
        <div className="flex items-center gap-1">
          {canUndo && (
            <button
              onClick={handleUndo}
              className="p-1.5 text-component-interactive-undo-text hover:text-component-interactive-undo-hover-text hover:bg-component-interactive-undo-hover-bg rounded transition-colors"
              title="Deshacer"
            >
              <FaUndo size={12} />
            </button>
          )}
          
          <button
            onClick={handleClose}
            className="p-1.5 text-component-interactive-close-text hover:text-component-interactive-close-hover-text hover:bg-component-interactive-close-hover-bg rounded transition-colors"
          >
            <FaTimes size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationToast;
