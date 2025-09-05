import React from 'react';

export const withTooltipVisibility = (WrappedComponent) => {
  return function WithTooltipVisibility({ isVisible, ...props }) {
    return isVisible ? (
      <WrappedComponent {...props} />
    ) : null;
  };
};
