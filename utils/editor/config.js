'use client';

/**
 * Configuration utilities for CodeMirror editor
 * Contains boilerplate configurations and default settings
 */

import { javascript } from '@codemirror/lang-javascript';

/**
 * Default editor parameters and configurations
 */
export const editorParams = {
  editor: {
    editorExtensions: {
      javascript: javascript({ jsx: true, typescript: true })
    }
  }
};

/**
 * Default editor configuration values
 */
export const defaultEditorConfig = {
  theme: 'default',
  themeMode: 'light',
  fontFamily: 'JetBrains Mono, monospace',
  fontSize: 14,
  lineHeight: 1.5,
  letterSpacing: 0,
  lineWrapping: 'none',
  showSpaces: false,
  showTabs: false,
  showNewlines: false,
  lineNumbers: true,
  autocloseBrackets: true,
  indentWithTabs: false,
  tabSize: 2,
  indentUnit: '  ',
  codeFolding: true
};

/**
 * Editor layout configurations
 */
export const layoutConfig = {
  height: '91vh',
  width: '100%',
  containerClasses: 'flex flex-col h-full relative',
  contentClasses: 'flex-1 overflow-hidden h-full'
};

/**
 * Keyboard shortcuts configuration
 */
export const keyboardConfig = {
  shortcuts: {
    render: {
      key: 'Enter',
      modifier: 'alt',
      description: 'Trigger component render'
    }
  }
};

/**
 * Status bar configuration
 */
export const statusBarConfig = {
  position: 'top',
  height: 'auto'
};

/**
 * Create editor props configuration
 * @param {Object} config - Editor configuration
 * @returns {Object} Props object for CodeMirror
 */
export const createEditorProps = (config) => {
  const {
    height = layoutConfig.height,
    width = layoutConfig.width,
    extensions = [],
    theme = undefined,
    onChange = () => {},
    onKeyUp = () => {},
    basicSetup = {},
    style = {},
    className = ''
  } = config;

  return {
    height,
    width,
    extensions,
    theme,
    onChange,
    onKeyUp,
    basicSetup,
    style,
    className
  };
};
