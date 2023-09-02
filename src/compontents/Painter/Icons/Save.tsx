import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={200}
    height={200}
    className="icon"
    viewBox="0 0 1024 1024"
    {...props}
  >
    <path d="M700.864 240v168.144a25.6 25.6 0 0 1-25.6 25.6h-320.96a25.6 25.6 0 0 1-25.6-25.6V240H256v549.568h517.568V240h-72.704zm-48 0h-276.16v145.744h276.16V240zM224 192h581.568a16 16 0 0 1 16 16v613.568a16 16 0 0 1-16 16H224a16 16 0 0 1-16-16V208a16 16 0 0 1 16-16zm346.432 89.04h16a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16z" />
  </svg>
)
export { SvgComponent as Save }