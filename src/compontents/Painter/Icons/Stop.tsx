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
    <path
      fill="#f00"
      d="M512 1024A512 512 0 1 1 512 0a512 512 0 0 1 0 1024zm3.008-92.992a416 416 0 1 0 0-832 416 416 0 0 0 0 832zM320 320h384v384H320V320z"
    />
  </svg>
)
export { SvgComponent as Stop }