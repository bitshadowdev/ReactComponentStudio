'use client';

import React from 'react';
import { InteractiveElement } from '@/components/animationWrappers';
import { RangeSliderAnimationWrapper } from '@/components/animationWrappers/RangeSliderAnimationWrapper';
import { useRangeSliderAnimations } from '@/hooks/rangeSlider/useRangeSliderAnimations';

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
  
  const { 
    trackRef, 
    thumbRef, 
    filledTrackRef,
    isDragging,
    handleTrackClick,
    handleMouseDown
  } = useRangeSliderAnimations({ value, min, max, onChange, step });

  return (
    <div className={className}>
      <RangeSliderAnimationWrapper 
        value={value}
        min={min}
        max={max}
        isDragging={isDragging}
        thumbRef={thumbRef}
        filledTrackRef={filledTrackRef}
      >
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
      </RangeSliderAnimationWrapper>
    </div>
  );
};

export default RangeSlider;
