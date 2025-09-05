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
  const { strings } = useStrings();
  const configurationTooltips = strings.ui_strings.configurationTooltips;

  return (
    <GeneralTooltip
      content={configurationTooltips}
      position={position}
      distance={distance}
      className={className}
      isActive={isActive}
    >
      {children}
    </GeneralTooltip>
  );
};

export default ConfigurationTooltip;
