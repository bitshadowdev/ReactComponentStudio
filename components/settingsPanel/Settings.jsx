'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { FaPalette, FaFont, FaEye, FaCog, FaUndo, FaMagic } from 'react-icons/fa';
import { PanelAnimationWrapper } from '@/components/animationWrappers/PanelAnimationWrapper';

import SettingsHeader from '@/components/generalComponents/SettingsHeader';
import TabsContainer from '@/components/generalComponents/TabsContainer';
import TabContent from '@/components/generalComponents/TabContent';
import SettingsFooter from '@/components/generalComponents/SettingsFooter';
import { getStrings } from '@/utils/strings';
import useSettingsConfig from '@/hooks/editor/useSettingsConfig';

import ThemeSettings from './ThemeSettings';
import FontSettings from './FontSettings';
import EditorDisplaySettings from './EditorDisplaySettings';
import EditorIndentationSettings from './EditorIndentationSettings';
import VisualEffectsSettings from './VisualEffectsSettings';

const SettingsPanel = ({ isOpen, onClose }) => {
  const panelRef = useRef(null);
  const [activeTab, setActiveTab] = useState('theme');
  const strings = getStrings('es').ui_strings.settings;
  
  const { hasChanges, resetToDefault } = useSettingsConfig();

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
    <PanelAnimationWrapper isOpen={isOpen}>
      <div className="h-full bg-settings-bg-secondary dark:bg-settings-dark-bg-secondary shadow-settings-lg dark:shadow-settings-lg-dark border-r border-settings-surface-border dark:border-settings-dark-surface-border flex flex-col z-50">
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
    </PanelAnimationWrapper>
  );
};

export default SettingsPanel;