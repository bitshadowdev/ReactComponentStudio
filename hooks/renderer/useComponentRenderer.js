import React, { useState, useEffect } from 'react';
import { transform } from "@babel/standalone";
import { params } from '@/utils/params';
import { getStrings } from '@/utils/strings';
import { useErrorStore } from '@/stores/errorStore';



export const useComponentRenderer = (code, triggerRender) => {
  const [renderedComponent, setRenderedComponent] = useState(null);
  const error = useErrorStore((state) => {state.errors});
  const strings = getStrings();

  const noCodeState = () => {
    setRenderedComponent(null);
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
    if (!error) {
      setRenderedComponent(React.createElement(Component));

    }
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

    
  }, [triggerRender]);

  return {
    renderedComponent
  }
}