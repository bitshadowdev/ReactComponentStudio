'use client';

/**
 * Componente Card reutilizable para elementos de configuración
 * Patrón: Presentational Component + Composition Pattern
 * 
 * @param {React.ReactNode} children - Contenido de la card
 * @param {string} className - Clases CSS adicionales
 * @param {boolean} interactive - Si la card tiene interacciones hover
 */
const SettingsCard = ({ 
  children, 
  className = "",
  interactive = false
}) => {
  const hoverClass = interactive ? "hover:shadow-settings transition-all duration-200" : "";
  
  return (
    <div className={`p-5 bg-settings-bg-primary border border-settings-surface-border rounded-settings shadow-settings dark:bg-settings-dark-bg-primary dark:border-settings-dark-surface-border dark:shadow-settings-dark ${hoverClass} ${className}`}>
      {children}
    </div>
  );
};

export default SettingsCard;
