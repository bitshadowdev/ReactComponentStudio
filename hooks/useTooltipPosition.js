import { useState, useRef, useEffect } from 'react';
import { calculateTooltipPosition, getTransformStyle } from '@/utils/tooltipBusinessLogic';

export const useTooltipPosition = (position, distance) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const wrapperRef = useRef(null);

  const updatePosition = () => {
    if (wrapperRef.current && isVisible) {
      const triggerRect = wrapperRef.current.getBoundingClientRect();
      const positionData = calculateTooltipPosition(
        position,
        distance,
        triggerRect,
        200, // Default tooltip width
        40   // Default tooltip height
      );
      setTooltipPosition(positionData);
    }
  };

  useEffect(() => {
    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [isVisible, position, distance]);

  return {
    isVisible,
    setIsVisible,
    tooltipPosition,
    wrapperRef,
    transformStyle: getTransformStyle(position)
  };
};
