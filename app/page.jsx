"use client"

import ComponentEditor from "@/components/editor/Editor";
import ComponentPreview from "@/components/renderer/ComponentPreview";
import useEditor from "@/hooks/editor/useEditor";
import { useHotkeys } from "react-hotkeys-hook";

export default function Home() {
  const {code, onEditorChange, triggerRender, setTriggerRender} = useEditor();
  useHotkeys("alt+enter", () => {setTriggerRender((render) => !render); console.log("render");});

  return (
    <section id="editorLayout" className="flex w-full">
      <div id="editor" className="w-1/2 border-r flex flex-col">
        <div className="flex-1 overflow-hidden">
          <ComponentEditor setTriggerRender={setTriggerRender} code={code} onEditorChange={onEditorChange} setTriggerRender={setTriggerRender} />
        </div>
      </div>
      <div className="w-1/2 flex flex-col">

        <ComponentPreview code={code} triggerRender={triggerRender}/>
      </div>
    </section>
  );
}