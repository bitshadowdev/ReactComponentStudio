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
  selectTheme,
  createBasicSetup,
  createCustomStyles,
  createExtensions
} from '@/utils/editor/businessLogic';

import {
  editorParams,
  keyboardConfig
} from '@/utils/editor/config';

import { handleKeyUp } from '@/utils/editor/keyboardHandlers';

/**
 * Custom hook for managing CodeMirror editor state and behavior
 * @param {Object} params - Hook parameters
 * @param {Function} params.setTriggerRender - Render trigger function
 * @returns {Object} Hook return values
 */
export const useCodeMirror = ({
  setTriggerRender
}) => {
  // Editor instance ref
  const editorRef = useRef(null);
  const setEditorInstance = useEditorStore(state => state.setEditorInstance);

  // Initialize state
  const initState = () => {
    const editorConfig = useConfigurationStore((state) => state.configuration.editor);
    const {
      theme,
      themeMode,
      fontFamily,
      fontSize,
      lineHeight,
      letterSpacing,
      showSpaces,
      showTabs,
      showNewlines
    } = editorConfig;

    return {
      customStyle: createCustomStyles({ fontSize, lineHeight, letterSpacing }),
      selectedTheme: selectTheme(theme, themeMode),
      basicSetupConfig: createBasicSetup(),
      extensions: createExtensions(editorParams, fontFamily),
      invisiblesClass: (showSpaces || showTabs || showNewlines) ? 'cm-show-invisibles' : '',
      editorConfig
    };
  };

  const {
    customStyle,
    selectedTheme,
    basicSetupConfig,
    extensions,
    invisiblesClass,
    editorConfig
  } = initState();

  // Create compartments for dynamic theming
  const [fontThemeCompartment] = useState(() => new Compartment());

  // Effect: Update font family dynamically via CSS when it changes
  useEffect(() => {
    // Find all CodeMirror content elements and update their font family
    const contentElements = document.querySelectorAll('.cm-content');
    contentElements.forEach(element => {
      element.style.fontFamily = editorConfig.fontFamily;
    });

    if (process.env.NODE_ENV === 'development') {
      console.debug('[FontUpdate] Applied font family:', editorConfig.fontFamily);
    }
  }, [editorConfig.fontFamily]);

  // Effect: Set up editor instance and cleanup
  useEffect(() => {
    const editor = editorRef.current?.editor;
    if (!editor) return;

    // Set editor instance
    setEditorInstance(editor);

    // Cleanup function
    return () => {
      // Only cleanup if editor still exists
      if (editorRef.current?.editor === editor) {
        setEditorInstance(null);
      }
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
