import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const defaultConfiguration = {
  configuration: {
    editor: {
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
    },
    visualEffects: {
      enabled: true,
      particleEffects: {
        enabled: true,
        count: 12,
        size: 4,
        theme: 'light', // 'light', 'dark', 'accent'
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
      reducedMotion: false // Modo accesibilidad
    }
  }
}

export const useConfigurationStore = create(
  persist(
    (set, get) => ({
      ...defaultConfiguration,
      
      setEditorConfiguration: (newConfig) => 
        set(state => ({
          configuration: {
            ...state.configuration,
            editor: {
              ...state.configuration.editor,
              ...newConfig
            }
          }
        })),

      setVisualEffectsConfiguration: (newConfig) =>
        set(state => ({
          configuration: {
            ...state.configuration,
            visualEffects: {
              ...state.configuration.visualEffects,
              ...newConfig
            }
          }
        })),

      setParticleEffects: (newConfig) =>
        set(state => ({
          configuration: {
            ...state.configuration,
            visualEffects: {
              ...state.configuration.visualEffects,
              particleEffects: {
                ...state.configuration.visualEffects.particleEffects,
                ...newConfig
              }
            }
          }
        })),

      setDrawerAnimations: (newConfig) =>
        set(state => ({
          configuration: {
            ...state.configuration,
            visualEffects: {
              ...state.configuration.visualEffects,
              drawerAnimations: {
                ...state.configuration.visualEffects.drawerAnimations,
                ...newConfig
              }
            }
          }
        })),

      setSelectionEffects: (newConfig) =>
        set(state => ({
          configuration: {
            ...state.configuration,
            visualEffects: {
              ...state.configuration.visualEffects,
              selectionEffects: {
                ...state.configuration.visualEffects.selectionEffects,
                ...newConfig
              }
            }
          }
        })),
      
      resetToDefault: () => set(defaultConfiguration)
    }),
    {
      name: 'editor-configuration',
      partialize: (state) => {
        const { setEditorConfiguration, resetToDefault, ...persistedState } = state
        return persistedState
      }
    }
  )
)