import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon"
    viewBox="0 0 1024 1024"
    {...props}
  >
    <path d="m913.408 795.136-360.96 208.384c-26.624 15.36-59.904 15.36-87.04 0l-360.96-208.384c-26.624-15.36-43.52-44.544-43.52-75.264V303.104c0-31.232 16.896-59.904 43.52-75.264l360.96-208.384c26.624-15.36 59.904-15.36 87.04 0l360.96 208.384c26.624 15.36 43.52 44.544 43.52 75.264v416.768c0 30.72-16.896 59.904-43.52 75.264zm-414.72 150.528c6.144 3.584 14.336 3.584 20.48 0l360.96-208.384c6.144-3.584 10.24-10.24 10.24-17.92V302.592c0-7.168-4.096-13.824-10.24-17.92L519.168 76.288c-6.144-3.584-14.336-3.584-20.48 0l-360.96 208.384c-6.144 3.584-10.24 10.24-10.24 17.92V719.36c0 7.168 4.096 13.824 10.24 17.92l360.96 208.384z" />
    <path d="M548.352 532.992c-9.216 15.872-29.696 21.504-45.568 12.288L113.152 320c-15.872-9.216-21.504-29.696-12.288-45.568 9.216-15.872 29.696-21.504 45.568-12.288l389.632 225.28c16.384 9.216 21.504 29.696 12.288 45.568z" />
    <path d="M519.68 483.84c18.432 0 33.28 14.848 33.28 33.28v450.048c0 18.432-14.848 33.28-33.28 33.28s-33.28-14.848-33.28-33.28V517.12c0-18.432 15.36-33.28 33.28-33.28z" />
    <path d="M491.52 532.992c-9.216-15.872-3.584-36.352 12.288-45.568l389.632-225.28c15.872-9.216 36.352-3.584 45.568 12.288 9.216 15.872 3.584 36.352-12.288 45.568L537.088 545.28c-15.872 9.216-36.352 3.584-45.568-12.288z" />
  </svg>
)
export { SvgComponent as IconMD }
