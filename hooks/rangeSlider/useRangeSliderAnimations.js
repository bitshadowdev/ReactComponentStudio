'use client';

import { useRef, useState, useCallback, useEffect } from 'react';

export const useRangeSliderAnimations = ({ value, min, max, onChange, step }) => {
  const trackRef = useRef(null);
  const thumbRef = useRef(null);
  const filledTrackRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleTrackClick = useCallback((event) => {
    if (trackRef.current && !isDragging) {
      const rect = trackRef.current.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const progress = Math.max(0, Math.min(1, clickX / rect.width));
      const newValue = min + (max - min) * progress;
      const steppedValue = Math.round(newValue / step) * step;
      onChange(steppedValue);
    }
  }, [isDragging, min, max, step, onChange]);

  const handleMouseDown = useCallback((event) => {
    event.preventDefault();
    setIsDragging(true);

    const startX = event.clientX;
    const startValue = value;

    const handleMouseMove = (moveEvent) => {
      if (!trackRef.current) return;
      
      const rect = trackRef.current.getBoundingClientRect();
      const deltaX = moveEvent.clientX - startX;
      const deltaPercent = deltaX / rect.width;
      const deltaValue = deltaPercent * (max - min);
      const newValue = Math.max(min, Math.min(max, startValue + deltaValue));
      const steppedValue = Math.round(newValue / step) * step;
      
      onChange(steppedValue);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [value, min, max, step, onChange]);

  return {
    trackRef,
    thumbRef,
    filledTrackRef,
    isDragging,
    setIsDragging,
    handleTrackClick,
    handleMouseDown
  };
};
