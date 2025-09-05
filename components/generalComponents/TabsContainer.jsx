'use client';

import { useState, useRef, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

/**
 * Componente Tab individual
 * Patrón: Compound Component + Strategy Pattern
 */
const Tab = ({ 
  id, 
  label, 
  icon: Icon, 
  isActive, 
  onClick,
  className = ""
}) => {
  return (
    <button
      className={`flex-shrink-0 py-3 px-3 flex flex-col items-center justify-center transition-all duration-200 text-settings-xs min-w-[80px] ${
        isActive 
          ? 'bg-settings-surface-hover dark:bg-settings-dark-surface-hover text-settings-text-primary dark:text-settings-dark-text-primary border-b-2 border-settings-accent-primary dark:border-settings-dark-accent-primary' 
          : 'text-settings-text-secondary dark:text-settings-dark-text-secondary hover:text-settings-text-primary dark:hover:text-settings-dark-text-primary hover:bg-settings-surface-hover dark:hover:bg-settings-dark-surface-hover'
      } ${className}`}
      onClick={() => onClick(id)}
    >
      {Icon && <Icon size={16} className="mb-1" />}
      <span className="truncate">{label}</span>
    </button>
  );
};

const TabsContainer = ({ 
  tabs = [],
  activeTab: controlledActiveTab,
  onTabChange,
  defaultTab,
  className = "",
  children
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState(defaultTab || tabs[0]?.id);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollContainerRef = useRef(null);
  
  // Determina si el componente es controlado o no controlado
  const isControlled = controlledActiveTab !== undefined;
  const activeTab = isControlled ? controlledActiveTab : internalActiveTab;
  
  const handleTabChange = (tabId) => {
    if (!isControlled) {
      setInternalActiveTab(tabId);
    }
    onTabChange?.(tabId);
  };

  // Verificar si se puede hacer scroll
  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }
  };

  // Scroll hacia la izquierda
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -120,
        behavior: 'smooth'
      });
    }
  };

  // Scroll hacia la derecha
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 120,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    checkScrollability();
    const container = scrollContainerRef.current;
    
    if (container) {
      container.addEventListener('scroll', checkScrollability);
      window.addEventListener('resize', checkScrollability);
      
      return () => {
        container.removeEventListener('scroll', checkScrollability);
        window.removeEventListener('resize', checkScrollability);
      };
    }
  }, [tabs]);

  return (
    <div className={`relative flex items-center border-b border-settings-surface-border dark:border-settings-dark-surface-border bg-settings-bg-primary dark:bg-settings-dark-bg-primary ${className}`}>
      {/* Botón scroll izquierda */}
      {canScrollLeft && (
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-0 z-10 h-full w-8 bg-gradient-to-r from-settings-bg-primary dark:from-settings-dark-bg-primary to-transparent flex items-center justify-start pl-1 hover:from-settings-surface-hover dark:hover:from-settings-dark-surface-hover transition-all duration-200"
        >
          <FaChevronLeft size={12} className="text-settings-text-secondary dark:text-settings-dark-text-secondary" />
        </button>
      )}
      
      {/* Contenedor scrollable de tabs */}
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-hide scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            id={tab.id}
            label={tab.label}
            icon={tab.icon}
            isActive={activeTab === tab.id}
            onClick={handleTabChange}
            className={tab.className}
          />
        ))}
      </div>
      
      {/* Botón scroll derecha */}
      {canScrollRight && (
        <button
          onClick={scrollRight}
          className="absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-settings-bg-primary dark:from-settings-dark-bg-primary to-transparent flex items-center justify-end pr-1 hover:from-settings-surface-hover dark:hover:from-settings-dark-surface-hover transition-all duration-200"
        >
          <FaChevronRight size={12} className="text-settings-text-secondary dark:text-settings-dark-text-secondary" />
        </button>
      )}
      
      {children}
    </div>
  );
};

// Exportamos tanto el contenedor como el tab individual para flexibilidad
TabsContainer.Tab = Tab;

export default TabsContainer;
export { Tab };
