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