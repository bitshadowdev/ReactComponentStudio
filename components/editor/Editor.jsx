'use client'; // Directiva para componentes de cliente en Next.js 13+

import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { params } from '@/utils/params';
import { useHotkeys } from 'react-hotkeys-hook';
import useEditor from '@/hooks/editor/useEditor';

function CodeEditor({ code, onEditorChange, setTriggerRender }) {
  const extensions = [
    javascript(params.editor.editorExtensions), // Habilita el modo JSX
  ];

  const onAltEnter = (event) => {
    event.preventDefault();
    
    if (event.altKey && event.key === 'Enter')  {
      setTriggerRender((render) => !render);
    }
  }


  return (
    <CodeMirror
      value={code}
      height="94vh"
      theme="dark"
      extensions={extensions}
      onChange={onEditorChange}
      onKeyUp={onAltEnter}
    />
  );
}

export default CodeEditor;