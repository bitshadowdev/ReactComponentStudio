'use client'; // Directiva para componentes de cliente en Next.js 13+

import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { params } from '@/utils/params';

function CodeEditor({ code, onEditorChange }) {
  const extensions = [
    javascript(params.editor.editorExtensions), // Habilita el modo JSX
  ];

  return (
    <CodeMirror
      value={code}
      height="94vh"
      theme="dark"
      extensions={extensions}
      onChange={onEditorChange}
    />
  );
}

export default CodeEditor;