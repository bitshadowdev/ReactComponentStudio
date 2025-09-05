'use client';

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

// Wrapper específico para animación de cajón (dropdown expand)
const DrawerWrapper = ({
  children,
  isOpen,
  duration = 0.35,
  ease = 'power3.out',
  onAnimationComplete,
  className = '',
  animationsEnabled = true,
  ...props
}) => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (containerRef.current && contentRef.current) {
      const container = containerRef.current;
      const content = contentRef.current;

      if (!animationsEnabled) {
        // Sin animaciones, cambio directo
        gsap.set(container, {
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
          clearProps: 'transform'
        });
        onAnimationComplete && onAnimationComplete();
        return;
      }

      if (isOpen) {
        // Animación de apertura ultra fluida
        const tl = gsap.timeline({
          onComplete: () => {
            setHasAnimated(true);
            onAnimationComplete && onAnimationComplete();
          }
        });

        // Pre-configuración para suavidad
        gsap.set(container, {
          transformOrigin: 'top center',
          willChange: 'height, opacity, transform'
        });

        tl.fromTo(container,
          {
            height: 0,
            opacity: 0,
            scaleY: 0.85,
            y: -8
          },
          {
            height: 'auto',
            opacity: 1,
            scaleY: 1,
            y: 0,
            duration: duration,
            ease: 'power3.out'
          }
        );

        // Animar opciones con mejor timing
        const options = content.querySelectorAll('.drawer-option');
        if (options.length > 0) {
          tl.fromTo(options,
            {
              opacity: 0,
              x: -15,
              scale: 0.97,
              rotationX: -5
            },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              rotationX: 0,
              duration: duration * 0.7,
              stagger: {
                amount: 0.15,
                ease: 'power2.out'
              },
              ease: 'back.out(1.2)'
            },
            `-=${duration * 0.6}`
          );
        }

        // Efecto sutil de entrada
        tl.fromTo(container,
          { boxShadow: '0 0 0 0 rgba(0, 0, 0, 0.1)' },
          {
            boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.15)',
            duration: duration * 0.8,
            ease: 'power2.out'
          },
          0
        );

      } else if (hasAnimated) {
        // Animación de cierre suave
        const tl = gsap.timeline({
          onComplete: () => {
            setHasAnimated(false);
            gsap.set(container, { clearProps: 'willChange' });
            onAnimationComplete && onAnimationComplete();
          }
        });

        tl.to(container, {
          height: 0,
          opacity: 0,
          scaleY: 0.85,
          y: -5,
          boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
          duration: duration * 0.7,
          ease: 'power3.in'
        });
      }
    }
  }, [isOpen, duration, ease, onAnimationComplete, animationsEnabled, hasAnimated]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${className}`}
      style={{
        height: isOpen ? 'auto' : 0,
        opacity: isOpen ? 1 : 0
      }}
      {...props}
    >
      <div ref={contentRef}>
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              className: `${child.props.className || ''} drawer-option`.trim(),
              style: {
                ...child.props.style,
                willChange: animationsEnabled ? 'opacity, transform' : 'auto'
              }
            });
          }
          return child;
        })}
      </div>
    </div>
  );
};

export default DrawerWrapper;
