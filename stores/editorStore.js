import { create } from 'zustand';

import { params } from '@/utils/params';

const useEditorStore = create((set) => ({
  editorInstance: null,
  code: params.editor.editorDefaultCode,
  triggerRender: false,

  setEditorInstance: (instance) => set({ editorInstance: instance }),
  clearEditorInstance: () => set({ editorInstance: null }),
  setCode: (newCode) => set({ code: newCode }),
  setTriggerRender: (value) => set(state => ({ triggerRender: typeof value === 'function' ? value(state.triggerRender) : value }))
}));

export { useEditorStore };

// This store is used to manage the editor instance and related state.
// It follows the same pattern as other stores in the application.
// The editor instance is set when the editor is initialized and cleared when unmounted.
