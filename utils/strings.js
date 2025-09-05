const strings_es = {
  errors: {
    viewer: {
      nonValidComponentFound: "No se encontró un componente válido (buscando App o Component)",
      completeRenderingError: "Error de renderizado completo:",
      componentViewerError: "¡Oh no!, ha ocurrido un error."
    },
  },
  ui_strings: {
    viewer: {
      loadingMessage: "Procesando componente...", 
      waitingForCode: "Ingresa código React para ver la vista previa"
    },
    editor: {
      statusBar: {
        configTooltip: "Configuración"
      }
    },
    settings: {
      panelTitle: "Configuración del Editor",
      footerMessage: "Presiona \"Escape\" para cerrar",
      tabs: {
        theme: "Tema",
        font: "Tipografía",
        lineWrapping: "Envoltura de línea",
        specialChars: "Caracteres especiales",
        behavior: "Comportamiento del editor"
      },
      theme: {
        modeTitle: "Modo General",
        lightMode: "Claro",
        darkMode: "Oscuro",
        specificTheme: "Tema Específico",
        fontFamily: "Familia de Fuente"
      },
      font: {
        fontSize: "Tamaño de Letra",
        lineHeight: "Interlineado",
        letterSpacing: "Espaciado entre Caracteres"
      },
      lineWrapping: {
        title: "Envoltura de Línea",
        description: "Habilitar/Deshabilitar el ajuste automático de líneas largas",
        modeTitle: "Modo de Envoltura",
        modeDescription: "Las líneas se ajustan al ancho visible del editor",
        note: "Nota: El ajuste de línea se realiza automáticamente según el ancho del editor."
      },
      specialChars: {
        showSpaces: "Mostrar Espacios en Blanco",
        showSpacesDesc: "Hacer visibles los espacios (mostrados como puntos centrados)",
        showTabs: "Mostrar Tabuladores",
        showTabsDesc: "Hacer visibles los caracteres de tabulación (mostrados como flechas)",
        showNewlines: "Mostrar Saltos de Línea",
        showNewlinesDesc: "Hacer visibles los finales de línea (mostrados con símbolo ¶)"
      },
      editorBehavior: {
        lineNumbers: "Números de Línea",
        lineNumbersDesc: "Mostrar/Ocultar la numeración de las líneas",
        codeFolding: "Plegado de Código",
        codeFoldingDesc: "Habilitar la capacidad de contraer y expandir bloques de código",
        autoCloseChars: "Autocierre de Caracteres",
        autoCloseCharsDesc: "Cierre automático de paréntesis, llaves, corchetes y comillas",
        useTabs: "Usar Tabuladores",
        useTabsDesc: "Usar tabuladores en lugar de espacios para la indentación",
        tabSize: "Tamaño de Tabulación",
        indentUnit: "Unidad de Indentación",
        reindentButton: "Aplicar nueva indentación"
      }
    }
  }
}

export function getStrings(lang) {
  if (lang === 'es') {
    return strings_es
  } else {
    return strings_es
  }
}