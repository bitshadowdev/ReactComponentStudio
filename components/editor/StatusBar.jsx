'use client';

import React from 'react';

const StatusBar = ({ children }) => {
  return (
    <div className="h-8 flex items-center border-b border-settings-surface-border bg-settings-surface-secondary text-settings-sm text-settings-text-secondary drop-shadow-sm">
      <div className="flex items-center h-full px-3">
        {children}
        <span className="font-medium text-settings-text-primary ml-2">
          Editor
        </span>
      </div>
    </div>
  );
};

export default StatusBar;
