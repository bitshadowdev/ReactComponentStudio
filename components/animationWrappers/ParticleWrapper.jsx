'use client';

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

// Colores del esquema blanco/negro de la aplicación
const PARTICLE_THEMES = {
  light: {
    center: '#000000',    // Negro puro en el centro
    outer: '#666666'      // Gris suave en el exterior
  },
  dark: {
    center: '#ffffff',    // Blanco puro en el centro  
    outer: '#cccccc'      // Gris claro en el exterior
  },
  accent: {
    center: '#1f2937',    // Gris oscuro intenso
    outer: '#9ca3af'      // Gris medio suave
  }
};

// Wrapper para efecto de partículas
const ParticleWrapper = ({
  children,
  trigger,
  particleCount = 12,
  particleSize = 4,
  particleTheme = 'light',
  spreadRadius = 40,
  duration = 600,
  onComplete,
  className = '',
  animationsEnabled = true,
  ...props
}) => {
  const containerRef = useRef(null);
  const particlesRef = useRef([]);
  const [particles, setParticles] = useState([]);

  // Crear partículas con gradiente de colores
  const createParticles = (x, y) => {
    const newParticles = [];
    const theme = PARTICLE_THEMES[particleTheme] || PARTICLE_THEMES.light;
    
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount;
      const distance = Math.random() * spreadRadius + 20;
      const size = Math.random() * particleSize + 2;
      
      // Calcular intensidad basada en la distancia (más cerca del centro = más intenso)
      const normalizedDistance = distance / (spreadRadius + 20);
      const intensity = 1 - normalizedDistance;
      
      // Interpolar entre color del centro y exterior
      const centerRGB = hexToRgb(theme.center);
      const outerRGB = hexToRgb(theme.outer);
      
      const r = Math.round(centerRGB.r + (outerRGB.r - centerRGB.r) * normalizedDistance);
      const g = Math.round(centerRGB.g + (outerRGB.g - centerRGB.g) * normalizedDistance);
      const b = Math.round(centerRGB.b + (outerRGB.b - centerRGB.b) * normalizedDistance);
      
      const particleColor = `rgb(${r}, ${g}, ${b})`;

      newParticles.push({
        id: i,
        x,
        y,
        targetX: x + Math.cos(angle) * distance,
        targetY: y + Math.sin(angle) * distance,
        size: size * (0.7 + intensity * 0.3), // Partículas del centro son más grandes
        opacity: 1,
        color: particleColor,
        intensity,
        element: null
      });
    }
    return newParticles;
  };

  // Función helper para convertir hex a RGB
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  // Animar partículas con efectos mejorados
  const animateParticles = (particles) => {
    if (!animationsEnabled) {
      setParticles([]);
      onComplete && onComplete();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setParticles([]);
        onComplete && onComplete();
      }
    });

    particles.forEach((particle, index) => {
      if (particle.element) {
        // Animación principal de movimiento y fade
        tl.fromTo(particle.element,
          {
            scale: 0,
            opacity: 1,
            x: 0,
            y: 0,
            rotation: 0
          },
          {
            scale: particle.intensity > 0.7 ? 1.2 : 1, // Partículas intensas son más grandes
            opacity: 0,
            x: particle.targetX - particle.x,
            y: particle.targetY - particle.y,
            rotation: 360,
            duration: duration / 1000,
            ease: 'power2.out',
            delay: index * 0.015
          },
          0
        );

        // Efecto de glow para partículas intensas
        if (particle.intensity > 0.5) {
          tl.fromTo(particle.element,
            {
              boxShadow: `0 0 0 0 ${particle.color}`
            },
            {
              boxShadow: `0 0 ${particle.size * 2}px ${particle.size}px ${particle.color}30`,
              duration: (duration / 1000) * 0.6,
              ease: 'power2.out'
            },
            0
          );
        }
      }
    });
  };

  useEffect(() => {
    if (trigger && containerRef.current && animationsEnabled) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const newParticles = createParticles(centerX, centerY);
      setParticles(newParticles);

      // Animar después de que las partículas se rendericen
      setTimeout(() => {
        animateParticles(newParticles);
      }, 10);
    }
  }, [trigger, particleCount, particleSize, particleTheme, spreadRadius, duration, animationsEnabled]);

  const handleClick = (event) => {
    event.preventDefault();
    
    if (animationsEnabled) {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      const newParticles = createParticles(x, y);
      setParticles(newParticles);

      setTimeout(() => {
        animateParticles(newParticles);
      }, 10);
    }

    // Ejecutar onClick original si existe
    if (props.onClick) {
      props.onClick(event);
    }
  };

  return (
    <>
      <div
        ref={containerRef}
        className={className}
        onClick={handleClick}
        {...props}
      >
        {children}
      </div>

      {/* Renderizar partículas con gradiente */}
      {particles.map((particle, index) => (
        <div
          key={particle.id}
          ref={(el) => {
            if (el && !particle.element) {
              particle.element = el;
            }
          }}
          className="fixed pointer-events-none rounded-full"
          style={{
            left: particle.x - particle.size / 2,
            top: particle.y - particle.size / 2,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            border: particle.intensity > 0.7 ? `1px solid ${particle.color}80` : 'none',
            zIndex: 2147483647,
            willChange: animationsEnabled ? 'transform, opacity' : 'auto'
          }}
        />
      ))}
    </>
  );
};

export default ParticleWrapper;
