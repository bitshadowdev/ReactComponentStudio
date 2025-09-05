'use client';

import React from 'react';
import GeneralTooltip, { TooltipPosition } from './GeneralTooltip';
import { useStrings } from '@/hooks/configuration/useStrings';

const ConfigurationTooltip = ({
  children,
  isActive = false,
  position = TooltipPosition.BOTTOM,
  distance = 0,
  className = ''
}) => {
  const { strings: { ui_strings } } = useStrings();
  const configurationTooltips = ui_strings.configurationTooltips;
  const configMessage = ui_strings.editor.statusBar.configTooltip;

  const message = isActive
    ? configurationTooltips[Math.floor(Math.random() * configurationTooltips.length)]
    : configMessage;

  return (
    <GeneralTooltip
      message={message}
      position={position}
      distance={distance}
      className={className}
    >
      {children}
    </GeneralTooltip>
  );
};

export default ConfigurationTooltip;
