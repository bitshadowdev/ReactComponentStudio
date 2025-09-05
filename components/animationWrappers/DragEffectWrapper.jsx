'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { useVisualEffects } from './index';

// Registrar el plugin de Draggable
gsap.registerPlugin(Draggable);

/**
 * Wrapper para efectos de arrastre con GSAP
 * Patrón: Decorador de Eventos + Observer Pattern
 * 
 * @param {ReactNode} children - Elemento hijo a hacer draggable
 * @param {string} axis - Eje de movimiento ('x', 'y', 'both')
 * @param {function} onDrag - Callback durante el arrastre
 * @param {function} onDragEnd - Callback al finalizar arrastre
 * @param {object} bounds - Límites de movimiento { minX, maxX, minY, maxY }
 */
const DragEffectWrapper = ({
  children,
  axis = 'x',
  onDrag,
  onDragEnd,
  bounds = {},
  enableParticles = true,
  className = "",
  ...props
}) => {
  const dragRef = useRef(null);
  const instanceRef = useRef(null);
  const visualEffects = useVisualEffects();
  
  // Calcular si las animaciones están habilitadas
  const animationsEnabled = visualEffects.enabled && !visualEffects.reducedMotion;
  const particlesEnabled = animationsEnabled && visualEffects.particleEffects.enabled && enableParticles;

  useEffect(() => {
    if (!dragRef.current) return;

    // Crear instancia de Draggable
    instanceRef.current = Draggable.create(dragRef.current, {
      type: axis,
      bounds: Object.keys(bounds).length ? bounds : null,
      inertia: true,
      onDrag: function() {
        // Calcular posición relativa para el callback
        const progress = axis === 'x' 
          ? (this.x - bounds.minX) / (bounds.maxX - bounds.minX)
          : (this.y - bounds.minY) / (bounds.maxY - bounds.minY);
        
        onDrag && onDrag(progress);
      },
      onDragEnd: function() {
        onDragEnd && onDragEnd();
        
        // Disparar partículas al soltar
        if (particlesEnabled) {
          const particleContainer = document.createElement('div');
          particleContainer.className = 'particle-emitter';
          document.body.appendChild(particleContainer);
          
          gsap.to(particleContainer, {
            duration: visualEffects.particleEffects.duration / 1000,
            onComplete: () => document.body.removeChild(particleContainer)
          });
        }
      }
    });

    // Limpieza
    return () => {
      if (instanceRef.current) {
        instanceRef.current[0].kill();
      }
    };
  }, [axis, bounds, onDrag, onDragEnd, particlesEnabled, visualEffects]);

  return (
    <div 
      ref={dragRef} 
      className={`drag-wrapper ${className}`}
      style={{ touchAction: axis === 'x' ? 'pan-x' : axis === 'y' ? 'pan-y' : 'none' }}
      {...props}
    >
      {children}
    </div>
  );
};

export default DragEffectWrapper;
