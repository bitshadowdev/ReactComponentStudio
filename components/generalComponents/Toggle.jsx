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
        {label && <h3 className="text-black font-semibold text-sm">{label}</h3>}
        {description && (
          <p className="text-gray-600 text-xs mt-1">{description}</p>
        )}
      </div>

      <InteractiveElement
        enableParticles={true}
        enableSelection={true}
        className="relative inline-flex items-center cursor-pointer"
        onClick={handleClick}
      >
        <div className={`
          w-10 h-5 rounded-full transition-colors duration-200
          ${checked ? 'bg-black' : 'bg-gray-300'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}>
          <div className={`
            absolute top-1 left-1 w-3 h-3 bg-white rounded-full
            transition-transform duration-200 border border-gray-400
            ${checked ? 'translate-x-5' : 'translate-x-0'}
          `}></div>
        </div>
      </InteractiveElement>
    </div>
  );
};

export default Toggle;
