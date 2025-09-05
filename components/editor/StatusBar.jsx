'use client';

import React from 'react';

const StatusBar = ({ children }) => {
  return (
    <div className="h-8 flex items-center justify-between border-b border-gray-200 bg-gray-50 text-xs text-gray-600 drop-shadow-sm">
      <div className="flex items-center h-full px-3 font-medium text-gray-800">
        Editor
      </div>
      
      <div className="flex items-center h-full">
        {children}
      </div>
    </div>
  );
};

export default StatusBar;
