'use client';

/**
 * Componente de contenido de tab reutilizable
 * Patrón: Container Component + Composition Pattern
 * 
 * @param {React.ReactNode} children - Contenido del tab
 * @param {string} className - Clases CSS adicionales
 * @param {boolean} scrollable - Si el contenido debe ser scrollable
 */
const TabContent = ({ 
  children, 
  className = "",
  scrollable = true,
  padding = "p-4"
}) => {
  const scrollClass = scrollable ? "flex-1 overflow-y-auto" : "flex-1";
  
  return (
    <div className={`bg-settings-bg-secondary dark:bg-settings-dark-bg-secondary ${padding} ${scrollClass} ${className}`}>
      {children}
    </div>
  );
};

export default TabContent;
