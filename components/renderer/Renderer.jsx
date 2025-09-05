"use client"
import { useComponentRenderer } from '@/hooks/renderer/useComponentRenderer';
import ErrorViewer from './ErrorViewer';
import { useErrorStore } from '@/stores/errorStore';
import ComponentFrame from './ComponentFrame';

export default function Renderer({ code, triggerRender }) {
  const {renderedComponent} = useComponentRenderer(code, triggerRender);
  const error = useErrorStore((state) => state.errors)
  return (
    <div id="component-preview" className="w-full h-full">
      {error ? <ErrorViewer /> : 
        <ComponentFrame code={code} renderedComponent={renderedComponent} className="w-full h-full" />
      }
      
    </div>
  );
}