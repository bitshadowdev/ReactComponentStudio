'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import { useMessages } from '@/hooks/useMessages';
import { useTooltipPosition } from '@/hooks/useTooltipPosition';
import { withTooltipVisibility } from './withTooltipVisibility';
import { TooltipPosition } from '@/utils/tooltipBusinessLogic';
import { createMouseHandlers } from '@/utils/tooltipBusinessLogic';

const TooltipContent = ({ position, distance, currentMessage, transformStyle }) => (
  <div
    className="fixed px-3 py-2 text-xs text-white bg-gray-900 rounded-lg shadow-xl pointer-events-none whitespace-nowrap border border-gray-700 transition-opacity duration-150"
    style={{
      top: position.top,
      left: position.left,
      transform: transformStyle,
      zIndex: 2147483647
    }}
  >
    {currentMessage}
  </div>
);

const VisibleTooltip = withTooltipVisibility(TooltipContent);

const GeneralTooltip = ({
  children,
  message = '',
  position = TooltipPosition.BOTTOM,
  distance = 0,
  className = ''
}) => {
  const { currentMessage, updateMessage } = useMessages(message);
  const {
    isVisible,
    setIsVisible,
    tooltipPosition,
    wrapperRef,
    transformStyle
  } = useTooltipPosition(position, distance);

  const { handleMouseEnter, handleMouseLeave } = createMouseHandlers(updateMessage, setIsVisible);

  return (
    <>
      <div
        ref={wrapperRef}
        className={`relative ${className}`}
        onMouseEnter={() => handleMouseEnter(message)}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
      
      {typeof window !== 'undefined' && (
        <VisibleTooltip 
          isVisible={isVisible}
          position={tooltipPosition}
          distance={distance}
          currentMessage={currentMessage}
          transformStyle={transformStyle}
        />
      )}
    </>
  );
};

export default GeneralTooltip;
export { TooltipPosition };
