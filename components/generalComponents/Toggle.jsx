'use client';

import { InteractiveElement } from '@/components/animationWrappers';

/**
 * Componente Toggle reutilizable
 * Patrón: Controlled Component + Single Responsibility Principle
 *
 * @param {boolean} checked - Estado del toggle
 * @param {Function} onChange - Función callback cuando cambia el estado
 * @param {string} label - Etiqueta del toggle
 * @param {string} description - Descripción opcional
 * @param {boolean} disabled - Si el toggle está deshabilitado
 */
const Toggle = ({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  className = ""
}) => {
  const handleClick = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div>
        {label && <h3 className="text-settings-text-primary font-semibold text-sm">{label}</h3>}
        {description && (
          <p className="text-settings-text-secondary text-xs mt-1">{description}</p>
        )}
      </div>

      <InteractiveElement
        enableParticles={true}
        enableSelection={true}
        className="relative inline-flex items-center cursor-pointer"
        onClick={handleClick}
      >
        <div className={`
          w-12 h-6 rounded-full transition-colors duration-200 border-2 border-black
          ${checked ? 'bg-black' : 'bg-white'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}>
          <div className={`
            absolute top-1/2 left-1 w-4 h-4 rounded-full -translate-y-1/2
            transition-transform duration-200 border border-black
            ${checked ? 'translate-x-5 bg-white' : 'translate-x-0 bg-black'}
          `}></div>
        </div>
      </InteractiveElement>
    </div>
  );
};

export default Toggle;
