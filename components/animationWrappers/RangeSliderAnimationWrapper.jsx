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

    if (!isDragging) {
      gsap.to(thumbRef.current, {
        left: `${percentage}%`,
        duration: 0.4,
        ease: 'power2.out',
      });
    }

    gsap.to(filledTrackRef.current, {
      width: `${percentage}%`,
      duration: isDragging ? 0.6 : 0.4,
      ease: 'power2.out',
    });
  }, [value, min, max, isDragging]);

  return children;
};
