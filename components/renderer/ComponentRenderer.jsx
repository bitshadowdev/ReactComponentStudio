"use client"


import { useComponentRenderer } from '@/hooks/renderer/useComponentRenderer';
import ErrorViewer from './ErrorViewer';
import ComponentLoader from './ComponentLoader';

export default function ComponentPreview({ code }) {
  const {renderedComponent, error} = useComponentRenderer(code);

  return (
    <div id="component-preview" className="">
      <div className="">
        {error ? (
          <ErrorViewer code={code} error={error} />
        ) : renderedComponent ? (
          <div className="w-full h-full">
            {renderedComponent}
          </div>
        ) : (
          <ComponentLoader code={code} />
        )}
      </div>
    </div>
  );
}