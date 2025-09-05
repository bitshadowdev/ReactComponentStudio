'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import { useMessages } from '@/hooks/useMessages';
import { useTooltipPosition } from '@/hooks/useTooltipPosition';
import { TooltipPosition } from '@/utils/tooltipBusinessLogic';
import { createMouseHandlers } from '@/utils/tooltipBusinessLogic';
import { useEffect } from 'react';

const TooltipContent = ({ isVisible, position, currentMessage, transformStyle, tooltipRef }) => (
  // The component is always in the DOM, but its visibility is controlled by opacity.
  // This allows us to measure it before it becomes visible.
  <div
    ref={tooltipRef}
    className="fixed px-2 py-1 text-xs text-white bg-black rounded-md shadow-lg pointer-events-none whitespace-nowrap border border-gray-700 transition-opacity"
    style={{
      position: 'fixed',
      top: `${position.top}px`,
      left: `${position.left}px`,
      maxWidth: 'calc(100vw - 20px)', // Ensure it never exceeds viewport width
      zIndex: 999999999,
      willChange: 'opacity, left',
      transition: 'opacity 0.15s ease-in-out, left 0.1s ease-out',
      opacity: isVisible ? 1 : 0,
      overflow: 'hidden',     // Prevent content overflow
      whiteSpace: 'nowrap',   // Keep text on single line
      textOverflow: 'ellipsis', // Show ellipsis if text is too long
    }}
  >
    {currentMessage}
  </div>
);

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
    tooltipRef,
    transformStyle
  } = useTooltipPosition(position, distance);

  const { handleMouseEnter, handleMouseLeave } = createMouseHandlers(updateMessage, setIsVisible);

  // Force tooltip to stay within bounds even after rendering
  useEffect(() => {
    if (isVisible && tooltipRef.current) {
      // Short timeout to let the tooltip render first
      const timeoutId = setTimeout(() => {
        const tooltipEl = tooltipRef.current;
        const rect = tooltipEl.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        
        // If outside right edge
        if (rect.right > viewportWidth - 10) {
          const adjustment = rect.right - (viewportWidth - 10);
          tooltipEl.style.left = `${tooltipPosition.left - adjustment}px`;
        }
        
        // If outside left edge
        if (rect.left < 10) {
          tooltipEl.style.left = '10px';
        }
      }, 50);
      
      return () => clearTimeout(timeoutId);
    }
  }, [isVisible, tooltipPosition]);
  
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
      
      {typeof window !== 'undefined' && 
        createPortal(
          <TooltipContent 
            isVisible={isVisible}
            position={tooltipPosition}
            currentMessage={currentMessage}
            transformStyle={transformStyle}
            tooltipRef={tooltipRef}
          />,
          document.getElementById('tooltip-portal') || document.body
        )
      }
    </>
  );
};

export default GeneralTooltip;
export { TooltipPosition };
