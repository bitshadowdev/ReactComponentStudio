'use client';

import React from 'react';
import GeneralTooltip, { TooltipPosition } from './GeneralTooltip';

const ConfigurationTooltip = ({
  children,
  isActive = false,
  position = TooltipPosition.BOTTOM,
  distance = 0,
  className = ''
}) => {
  // Mensajes divertidos específicos para configuración
  const configurationFunMessages = [
    "Preparando motores...",
    "Engrasando engranajes...",
    "Calibrando sistemas...",
    "Ajustando tuercas...",
    "Sincronizando relojes...",
    "Puliendo detalles...",
    "Conectando circuitos...",
    "Activando protocolo...",
    "Configurando ambiente...",
    "Optimizando rendimiento...",
    "Afinando tornillos...",
    "Verificando conexiones...",
    "Aplicando lubricante...",
    "Revisando válvulas...",
    "Iniciando secuencia..."
  ];

  return (
    <GeneralTooltip
      content="Configuración"
      position={position}
      distance={distance}
      className={className}
      isActive={isActive}
      funMessages={configurationFunMessages}
    >
      {children}
    </GeneralTooltip>
  );
};

export default ConfigurationTooltip;
