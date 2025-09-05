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
    configurationTooltips: [
      "Preparando motores...",
      "Engrasando engranajes...",
      "Calibrando sistemas...",
      "Ajustando tuercas...",
      "Sincronizando relojes...",
      "Puliendo detalles...",
      "Conectando circuitos...",
      "Activando protocolo...",
      "Configurando ambiente...",
      "Optimizando rendimiento...",
      "Afinando tornillos...",
      "Verificando conexiones...",
      "Aplicando lubricante...",
      "Revisando válvulas...",
      "Iniciando secuencia...",
      "Cargando configuración...",
      "Inicializando sistema...",
      "Estableciendo conexión...",
      "Sincronizando datos..."
    ],
    settings: {
      panelTitle: "Configuración del Editor",
      footerMessage: "Presiona \"Escape\" para cerrar",
      tabs: {
        theme: "Tema",
        font: "Tipografía",
        lineWrapping: "Envoltura de línea",
        specialChars: "Caracteres especiales",
        behavior: "Comportamiento del editor",
        visualEffects: "Efectos Visuales"
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
      },
      visualEffects: {
        mainTitle: 'Efectos Visuales',
        enabledLabel: 'Habilitar efectos visuales',
        enabledDescription: 'Activa o desactiva todos los efectos de animación',
        
        particlesTitle: 'Efectos de Partículas',
        particlesEnabled: 'Habilitar partículas',
        particlesEnabledDescription: 'Muestra efectos de partículas al hacer clic',
        particleCount: 'Cantidad de partículas',
        particleSize: 'Tamaño de partículas',
        particleTheme: 'Tema de color',
        particleSpread: 'Radio de dispersión',
        particleDuration: 'Duración (ms)',
        
        drawerTitle: 'Animaciones de Cajón',
        drawerEnabled: 'Habilitar animaciones',
        drawerEnabledDescription: 'Anima la apertura/cierre de dropdowns',
        drawerDuration: 'Duración (ms)',
        drawerEasing: 'Tipo de animación',
        
        selectionTitle: 'Efectos de Selección',
        selectionEnabled: 'Habilitar efectos',
        selectionEnabledDescription: 'Resalta elementos seleccionados',
        selectionDuration: 'Duración (ms)',
        selectionGlow: 'Intensidad del brillo',
        
        accessibilityTitle: 'Accesibilidad',
        reducedMotion: 'Movimiento reducido',
        reducedMotionDescription: 'Reduce las animaciones para mayor accesibilidad'
      }
    }
  }
};

export function getStrings(lang) {
  if (lang === 'es') {
    return strings_es
  } else {
    return strings_es
  }
}