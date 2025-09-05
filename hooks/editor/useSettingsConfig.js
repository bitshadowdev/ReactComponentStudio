import { useMemo } from 'react';
import { useConfigurationStore } from '@/stores/configurationStore';

const useSettingsConfig = () => {
  const editorConfig = useConfigurationStore((state) => state.configuration.editor);
  const visualEffectsConfig = useConfigurationStore((state) => state.configuration.visualEffects);
  const resetToDefault = useConfigurationStore((state) => state.resetToDefault);

  const hasChanges = useMemo(() => {
    const defaultEditorConfig = {
      themeMode: 'dark',
      theme: 'dracula',
      fontFamily: '"Fira Code", monospace',
      fontSize: 14,
      lineHeight: 1.5,
      letterSpacing: 0,
      lineWrapping: 'none',
      showSpaces: false,
      showTabs: false,
      showNewlines: false,
      lineNumbers: true,
      codeFolding: true,
      autocloseBrackets: true,
      indentWithTabs: false,
      tabSize: 2,
      indentUnit: 2
    };

    const defaultVisualEffectsConfig = {
      enabled: true,
      particleEffects: {
        enabled: true,
        count: 12,
        size: 4,
        theme: 'light',
        spreadRadius: 40,
        duration: 600
      },
      drawerAnimations: {
        enabled: true,
        duration: 350,
        easing: 'power3.out'
      },
      selectionEffects: {
        enabled: true,
        duration: 400,
        glowIntensity: 0.8
      },
      reducedMotion: false
    };
    
    const editorChanged = JSON.stringify(editorConfig) !== JSON.stringify(defaultEditorConfig);
    const visualEffectsChanged = JSON.stringify(visualEffectsConfig) !== JSON.stringify(defaultVisualEffectsConfig);
    
    return editorChanged || visualEffectsChanged;
  }, [editorConfig, visualEffectsConfig]);

  return {
    editorConfig,
    visualEffectsConfig,
    hasChanges,
    resetToDefault
  };
};

export default useSettingsConfig;
