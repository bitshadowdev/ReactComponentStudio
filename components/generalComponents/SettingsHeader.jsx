'use client';

import { FaTimes } from 'react-icons/fa';

/**
 * Componente Header reutilizable para paneles de configuración
 * Patrón: Presentational Component + Single Responsibility Principle
 * 
 * @param {string} title - Título del header
 * @param {Function} onClose - Función callback para cerrar el panel
 * @param {React.ReactNode} children - Contenido adicional opcional
 */
const SettingsHeader = ({ 
  title, 
  onClose, 
  children,
  className = ""
}) => {
  return (
    <div className={`flex justify-between items-center p-5 border-b border-settings-surface-border dark:border-settings-dark-surface-border bg-settings-bg-primary dark:bg-settings-dark-bg-primary ${className}`}>
      <div className="flex items-center space-x-4">
        <h2 className="text-settings-lg font-semibold text-settings-text-primary dark:text-settings-dark-text-primary">{title}</h2>
        {children}
      </div>
      
      {onClose && (
        <button 
          onClick={onClose}
          className="p-2 rounded-settings bg-settings-surface-secondary dark:bg-settings-dark-surface-secondary hover:bg-settings-surface-hover dark:hover:bg-settings-dark-surface-hover text-settings-text-secondary dark:text-settings-dark-text-secondary hover:text-settings-text-primary dark:hover:text-settings-dark-text-primary transition-all duration-200"
          aria-label="Cerrar panel"
        >
          <FaTimes size={16} />
        </button>
      )}
    </div>
  );
};

export default SettingsHeader;
