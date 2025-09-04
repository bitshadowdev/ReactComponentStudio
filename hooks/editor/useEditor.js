import { useCallback, useState } from "react";
import { params } from '@/utils/params';

export default function useEditor() {
  const [code, setCode] = useState(params.editor.editorDefaultCode);
  const [lineCount, setLineCount] = useState(0);
  const [triggerRender, setTriggerRender] = useState(false);

  const onEditorChange = useCallback((code, viewUpdate) => {
    const currentLineCount = code.split("\n").length
    console.log(currentLineCount)
    if (currentLineCount !== lineCount) {
      setLineCount(currentLineCount)
      setTriggerRender((render) => !render)    
    }

    setCode(code);
  });



  return {
    code, setCode, onEditorChange, triggerRender, setTriggerRender
  }
}