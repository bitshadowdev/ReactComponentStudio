'use client';

import { useRef, useState, useCallback } from 'react';

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

  return {
    trackRef,
    thumbRef,
    filledTrackRef,
    isDragging,
    setIsDragging,
    handleTrackClick
  };
};
