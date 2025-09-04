import { getStrings } from "@/utils/strings"

function ErrorViewer({ error, resetErrorBoundary }) {
  const strings = getStrings('es');

  return ( 
    <div id="error">
      <h2>{strings.errors.viewer.componentViewerError} </h2>
      <button onClick={resetErrorBoundary}>Intentarlo de nuevo</button>
    </div>
  )
}
export default ErrorViewer