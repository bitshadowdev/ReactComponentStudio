import React, { useState, useEffect } from 'react';
import { transform } from "@babel/standalone";
import { params } from '@/utils/params';
import { getStrings } from '@/utils/strings';



export const useComponentRenderer = (code) => {
  const [renderedComponent, setRenderedComponent] = useState(null);
  const [error, setError] = useState(null);
  const strings = getStrings();
  const noCodeState = () => {
    setRenderedComponent(null);
    setError(null);
    return;
  }

  const makeComponent = (code) => {
    const transformedCode = transform(code, {
      presets: params.viewer.babelPresets,
      filename: params.viewer.babelOutputFilename
    }).code;

    const executeInSandbox = new Function(
      ...Object.keys(params.viewer.sandboxCapabilities),
      `
      ${transformedCode}        
      return typeof App !== 'undefined' ? App : 
              typeof Component !== 'undefined' ? Component : 
              null;
    `
    );

    return executeInSandbox(...Object.values(params.viewer.sandboxCapabilities));
  }

  const renderComponent = (Component) => {
    setRenderedComponent(React.createElement(Component));
    setError(null);
  }

  useEffect(() => {
    if (!code || code.trim() === '') {
      noCodeState()
    }

    const Component = makeComponent(code)
    if (Component && typeof Component === 'function') {
      renderComponent(Component)
    } else {
      throw new Error(strings.errors.viewer.nonValidComponentFound);
    }
    console.error(strings.errors.viewer.completeRenderingError, err);
    setError(err.message);
    setRenderedComponent(null);
    
  }, [code]);

  return {
    renderedComponent, error
  }
}