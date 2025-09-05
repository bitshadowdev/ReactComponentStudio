import { useState, useRef, useEffect, useCallback } from 'react';
import { calculateTooltipPosition, getTransformStyle } from '@/utils/tooltipBusinessLogic';

export const useTooltipPosition = (position, distance) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const wrapperRef = useRef(null);
  const tooltipRef = useRef(null);

  const updatePosition = useCallback(() => {
    if (!wrapperRef.current || !tooltipRef.current) return;

    const triggerRect = wrapperRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    
    // First calculate the ideal position
    let newPosition = calculateTooltipPosition(
      position,
      distance,
      triggerRect,
      tooltipRect.width,
      tooltipRect.height
    );
    
    // Force tooltip measurement by accessing its dimensions
    const tooltipWidth = tooltipRef.current.offsetWidth || tooltipRect.width;
    const tooltipHeight = tooltipRef.current.offsetHeight || tooltipRect.height;
    
    // Boundary checks with padding
    const padding = 10;
    
    // Check left boundary
    if (newPosition.left < padding) {
      newPosition.left = padding;
    }
    
    // Check right boundary
    if (newPosition.left + tooltipWidth > viewportWidth - padding) {
      newPosition.left = viewportWidth - tooltipWidth - padding;
    }

    setTooltipPosition(newPosition);
  }, [position, distance]);

  useEffect(() => {
    // Use multiple timeouts with increasing delays to ensure tooltip is properly measured
    if (isVisible) {
      // First immediate call to position roughly
      updatePosition();
      
      // Then schedule more calls to refine the position as the DOM updates
      const timeoutId1 = setTimeout(updatePosition, 10);
      const timeoutId2 = setTimeout(updatePosition, 50);
      
      // Add event listeners for window resize and scroll
      window.addEventListener('resize', updatePosition, { passive: true });
      window.addEventListener('scroll', updatePosition, { passive: true });

      return () => {
        clearTimeout(timeoutId1);
        clearTimeout(timeoutId2);
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition);
      };
    }
  }, [isVisible, updatePosition]);

  return {
    isVisible,
    setIsVisible,
    tooltipPosition,
    wrapperRef,
    tooltipRef,
    transformStyle: getTransformStyle(position)
  };
};
