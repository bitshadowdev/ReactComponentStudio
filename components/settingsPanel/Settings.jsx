'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { FaPalette, FaFont, FaEye, FaCog, FaUndo, FaMagic } from 'react-icons/fa';
import { gsap } from 'gsap';

import SettingsHeader from '@/components/generalComponents/SettingsHeader';
import TabsContainer from '@/components/generalComponents/TabsContainer';
import TabContent from '@/components/generalComponents/TabContent';
import SettingsFooter from '@/components/generalComponents/SettingsFooter';
import { getStrings } from '@/utils/strings';
import { useConfigurationStore } from '@/stores/configurationStore';

import ThemeSettings from './ThemeSettings';
import FontSettings from './FontSettings';
import EditorDisplaySettings from './EditorDisplaySettings';
import EditorIndentationSettings from './EditorIndentationSettings';
import VisualEffectsSettings from './VisualEffectsSettings';

const SettingsPanel = ({ isOpen, onClose }) => {
  const panelRef = useRef(null);
  const [activeTab, setActiveTab] = useState('theme');
  const strings = getStrings('es').ui_strings.settings;
  
  // Get configuration store methods
  const editorConfig = useConfigurationStore((state) => state.configuration.editor);
  const visualEffectsConfig = useConfigurationStore((state) => state.configuration.visualEffects);
  const resetToDefault = useConfigurationStore((state) => state.resetToDefault);
  
  // Check if current config differs from default
  const hasChanges = useMemo(() => {
    const defaultEditorConfig = {
      themeMode: 'dark',
      theme: 'dracula',
      fontFamily: '"Fira Code", monospace',
      fontSize: 14,
      lineHeight: 1.5,
      letterSpacing: 0,
      lineWrapping: 'none',
      showSpaces: false,
      showTabs: false,
      showNewlines: false,
      lineNumbers: true,
      codeFolding: true,
      autocloseBrackets: true,
      indentWithTabs: false,
      tabSize: 2,
      indentUnit: 2
    };

    const defaultVisualEffectsConfig = {
      enabled: true,
      particleEffects: {
        enabled: true,
        count: 12,
        size: 4,
        theme: 'light',
        spreadRadius: 40,
        duration: 600
      },
      drawerAnimations: {
        enabled: true,
        duration: 350,
        easing: 'power3.out'
      },
      selectionEffects: {
        enabled: true,
        duration: 400,
        glowIntensity: 0.8
      },
      reducedMotion: false
    };
    
    const editorChanged = JSON.stringify(editorConfig) !== JSON.stringify(defaultEditorConfig);
    const visualEffectsChanged = JSON.stringify(visualEffectsConfig) !== JSON.stringify(defaultVisualEffectsConfig);
    
    return editorChanged || visualEffectsChanged;
  }, [editorConfig, visualEffectsConfig]);
  
  // Animation when panel opens/closes
  useEffect(() => {
    if (panelRef.current) {
      if (isOpen) {
        gsap.fromTo(
          panelRef.current,
          { x: -300, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
        );
      } else {
        gsap.to(panelRef.current, {
          x: -300,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in'
        });
      }
    }
  }, [isOpen]);
  
  // Close panel with Escape key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) { // Escape key
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);
  
  // Configuración de tabs - Patrón Strategy
  const tabs = [
    { id: 'theme', label: strings.tabs.theme, icon: FaPalette },
    { id: 'font', label: strings.tabs.font, icon: FaFont },
    { id: 'display', label: 'Pantalla', icon: FaEye },
    { id: 'indentation', label: 'Indentación', icon: FaCog },
    { id: 'visualEffects', label: 'Efectos Visuales', icon: FaMagic },
  ];
  
  // Factory Pattern para renderizado de contenido
  const renderTabContent = () => {
    const contentMap = {
      theme: ThemeSettings,
      font: FontSettings,
      display: EditorDisplaySettings,
      indentation: EditorIndentationSettings,
      visualEffects: VisualEffectsSettings,
    };
    
    const Component = contentMap[activeTab] || ThemeSettings;
    return <Component />;
  };
  
  return (
    <div className="h-full bg-settings-bg-secondary dark:bg-settings-dark-bg-secondary shadow-settings-lg dark:shadow-settings-lg-dark border-r border-settings-surface-border dark:border-settings-dark-surface-border flex flex-col z-50" ref={panelRef}>
      <div className="flex-1 overflow-hidden flex flex-col">
        <SettingsHeader
          title={strings.panelTitle}
          onClose={onClose}
        >
          {hasChanges && (
            <button
              onClick={resetToDefault}
              className="px-3 py-1.5 bg-settings-surface-tertiary dark:bg-settings-dark-surface-tertiary hover:bg-settings-surface-hover dark:hover:bg-settings-dark-surface-hover text-settings-text-secondary dark:text-settings-dark-text-secondary hover:text-settings-text-primary dark:hover:text-settings-dark-text-primary text-settings-xs rounded-settings transition-all duration-200 border border-settings-surface-border dark:border-settings-dark-surface-border flex items-center space-x-1"
              title="Restablecer configuración"
            >
              <FaUndo size={10} />
              <span>Reset</span>
            </button>
          )}
        </SettingsHeader>
        
        <TabsContainer
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        
        <div className="flex-1 overflow-hidden">
          <TabContent className="h-full overflow-y-auto" padding="p-5">
            {renderTabContent()}
          </TabContent>
        </div>
      </div>
      
      <SettingsFooter
        message={strings.footerMessage}
      />
    </div>
  );
};

export default SettingsPanel;