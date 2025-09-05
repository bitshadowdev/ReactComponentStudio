import { useCallback } from 'react';
import { useEditorStore } from '@/stores/editorStore';

export default function useEditor() {
  const code = useEditorStore(state => state.code);
  const setCode = useEditorStore(state => state.setCode);
  const triggerRender = useEditorStore(state => state.triggerRender);
  const setTriggerRender = useEditorStore(state => state.setTriggerRender);

  const onEditorChange = useCallback((newCode) => {
    setCode(newCode);
  }, [setCode]);

  return {
    code,
    onEditorChange,
    triggerRender,
    setTriggerRender
  };
}