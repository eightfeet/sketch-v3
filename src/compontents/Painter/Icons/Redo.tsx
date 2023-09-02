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
    <path d="M740.16 55.744 704.32 91.52l217.408 217.728H334.4A329.408 329.408 0 0 0 4.928 638.784 329.472 329.472 0 0 0 334.4 968.256h253.568v-50.688H334.4a278.848 278.848 0 0 1 0-557.696h587.328L704.064 577.664l36.032 35.776 278.784-278.912L740.16 55.744z" />
  </svg>
)
export default SvgComponent
