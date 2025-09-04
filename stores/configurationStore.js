import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const defaultConfiguration = {
  themeMode: 'dark', 
  theme: 'dracula', 
  
  fontFamily: 'Fira Code',
  fontSize: 14, 
  lineHeight: 1.5, 
  letterSpacing: 0, 
  
  lineWrapping: false, 
  
  showSpaces: false, 
  showTabs: false, 
  showNewlines: false, 
  lineNumbers: true, 
  codeFolding: true, 
  autoCloseBrackets: true, 
  indentWithTabs: false, 
  tabSize: 2, 
  indentUnit: 2 
}

export const useConfigurationStore = create(
  persist(
    (set, get) => ({
      ...defaultConfiguration,
      
      setThemeMode: (themeMode) => set({ themeMode }),
      setTheme: (theme) => set({ theme }),
      setFontFamily: (fontFamily) => set({ fontFamily }),
      setFontSize: (fontSize) => set({ fontSize }),
      setLineHeight: (lineHeight) => set({ lineHeight }),
      setLetterSpacing: (letterSpacing) => set({ letterSpacing }),
      setLineWrapping: (lineWrapping) => set({ lineWrapping }),
      setShowSpaces: (showSpaces) => set({ showSpaces }),
      setShowTabs: (showTabs) => set({ showTabs }),
      setShowNewlines: (showNewlines) => set({ showNewlines }),
      setLineNumbers: (lineNumbers) => set({ lineNumbers }),
      setCodeFolding: (codeFolding) => set({ codeFolding }),
      setAutoCloseBrackets: (autoCloseBrackets) => set({ autoCloseBrackets }),
      setIndentWithTabs: (indentWithTabs) => set({ indentWithTabs }),
      setTabSize: (tabSize) => set({ tabSize }),
      setIndentUnit: (indentUnit) => set({ indentUnit }),
      
      resetToDefault: () => set(defaultConfiguration),
      
      updateConfiguration: (newConfig) => set({ ...newConfig })
    }),
    {
      name: 'editor-configuration', 
      partialize: (state) => {
        const {
          setThemeMode,
          setTheme,
          setFontFamily,
          setFontSize,
          setLineHeight,
          setLetterSpacing,
          setLineWrapping,
          setShowSpaces,
          setShowTabs,
          setShowNewlines,
          setLineNumbers,
          setCodeFolding,
          setAutoCloseBrackets,
          setIndentWithTabs,
          setTabSize,
          setIndentUnit,
          resetToDefault,
          updateConfiguration,
          ...persistedState
        } = state
        return persistedState
      }
    }
  )
)