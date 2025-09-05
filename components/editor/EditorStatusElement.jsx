'use client';

import React from 'react';
import { FaCog } from 'react-icons/fa';
import { useStrings } from '@/hooks/configuration/useStrings';
import ConfigurationTooltip from '@/components/generalComponents/ConfigurationTooltip';
import { TooltipPosition } from '@/components/generalComponents/GeneralTooltip';

const EditorStatusElement = ({ onClick, isSettingsOpen }) => {
  const { strings } = useStrings();
  const statusBarStrings = strings.ui_strings.editor.statusBar;
  
  return (
    <ConfigurationTooltip 
      isActive={isSettingsOpen}
      position={TooltipPosition.BOTTOM}
      distance={20}
      className="flex items-center justify-center h-full"
    >
      <button
        className={`transition-colors p-2 rounded ${
          isSettingsOpen 
            ? 'text-component-editor-button-active-text bg-component-editor-button-active-bg hover:text-component-editor-button-active-hover-text hover:bg-component-editor-button-active-hover-bg' 
            : 'text-component-editor-button-inactive-text hover:text-component-editor-button-inactive-hover-text hover:bg-component-editor-button-inactive-hover-bg'
        }`}
        onClick={onClick}
        aria-label={statusBarStrings.configTooltip}
      >
        <FaCog size={16} className={isSettingsOpen ? 'animate-spin' : ''} />
      </button>
    </ConfigurationTooltip>
  );
};

export default EditorStatusElement;
