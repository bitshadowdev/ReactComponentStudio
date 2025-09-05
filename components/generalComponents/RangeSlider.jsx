'use client';

import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { InteractiveElement } from '@/components/animationWrappers';

/**
 * Componente RangeSlider reutilizable
 * Patrón: Controlled Component + Single Responsibility Principle
 *
 * @param {number} value - Valor actual del slider
 * @param {Function} onChange - Función callback cuando cambia el valor
 * @param {number} min - Valor mínimo
 * @param {number} max - Valor máximo
 * @param {number} step - Incremento del slider
 * @param {string} label - Etiqueta del slider
 * @param {string} unit - Unidad de medida
 * @param {boolean} showLabels - Si mostrar las etiquetas min/max
 */
const RangeSlider = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  unit = "",
  showLabels = true,
  className = ""
}) => {
  const trackRef = useRef(null);
  const thumbRef = useRef(null);
  const filledTrackRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  // Animate thumb and track on value change
  useEffect(() => {
    const percentage = ((value - min) / (max - min)) * 100;

    // Only animate thumb if not dragging (for track clicks)
    if (!isDragging) {
      gsap.to(thumbRef.current, {
        left: `${percentage}%`,
        duration: 0.4,
        ease: 'power2.out',
      });
    }

    // Always animate the track for a smooth follow effect
    gsap.to(filledTrackRef.current, {
      width: `${percentage}%`,
      duration: isDragging ? 0.6 : 0.4, // Slower when dragging for a 'lazy' follow
      ease: 'power2.out',
    });
  }, [value, min, max, isDragging]);
  
  const handleTrackClick = (event) => {
    if (trackRef.current && !isDragging) {
      const rect = trackRef.current.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const progress = Math.max(0, Math.min(1, clickX / rect.width));
      const newValue = min + (max - min) * progress;
      const steppedValue = Math.round(newValue / step) * step;
      
      // Clamp value within bounds
      const clampedValue = Math.max(min, Math.min(max, steppedValue));
      onChange && onChange(clampedValue);
    }
  };

  const handleMouseDown = (event) => {
    event.preventDefault();
    setIsDragging(true);
    
    const handleMouseMove = (moveEvent) => {
      if (trackRef.current) {
        const rect = trackRef.current.getBoundingClientRect();
        const moveX = moveEvent.clientX - rect.left;
        const progress = Math.max(0, Math.min(1, moveX / rect.width));
        const newValue = min + (max - min) * progress;
        const steppedValue = Math.round(newValue / step) * step;
        
        const clampedValue = Math.max(min, Math.min(max, steppedValue));

        // Directly update thumb position for instant feedback
        if (thumbRef.current) {
          const newPercentage = ((clampedValue - min) / (max - min)) * 100;
          thumbRef.current.style.left = `${newPercentage}%`;
        }

        onChange(clampedValue);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };
  
  return (
    <div className={className}>
      {label && (
        <label 
          className="block text-sm font-semibold text-black mb-3"
        >
          {label}: <span className="font-bold">
            {value}{unit}
          </span>
        </label>
      )}
      
      <div className="relative h-6 flex items-center">
        {/* Track */}
        <div 
          ref={trackRef}
          className="h-1 w-full bg-gray-300 rounded-full overflow-hidden cursor-pointer"
          onClick={handleTrackClick}
        >
          {/* Filled track */}
          <div 
            ref={filledTrackRef}
            className="h-full bg-black rounded-full"
          />
        </div>
        
        {/* Custom thumb */}
        <div
          ref={thumbRef}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
          style={{ zIndex: 10 }}
        >
          <InteractiveElement
            enableParticles={true}
            enableSelection={true}
            className={`w-5 h-5 bg-white border-2 border-black rounded-full transition-transform duration-200 hover:scale-110 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            style={{ 
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)', 
              touchAction: 'none'
            }}
            onMouseDown={handleMouseDown}
          />
        </div>
      </div>
      
      {/* Min/Max labels */}
      {showLabels && (
        <div className="flex justify-between text-xs text-gray-600 mt-1">
          <span className="font-medium">{min}{unit}</span>
          <span className="font-medium">{max}{unit}</span>
        </div>
      )}
    </div>
  );
};

export default RangeSlider;
