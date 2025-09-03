function ErrorViewer({code, error}) {
  return (
    <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded">
      <h3 className="font-bold text-red-800">Error de renderizado:</h3>
      <p className="mt-1">{error}</p>
      <details className="mt-2">
        <summary className="cursor-pointer text-sm">Ver código</summary>
        <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto max-h-32">
          {code}
        </pre>
      </details>
    </div>
  )
}
export default ErrorViewer