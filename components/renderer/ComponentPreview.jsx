import { ErrorBoundary } from "react-error-boundary";
import Renderer from "./Renderer"
import { useErrorStore } from "@/stores/errorStore";
import ErrorViewer from "./ErrorViewer";


function ComponentPreview({ ...props }) {
  const setError = useErrorStore((state) => state.setErrors);

  const handleComponentError = (err) => {
    setError(err)
  }

  return (
    <ErrorBoundary 
      resetKeys={[props.code]} 
      fallbackRender={ErrorViewer} 
      onError={handleComponentError}
    >
      <Renderer {...props} />
    </ErrorBoundary>
  )
}
export default ComponentPreview