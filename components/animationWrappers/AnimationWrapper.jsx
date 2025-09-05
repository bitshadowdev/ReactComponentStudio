'use client';

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

// Wrapper base para animaciones GSAP
const AnimationWrapper = ({
  children,
  animationType,
  animationProps = {},
  trigger,
  onComplete,
  className = '',
  ...props
}) => {
  const elementRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (trigger && elementRef.current) {
      setIsAnimating(true);

      const tl = gsap.timeline({
        onComplete: () => {
          setIsAnimating(false);
          onComplete && onComplete();
        }
      });

      // Aplicar la animación específica
      applyAnimation(tl, elementRef.current, animationType, animationProps);

      return () => {
        tl.kill();
      };
    }
  }, [trigger, animationType, animationProps, onComplete]);

  return (
    <div ref={elementRef} className={className} {...props}>
      {typeof children === 'function'
        ? children({ isAnimating, triggerAnimation: () => setIsAnimating(true) })
        : children
      }
    </div>
  );
};

// Función para aplicar diferentes tipos de animación
const applyAnimation = (timeline, element, type, props) => {
  switch (type) {
    case 'fadeIn':
      timeline.fromTo(element,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: props.duration || 0.3, ease: props.ease || 'power2.out' }
      );
      break;

    case 'slideIn':
      timeline.fromTo(element,
        { x: props.from || -20, opacity: 0 },
        { x: 0, opacity: 1, duration: props.duration || 0.3, ease: props.ease || 'power2.out' }
      );
      break;

    case 'scaleIn':
      timeline.fromTo(element,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: props.duration || 0.3, ease: props.ease || 'back.out(1.7)' }
      );
      break;

    case 'bounce':
      timeline.fromTo(element,
        { y: -10 },
        {
          y: 0,
          duration: props.duration || 0.5,
          ease: 'bounce.out',
          yoyo: true,
          repeat: 1
        }
      );
      break;

    case 'shake':
      timeline.fromTo(element,
        { x: 0 },
        {
          x: 5,
          duration: 0.1,
          ease: 'power2.inOut',
          yoyo: true,
          repeat: 5,
          onComplete: () => gsap.set(element, { x: 0 })
        }
      );
      break;

    case 'glow':
      timeline.fromTo(element,
        { boxShadow: '0 0 0 0 rgba(59, 130, 246, 0.7)' },
        {
          boxShadow: '0 0 20px 5px rgba(59, 130, 246, 0.3)',
          duration: props.duration || 0.6,
          ease: 'power2.out',
          yoyo: true,
          repeat: 1
        }
      );
      break;

    case 'dropdownExpand':
      timeline.fromTo(element,
        { height: 0, opacity: 0, transformOrigin: 'top' },
        {
          height: 'auto',
          opacity: 1,
          duration: props.duration || 0.4,
          ease: 'power2.out'
        }
      );
      break;

    case 'selectionPulse':
      timeline.fromTo(element,
        { scale: 1, boxShadow: '0 0 0 0 rgba(34, 197, 94, 0.7)' },
        {
          scale: 1.05,
          boxShadow: '0 0 20px 5px rgba(34, 197, 94, 0.3)',
          duration: props.duration || 0.3,
          ease: 'power2.out',
          yoyo: true,
          repeat: 1
        }
      );
      break;

    default:
      console.warn(`Animation type "${type}" not recognized`);
  }
};

export default AnimationWrapper;
