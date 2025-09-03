import React from "react"

export const params = {
  editor: {
    editorDefaultCode: `function App() {
  return (
    <div className="">  
      <h1>Hello World!</h1>
    </div>
  )
}`,

    editorExtensions: { jsx: true, typescript: false },
  },

  viewer: {
    sandboxCapabilities: {
      React,
      useState: React.useState,
      useEffect: React.useEffect,
      useCallback: React.useCallback,
      useMemo: React.useMemo,
      useRef: React.useRef,
      useContext: React.useContext,
      useReducer: React.useReducer,
    }, 
    babelPresets: ['react', 'env'],
    babelOutputFilename: 'component.jsx'
  }
}