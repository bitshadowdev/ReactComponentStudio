'use client';

import React from 'react';
import { FaCog } from 'react-icons/fa';
import { getStrings } from '@/utils/strings';
import ConfigurationTooltip from '@/components/generalComponents/ConfigurationTooltip';
import { TooltipPosition } from '@/components/generalComponents/GeneralTooltip';

const EditorStatusElement = ({ onClick, isSettingsOpen }) => {
  const strings = getStrings('es').ui_strings.editor.statusBar;
  
  return (
    <ConfigurationTooltip 
      isActive={isSettingsOpen}
      position={TooltipPosition.BOTTOM}
      distance={20}
      className="flex items-center justify-center h-full px-3"
    >
      <button
        className={`transition-colors ${
          isSettingsOpen 
            ? 'text-component-editor-button-active-text bg-component-editor-button-active-bg hover:text-component-editor-button-active-hover-text hover:bg-component-editor-button-active-hover-bg' 
            : 'text-component-editor-button-inactive-text hover:text-component-editor-button-inactive-hover-text hover:bg-component-editor-button-inactive-hover-bg'
        }`}
        onClick={onClick}
        aria-label={strings.configTooltip}
      >
        <FaCog size={16} className={isSettingsOpen ? 'animate-spin' : ''} />
      </button>
    </ConfigurationTooltip>
  );
};

export default EditorStatusElement;
