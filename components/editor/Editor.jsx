'use client'; // Directiva para componentes de cliente en Next.js 13+

import { useEffect, useState, useRef } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { useEditorStore } from '@/stores/editorStore';
import { javascript } from '@codemirror/lang-javascript';
import { params } from '@/utils/params';
import { useConfigurationStore } from '@/stores/configurationStore';

// Import themes and extensions from CodeMirror
// Import additional CodeMirror modules for dynamic theming
import { EditorView } from '@codemirror/view';
import { Compartment } from '@codemirror/state';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { material } from '@uiw/codemirror-theme-material';
import { monokai } from '@uiw/codemirror-theme-monokai';
import { eclipse } from '@uiw/codemirror-theme-eclipse';
import { solarizedLight } from '@uiw/codemirror-theme-solarized';
import { oneDark } from '@codemirror/theme-one-dark';

// Import status bar components
import StatusBar from './StatusBar';
import EditorStatusElement from './EditorStatusElement';

// Map themes to their imports
const themeMap = {
  'dracula': dracula,
  'material': material,
  'monokai': monokai,
  'dark': oneDark,
  'default': undefined,
  'eclipse': eclipse,
  'solarized-light': solarizedLight,
};

function CodeEditor({ code, onEditorChange, setTriggerRender, isSettingsOpen, setIsSettingsOpen }) {
  const editorRef = useRef(null);
  const setEditorInstance = useEditorStore(state => state.setEditorInstance);
  
  // Create compartments for dynamic theming
  const [fontThemeCompartment] = useState(() => new Compartment());
  const [wrappingCompartment] = useState(() => new Compartment());
  
  // Get configuration from store
  const {
    theme,
    themeMode,
    fontFamily,
    fontSize,
    lineHeight,
    letterSpacing,
    lineWrapping,
    showSpaces,
    showTabs,
    showNewlines,
    lineNumbers,
    autocloseBrackets,
    indentWithTabs,
    tabSize,
    indentUnit,
    codeFolding
  } = useConfigurationStore((state) => state.configuration.editor);
  
  // Custom styles for font settings (excluding fontFamily since it's handled by CSS)
  const customStyle = {
    fontSize: `${fontSize}px`,
    lineHeight: lineHeight,
    letterSpacing: `${letterSpacing}px`
  };

  // Create dynamic font theme extension
  const createFontTheme = (fontFamily) => EditorView.theme({
    '.cm-content': {
      fontFamily: fontFamily
    }
  });

  // Get the appropriate line wrapping extension based on mode
  const getWrappingExtension = (mode) => {
    switch (mode) {
      case 'soft':
        return EditorView.lineWrapping;
      case 'hard':
        // For hard wrapping, we could add a word wrap column extension
        // For now, we'll use soft wrapping as a fallback
        return EditorView.lineWrapping;
      case 'none':
      default:
        return [];
    }
  };

  // Create extensions array with dynamic font theme
  const extensions = [
    javascript(params.editor.editorExtensions),
    fontThemeCompartment.of(createFontTheme(fontFamily)),
    wrappingCompartment.of(getWrappingExtension(lineWrapping))
  ];

  const onAltEnter = (event) => {
    event.preventDefault();
    
    if (event.altKey && event.key === 'Enter')  {
      setTriggerRender((render) => !render);
    }
  }

  const selectedTheme = themeMap[theme] || (themeMode === 'dark' ? oneDark : undefined);

  // Update line wrapping dynamically when it changes
  useEffect(() => {
    if (wrappingCompartment) {
      // Force re-evaluation of the wrapping extension
      const newExtension = getWrappingExtension(lineWrapping);
      // This will be handled by the compartment system automatically
    }
  }, [lineWrapping, wrappingCompartment]);

  // Update font family dynamically via CSS when it changes
  useEffect(() => {
    // Find all CodeMirror content elements and update their font family
    const contentElements = document.querySelectorAll('.cm-content');
    contentElements.forEach(element => {
      element.style.fontFamily = fontFamily;
    });

    if (process.env.NODE_ENV === 'development') {
      console.debug('[FontUpdate] Applied font family:', fontFamily);
    }
  }, [fontFamily]);

  // Set up editor instance and cleanup
  useEffect(() => {
    // Set the editor instance when it's available
    if (editorRef.current?.editor) {
      setEditorInstance(editorRef.current.editor);
    }
    
    // Cleanup function
    return () => {
      setEditorInstance(null);
    };
  }, [setEditorInstance]);

  return (
    <div className="flex flex-col h-full relative">
      <StatusBar>
        <EditorStatusElement 
          onClick={() => setIsSettingsOpen(!isSettingsOpen)} 
          isSettingsOpen={isSettingsOpen}
        />
      </StatusBar>
      <div className="flex-1 overflow-hidden h-full">
        <CodeMirror
          ref={editorRef}
          value={code}
          height="91vh"
          width="100%"
          extensions={[
            javascript({ jsx: true, typescript: true }),
            fontThemeCompartment.of(createFontTheme(fontFamily)),
            wrappingCompartment.of(getWrappingExtension(lineWrapping))
          ]}
          theme={selectedTheme}
          onChange={onEditorChange}
          onKeyUp={onAltEnter}
          basicSetup={{
            foldGutter: false,
            dropCursor: false,
            allowMultipleSelections: false,
            indentOnInput: true,
            tabSize: 2,
            lineNumbers: true,
            highlightActiveLineGutter: true,
            highlightSpecialChars: true,
            history: true,
            drawSelection: true,
            syntaxHighlighting: true,
            highlightActiveLine: true,
            autocompletion: true,
            bracketMatching: true,
            closeBrackets: true,
            searchKeymap: true,
            historyKeymap: true,
            foldKeymap: true,
            completionKeymap: true,
            lintKeymap: true,
          }}
          style={customStyle}
          className={showSpaces || showTabs || showNewlines ? 'cm-show-invisibles' : ''}
        />
      </div>
    </div>
  );
}

export default CodeEditor;