'use client';

import { gsap } from 'gsap';
import { useEffect } from 'react';

export const RangeSliderAnimationWrapper = ({ 
  children, 
  value, 
  min, 
  max, 
  isDragging,
  thumbRef,
  filledTrackRef
}) => {
  // Animation logic
  useEffect(() => {
    const percentage = ((value - min) / (max - min)) * 100;

    // Always update thumb position immediately when dragging, with animation when not
    if (thumbRef.current) {
      if (isDragging) {
        // Set position immediately during drag without animation
        gsap.set(thumbRef.current, {
          left: `${percentage}%`,
        });
      } else {
        // Smooth animation when not dragging
        gsap.to(thumbRef.current, {
          left: `${percentage}%`,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    }

    // Always animate the filled track
    if (filledTrackRef.current) {
      gsap.to(filledTrackRef.current, {
        width: `${percentage}%`,
        duration: isDragging ? 0.1 : 0.3,
        ease: 'power2.out',
      });
    }
  }, [value, min, max, isDragging, thumbRef, filledTrackRef]);

  return children;
};
