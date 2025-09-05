'use client';

/**
 * Custom hook for CodeMirror editor states and behavior
 * Handles all React states, effects, and event handlers
 */

import { useEffect, useState, useRef } from 'react';
import { Compartment } from '@codemirror/state';
import { useEditorStore } from '@/stores/editorStore';
import { useConfigurationStore } from '@/stores/configurationStore';

import {
  createFontTheme,
  getWrappingExtension,
  selectTheme,
  createBasicSetup,
  createCustomStyles,
  createExtensions
} from '@/utils/editor/businessLogic';

import {
  editorParams,
  keyboardConfig
} from '@/utils/editor/config';

/**
 * Custom hook for managing CodeMirror editor state and behavior
 * @param {Object} params - Hook parameters
 * @param {string} params.code - Current code value
 * @param {Function} params.onEditorChange - Code change handler
 * @param {Function} params.setTriggerRender - Render trigger function
 * @param {boolean} params.isSettingsOpen - Settings panel state
 * @param {Function} params.setIsSettingsOpen - Settings panel toggle function
 * @returns {Object} Hook return values
 */
export const useCodeMirror = ({
  code,
  onEditorChange,
  setTriggerRender,
  isSettingsOpen,
  setIsSettingsOpen
}) => {
  // Editor instance ref
  const editorRef = useRef(null);
  const setEditorInstance = useEditorStore(state => state.setEditorInstance);

  // Create compartments for dynamic theming
  const [fontThemeCompartment] = useState(() => new Compartment());
  const [wrappingCompartment] = useState(() => new Compartment());

  // Get configuration from store
  const editorConfig = useConfigurationStore((state) => state.configuration.editor);

  // Extract configuration values
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
    showNewlines
  } = editorConfig;

  // Create derived values
  const customStyle = createCustomStyles({ fontSize, lineHeight, letterSpacing });
  const selectedTheme = selectTheme(theme, themeMode);
  const basicSetupConfig = createBasicSetup();
  const extensions = createExtensions(
    editorParams,
    fontFamily,
    lineWrapping,
    fontThemeCompartment,
    wrappingCompartment
  );

  // CSS class for showing invisibles
  const invisiblesClass = (showSpaces || showTabs || showNewlines) ? 'cm-show-invisibles' : '';

  // Keyboard event handler
  const handleKeyUp = (event) => {
    const { shortcuts } = keyboardConfig;
    const renderShortcut = shortcuts.render;

    if (event.altKey && event.key === renderShortcut.key) {
      event.preventDefault();
      setTriggerRender((render) => !render);
    }
  };

  // Effect: Update line wrapping dynamically when it changes
  useEffect(() => {
    if (wrappingCompartment) {
      // Force re-evaluation of the wrapping extension
      const newExtension = getWrappingExtension(lineWrapping);
      // This will be handled by the compartment system automatically
    }
  }, [lineWrapping, wrappingCompartment]);

  // Effect: Update font family dynamically via CSS when it changes
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

  // Effect: Set up editor instance and cleanup
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

  return {
    // Refs
    editorRef,

    // Configuration
    customStyle,
    selectedTheme,
    basicSetupConfig,
    extensions,
    invisiblesClass,

    // Event handlers
    handleKeyUp,

    // State
    editorConfig
  };
};

export default useCodeMirror;
