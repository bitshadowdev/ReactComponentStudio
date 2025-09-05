'use client'; // Directiva para componentes de cliente en Next.js 13+

import CodeMirror from '@uiw/react-codemirror';
import { useCodeMirror } from '@/hooks/editor/useCodeMirror';
import { layoutConfig } from '@/utils/editor/config';

// Import status bar components
import StatusBar from './StatusBar';
import EditorStatusElement from './EditorStatusElement';

/**
 * CodeEditor component - The main editor layout container
 * @param {Object} props - Component props
 * @param {string} props.code - The code to display in the editor
 * @param {Function} props.onEditorChange - Callback for when the code changes
 * @param {Function} props.setTriggerRender - Function to trigger a re-render of the component preview
 * @param {boolean} props.isSettingsOpen - Whether the settings panel is open
 * @param {Function} props.setIsSettingsOpen - Function to toggle the settings panel
 */
function CodeEditor({
  code,
  onEditorChange,
  setTriggerRender,
  isSettingsOpen,
  setIsSettingsOpen,
}) {
  const {
    editorRef,
    customStyle,
    selectedTheme,
    basicSetupConfig,
    extensions,
    invisiblesClass,
    handleKeyUp,
  } = useCodeMirror({
    code,
    onEditorChange,
    setTriggerRender,
    isSettingsOpen,
    setIsSettingsOpen,
  });

  return (
    <div className={layoutConfig.containerClasses}>
      <StatusBar>
        <EditorStatusElement
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          isSettingsOpen={isSettingsOpen}
        />
      </StatusBar>
      <div className={layoutConfig.contentClasses}>
        <CodeMirror
          ref={editorRef}
          value={code}
          height={layoutConfig.height}
          width={layoutConfig.width}
          extensions={extensions}
          theme={selectedTheme}
          onChange={onEditorChange}
          onKeyUp={handleKeyUp}
          basicSetup={basicSetupConfig}
          style={customStyle}
          className={invisiblesClass}
        />
      </div>
    </div>
  );
}

export default CodeEditor;