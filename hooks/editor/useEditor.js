import { useCallback, useState } from "react";
import { params } from '@/utils/params';

export default function useEditor() {
  const [code, setCode] = useState(params.editor.editorDefaultCode);
  const onEditorChange = useCallback((code, viewUpdate) => {
    setCode(code)
  });

  return {
    code, setCode, onEditorChange
  }
}