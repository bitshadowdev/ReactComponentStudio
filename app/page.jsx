"use client"

import ComponentEditor from "@/components/editor/Editor";
import ComponentPreview from "@/components/renderer/ComponentRenderer";
import useEditor from "@/hooks/editor/useEditor";

export default function Home() {
  const {code, onEditorChange} = useEditor();

  return (
    <section id="editorLayout" className="flex w-full">
      <div id="editor" className="w-1/2 border-r flex flex-col">

        <div className="flex-1 overflow-hidden">
          <ComponentEditor code={code} onEditorChange={onEditorChange} />
        </div>
      </div>
      <div className="w-1/2 flex flex-col">
        <ComponentPreview code={code} />
      </div>
    </section>
  );
}