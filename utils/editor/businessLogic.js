'use client';

/**
 * Business logic utilities for CodeMirror editor
 * Contains non-React functions for editor configuration and theming
 */

// Import CodeMirror modules
import { EditorView } from '@codemirror/view';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { material } from '@uiw/codemirror-theme-material';
import { monokai } from '@uiw/codemirror-theme-monokai';
import { eclipse } from '@uiw/codemirror-theme-eclipse';
import { solarizedLight } from '@uiw/codemirror-theme-solarized';
import { oneDark } from '@codemirror/theme-one-dark';

/**
 * Theme mapping for CodeMirror themes
 */
export const themeMap = {
  'dracula': dracula,
  'material': material,
  'monokai': monokai,
  'dark': oneDark,
  'default': undefined,
  'eclipse': eclipse,
  'solarized-light': solarizedLight,
};

/**
 * Create a dynamic font theme extension for CodeMirror
 * @param {string} fontFamily - The font family to apply
 * @returns {Object} CodeMirror theme extension
 */
export const createFontTheme = (fontFamily) => {
  return EditorView.theme({
    '.cm-content': {
      fontFamily: fontFamily
    }
  });
};

/**
 * Get the appropriate line wrapping extension based on mode
 * @param {string} mode - The line wrapping mode ('soft', 'hard', 'none')
 * @returns {Array} CodeMirror extensions array
 */
export const getWrappingExtension = (mode) => {
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

/**
 * Create basic setup configuration for CodeMirror
 * @param {Object} config - Editor configuration
 * @returns {Object} Basic setup configuration
 */
export const createBasicSetup = (config = {}) => {
  const {
    foldGutter = false,
    dropCursor = false,
    allowMultipleSelections = false,
    indentOnInput = true,
    tabSize = 2,
    lineNumbers = true,
    highlightActiveLineGutter = true,
    highlightSpecialChars = true,
    history = true,
    drawSelection = true,
    syntaxHighlighting = true,
    highlightActiveLine = true,
    autocompletion = true,
    bracketMatching = true,
    closeBrackets = true,
    searchKeymap = true,
    historyKeymap = true,
    foldKeymap = true,
    completionKeymap = true,
    lintKeymap = true,
  } = config;

  return {
    foldGutter,
    dropCursor,
    allowMultipleSelections,
    indentOnInput,
    tabSize,
    lineNumbers,
    highlightActiveLineGutter,
    highlightSpecialChars,
    history,
    drawSelection,
    syntaxHighlighting,
    highlightActiveLine,
    autocompletion,
    bracketMatching,
    closeBrackets,
    searchKeymap,
    historyKeymap,
    foldKeymap,
    completionKeymap,
    lintKeymap,
  };
};

/**
 * Select the appropriate theme based on theme name and mode
 * @param {string} themeName - Name of the theme
 * @param {string} themeMode - Theme mode ('light' or 'dark')
 * @returns {Object|undefined} Selected theme or undefined
 */
export const selectTheme = (themeName, themeMode) => {
  return themeMap[themeName] || (themeMode === 'dark' ? oneDark : undefined);
};

/**
 * Create custom styles object for font settings
 * @param {Object} config - Font configuration
 * @returns {Object} Custom styles object
 */
export const createCustomStyles = ({ fontSize, lineHeight, letterSpacing }) => {
  return {
    fontSize: `${fontSize}px`,
    lineHeight: lineHeight,
    letterSpacing: `${letterSpacing}px`
  };
};

/**
 * Create extensions array with dynamic configurations
 * @param {Object} params - Extension parameters
 * @param {string} fontFamily - Font family
 * @param {string} lineWrapping - Line wrapping mode
 * @param {Object} fontThemeCompartment - Font theme compartment
 * @param {Object} wrappingCompartment - Wrapping compartment
 * @returns {Array} Extensions array
 */
export const createExtensions = (params, fontFamily, lineWrapping, fontThemeCompartment, wrappingCompartment) => {
  const { javascript } = params.editor.editorExtensions;

  return [
    javascript,
    fontThemeCompartment?.of(createFontTheme(fontFamily)),
    wrappingCompartment?.of(getWrappingExtension(lineWrapping))
  ].filter(Boolean);
};
