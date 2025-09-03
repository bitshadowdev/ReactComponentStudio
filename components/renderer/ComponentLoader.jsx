import { getStrings } from "@/utils/strings"

function ComponentLoader({code}) {
  const strings = getStrings('es')
  return (
    <div className="text-gray-500 italic flex items-center justify-center h-full">
      {code ? strings.ui_strings.viewer.loadingMessage : strings.ui_strings.viewer.waitingForCode}
    </div>
  )
}
export default ComponentLoader