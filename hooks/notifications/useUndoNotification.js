'use client';

import { useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';

export const useUndoNotification = ({ show, duration = 5000 }) => {
  const [isVisible, setIsVisible] = useState(false);

  const animateIn = useCallback(() => {
    gsap.fromTo('.undo-notification', 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }
    );
  }, []);

  const animateOut = useCallback((onComplete) => {
    gsap.to('.undo-notification', {
      y: 100,
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
      onComplete
    });
  }, []);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        animateOut(() => setIsVisible(false));
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [show, duration, animateOut]);

  useEffect(() => {
    if (isVisible) {
      animateIn();
    }
  }, [isVisible, animateIn]);

  const handleClose = useCallback((onClose) => {
    animateOut(() => {
      setIsVisible(false);
      onClose?.();
    });
  }, [animateOut]);

  return {
    isVisible,
    handleClose
  };
};
