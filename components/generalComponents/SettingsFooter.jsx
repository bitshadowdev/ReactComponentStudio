'use client';

/**
 * Componente Footer reutilizable para paneles de configuración
 * Patrón: Presentational Component + Single Responsibility Principle
 * 
 * @param {string} message - Mensaje a mostrar en el footer
 * @param {React.ReactNode} children - Contenido adicional opcional
 * @param {string} className - Clases CSS adicionales
 */
const SettingsFooter = ({ 
  message, 
  children,
  className = ""
}) => {
  return (
    <div className={`p-4 bg-settings-bg-primary dark:bg-settings-dark-bg-primary border-t border-settings-surface-border dark:border-settings-dark-surface-border text-center text-settings-text-tertiary dark:text-settings-dark-text-tertiary text-settings-xs ${className}`}>
      {message && <span>{message}</span>}
      {children}
    </div>
  );
};

export default SettingsFooter;
