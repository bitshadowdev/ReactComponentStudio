import ComponentLoader from "./ComponentLoader"

function ComponentFrame({ code, renderedComponent }) {
  return (
    <div className="">
      {renderedComponent ? (
          <div className="w-full h-full">
            {renderedComponent}
          </div>
      ) : (
        <ComponentLoader code={code} />
      )}
    </div>
  )
}
export default ComponentFrame