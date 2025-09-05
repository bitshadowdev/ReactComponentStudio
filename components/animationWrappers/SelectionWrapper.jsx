'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

// Wrapper para selección significativa con animación especial
const SelectionWrapper = ({
  children,
  isSelected,
  onSelectionComplete,
  duration = 0.4,
  color = '#10b981',
  className = '',
  animationsEnabled = true,
  glowIntensity = 0.8,
  ...props
}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (isSelected) {
      const element = elementRef.current;

      if (!animationsEnabled) {
        // Sin animaciones, aplicar estilos directamente
        gsap.set(element, {
          borderLeftWidth: '4px',
          borderLeftColor: color,
          backgroundColor: `${color}10`,
          clearProps: 'transform,boxShadow'
        });
        
        const textElement = element.querySelector('.selection-text');
        if (textElement) {
          gsap.set(textElement, { color: color });
        }
        
        onSelectionComplete && onSelectionComplete();
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => {
          onSelectionComplete && onSelectionComplete();
        }
      });

      // Pre-configuración para mejor performance
      gsap.set(element, {
        willChange: 'transform, box-shadow, border'
      });

      // Animación de selección significativa mejorada
      tl.to(element, {
        scale: 1.08,
        duration: duration * 0.25,
        ease: 'power3.out'
      })
      .to(element, {
        scale: 1.03,
        duration: duration * 0.4,
        ease: 'power2.out'
      }, `-=${duration * 0.15}`)
      .fromTo(element,
        {
          boxShadow: `0 0 0 0 ${color}40`
        },
        {
          boxShadow: `0 0 ${25 * glowIntensity}px ${8 * glowIntensity}px ${color}${Math.round(48 * glowIntensity).toString(16)}`,
          duration: duration * 0.7,
          ease: 'power2.out',
          yoyo: true,
          repeat: 1
        },
        0
      )
      .to(element, {
        scale: 1,
        duration: duration * 0.35,
        ease: 'back.out(1.4)'
      }, `-=${duration * 0.2}`);

      // Animación de borde izquierdo más fluida
      tl.fromTo(element,
        {
          borderLeftWidth: '0px',
          borderLeftColor: color
        },
        {
          borderLeftWidth: '4px',
          borderLeftColor: color,
          duration: duration * 0.4,
          ease: 'power3.out'
        },
        0
      );

      // Animación de fondo sutil
      tl.fromTo(element,
        {
          backgroundColor: 'transparent'
        },
        {
          backgroundColor: `${color}10`,
          duration: duration * 0.6,
          ease: 'power2.out'
        },
        duration * 0.1
      );

      // Animación de texto mejorada
      const textElement = element.querySelector('.selection-text');
      if (textElement) {
        tl.fromTo(textElement,
          { 
            color: 'currentColor',
            textShadow: '0 0 0 transparent'
          },
          {
            color: color,
            textShadow: `0 0 ${4 * glowIntensity}px ${color}30`,
            duration: duration * 0.5,
            ease: 'power2.out',
            yoyo: true,
            repeat: 1
          },
          0
        );
      }

      // Cleanup al final
      tl.call(() => {
        gsap.set(element, { clearProps: 'willChange' });
      });
    } else {
      // Reset all styles when not selected
      gsap.set(element, {
        clearProps: 'all',
        backgroundColor: 'transparent',
        borderLeftWidth: '0px',
        borderLeftColor: 'transparent',
        boxShadow: 'none',
        scale: 1
      });
      
      const textElement = element.querySelector('.selection-text');
      if (textElement) {
        gsap.set(textElement, {
          clearProps: 'all',
          color: 'currentColor',
          textShadow: 'none'
        });
      }
    }
  }, [isSelected, duration, color, onSelectionComplete, animationsEnabled, glowIntensity]);

  return (
    <div
      ref={elementRef}
      className={`${className} ${isSelected ? 'selected' : ''}`}
      style={{
        transition: animationsEnabled ? 'all 0.2s ease' : 'none',
        ...(isSelected && !animationsEnabled && {
          backgroundColor: `${color}10`,
          borderLeftWidth: '4px',
          borderLeftColor: color
        })
      }}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // Agregar clase para identificar elementos de texto
          if (typeof child.props.children === 'string') {
            return React.cloneElement(child, {
              className: `${child.props.className || ''} selection-text`.trim(),
              style: {
                ...child.props.style,
                ...(isSelected && !animationsEnabled && { color: color })
              }
            });
          }
        }
        return child;
      })}
    </div>
  );
};

export default SelectionWrapper;
