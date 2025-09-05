'use client';

// Sistema de composición de wrappers de animación
import React from 'react';
import { useConfigurationStore } from '@/stores/configurationStore';
import AnimationWrapper from './AnimationWrapper';
import DrawerWrapper from './DrawerWrapper';
import ParticleWrapper from './ParticleWrapper';
import SelectionWrapper from './SelectionWrapper';
import DragEffectWrapper from './DragEffectWrapper'; // Nuevo import

// Hook para obtener configuración de efectos visuales
const useVisualEffects = () => {
  return useConfigurationStore((state) => state.configuration.visualEffects);
};

// Función de composición que permite combinar wrappers
export const composeAnimations = (wrappers) => {
  return wrappers.reduce((WrappedComponent, wrapper) => {
    return (props) => {
      const { children, ...wrapperProps } = props;
      return React.createElement(wrapper, wrapperProps, WrappedComponent);
    };
  });
};

// Wrapper compuesto para dropdowns con todas las animaciones
export const AnimatedDropdown = ({
  children,
  isOpen,
  onOptionSelect,
  particleTheme,
  selectionColor = '#10b981',
  ...props
}) => {
  const [selectedOption, setSelectedOption] = React.useState(null);
  const visualEffects = useVisualEffects();

  // Calcular si las animaciones están habilitadas
  const animationsEnabled = visualEffects.enabled && !visualEffects.reducedMotion;
  const drawerEnabled = animationsEnabled && visualEffects.drawerAnimations.enabled;
  const particlesEnabled = animationsEnabled && visualEffects.particleEffects.enabled;
  const selectionEnabled = animationsEnabled && visualEffects.selectionEffects.enabled;

  const handleOptionClick = (option, event) => {
    setSelectedOption(option);

    // Wait for selection animation, then call onOptionSelect
    const delay = selectionEnabled ? visualEffects.selectionEffects.duration : 0;
    setTimeout(() => {
      onOptionSelect && onOptionSelect(option);
      setSelectedOption(null);
    }, delay);
  };

  return (
    <DrawerWrapper
      isOpen={isOpen}
      duration={visualEffects.drawerAnimations.duration / 1000}
      ease={visualEffects.drawerAnimations.easing}
      animationsEnabled={drawerEnabled}
      {...props}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          const isSelected = selectedOption === child.key;

          return (
            <ParticleWrapper
              key={child.key}
              particleTheme={particleTheme || visualEffects.particleEffects.theme}
              particleCount={visualEffects.particleEffects.count}
              particleSize={visualEffects.particleEffects.size}
              spreadRadius={visualEffects.particleEffects.spreadRadius}
              duration={visualEffects.particleEffects.duration}
              animationsEnabled={particlesEnabled}
            >
              <SelectionWrapper
                isSelected={isSelected}
                color={selectionColor}
                duration={visualEffects.selectionEffects.duration / 1000}
                animationsEnabled={selectionEnabled}
                onClick={(event) => handleOptionClick(child.key, event)}
              >
                {React.cloneElement(child, {
                  style: {
                    ...child.props.style,
                    animationDelay: `${index * 50}ms`
                  }
                })}
              </SelectionWrapper>
            </ParticleWrapper>
          );
        }
        return child;
      })}
    </DrawerWrapper>
  );
};

// Wrapper compuesto para elementos interactivos
export const InteractiveElement = (props) => {
  const {
    children,
    onClick,
    particleTheme,
    selectionColor = '#3b82f6',
    enableParticles = true,
    enableSelection = false,
    ...restProps
  } = props;
  const visualEffects = useVisualEffects();
  
  // Calcular si las animaciones están habilitadas
  const animationsEnabled = visualEffects.enabled && !visualEffects.reducedMotion;
  const particlesEnabled = animationsEnabled && visualEffects.particleEffects.enabled && enableParticles;
  const selectionEnabled = animationsEnabled && visualEffects.selectionEffects.enabled && enableSelection;

  const handleClick = (event) => {
    onClick && onClick(event);
  };

  // Filter out non-DOM props before spreading to div
  const { 
    children: _children,
    onClick: _onClick,
    ...domProps 
  } = restProps;

  const element = (
    <div onClick={handleClick} {...domProps}>
      {children}
    </div>
  );

  if (particlesEnabled && selectionEnabled) {
    return (
      <ParticleWrapper 
        particleTheme={particleTheme || visualEffects.particleEffects.theme}
        particleCount={visualEffects.particleEffects.count}
        particleSize={visualEffects.particleEffects.size}
        spreadRadius={visualEffects.particleEffects.spreadRadius}
        duration={visualEffects.particleEffects.duration}
        animationsEnabled={particlesEnabled}
      >
        <SelectionWrapper 
          color={selectionColor}
          duration={visualEffects.selectionEffects.duration / 1000}
          animationsEnabled={selectionEnabled}
        >
          {element}
        </SelectionWrapper>
      </ParticleWrapper>
    );
  }

  if (particlesEnabled) {
    return (
      <ParticleWrapper 
        particleTheme={particleTheme || visualEffects.particleEffects.theme}
        particleCount={visualEffects.particleEffects.count}
        particleSize={visualEffects.particleEffects.size}
        spreadRadius={visualEffects.particleEffects.spreadRadius}
        duration={visualEffects.particleEffects.duration}
        animationsEnabled={particlesEnabled}
      >
        {element}
      </ParticleWrapper>
    );
  }

  if (selectionEnabled) {
    return (
      <SelectionWrapper 
        color={selectionColor}
        duration={visualEffects.selectionEffects.duration / 1000}
        animationsEnabled={selectionEnabled}
      >
        {element}
      </SelectionWrapper>
    );
  }

  return element;
};

// Exportar todos los wrappers individuales para uso directo
export { default as AnimationWrapper } from './AnimationWrapper';
export { default as DragEffectWrapper } from './DragEffectWrapper';
export { default as DrawerWrapper } from './DrawerWrapper';
export { default as ParticleWrapper } from './ParticleWrapper';
export { default as SelectionWrapper } from './SelectionWrapper';
export { default as ToastWrapper } from './ToastWrapper';
export { useVisualEffects };
