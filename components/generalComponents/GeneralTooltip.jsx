'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

// Enum para posiciones
const TooltipPosition = {
  TOP: 'top',
  BOTTOM: 'bottom', 
  LEFT: 'left',
  RIGHT: 'right'
};

const GeneralTooltip = ({
  children,
  content,
  position = TooltipPosition.BOTTOM,
  distance = 10,
  className = '',
  isActive = false,
  funMessages = []
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [currentMessage, setCurrentMessage] = useState(content);
  const [messageIndex, setMessageIndex] = useState(0);
  const wrapperRef = useRef(null);

  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  // Efecto para cambiar mensajes cuando está activo
  useEffect(() => {
    if (isActive && isVisible && funMessages.length > 0) {
      const interval = setInterval(() => {
        setMessageIndex((prev) => (prev + 1) % funMessages.length);
      }, 1500);
      
      return () => clearInterval(interval);
    } else {
      setCurrentMessage(content);
    }
  }, [isActive, isVisible, content, funMessages.length]);

  // Actualizar el mensaje actual
  useEffect(() => {
    if (isActive && isVisible && funMessages.length > 0) {
      setCurrentMessage(funMessages[messageIndex]);
    } else {
      setCurrentMessage(content);
    }
  }, [isActive, isVisible, content, messageIndex, funMessages]);

  useEffect(() => {
    if (isVisible && wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;

      let top = 0;
      let left = 0;

      switch (position) {
        case TooltipPosition.BOTTOM:
          top = rect.bottom + scrollY + distance;
          left = rect.left + scrollX + (rect.width / 2);
          break;
        case TooltipPosition.TOP:
          top = rect.top + scrollY - distance - 24; // -24 para compensar altura aprox del tooltip
          left = rect.left + scrollX + (rect.width / 2);
          break;
        case TooltipPosition.LEFT:
          top = rect.top + scrollY + (rect.height / 2);
          left = rect.left + scrollX - distance;
          break;
        case TooltipPosition.RIGHT:
          top = rect.top + scrollY + (rect.height / 2);
          left = rect.right + scrollX + distance;
          break;
      }

      setTooltipPosition({ top, left });
    }
  }, [isVisible, position, distance]);

  const tooltipElement = isVisible ? (
    <div
      className="fixed px-3 py-2 text-xs text-white bg-gray-900 rounded-lg shadow-xl pointer-events-none whitespace-nowrap border border-gray-700 transition-opacity duration-150"
      style={{
        top: tooltipPosition.top,
        left: tooltipPosition.left,
        transform: position === TooltipPosition.BOTTOM || position === TooltipPosition.TOP 
          ? 'translateX(-50%)'
          : position === TooltipPosition.LEFT
          ? 'translate(-100%, -50%)'
          : position === TooltipPosition.RIGHT
          ? 'translateY(-50%)'
          : 'translateX(-50%)',
        zIndex: 2147483647
      }}
    >
      {currentMessage}
    </div>
  ) : null;

  return (
    <>
      <div
        ref={wrapperRef}
        className={`relative ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
      
      {typeof window !== 'undefined' && tooltipElement && createPortal(tooltipElement, document.body)}
    </>
  );
};

// Exportar también el enum para uso externo
export { TooltipPosition };
export default GeneralTooltip;
