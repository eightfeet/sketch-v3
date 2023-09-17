import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon"
    viewBox="0 0 1570 1024"
    {...props}
  >
    <path fill="currentColor" d="M1563.864 1009.075h-168.478l-298.073-494.503-103.676 121.939v372.564H844.599V13.63h149.038v430.777l369.35-430.777h174.957L1194.51 403.658l369.354 605.417zM397.489 438.585c94.971 36.42 168.476 76.678 220.316 125.43 51.838 48.301 77.758 103.604 77.758 165.636 0 89.32-31.387 160.086-93.282 212.48-63.349 52.39-148.7 78.586-255.199 78.586-109.464 0-193.703-27.106-254.147-81.498C32.39 884.918 2.218 816.971 2.218 735.473v-40.749h149.036v34.927c0 58.213 19.44 102.873 58.318 133.89 38.88 31.108 84.239 46.572 137.51 46.572 67.62 0 118.445-16.464 150.845-49.483 32.399-32.925 48.598-72.766 48.598-119.337 0-38.748-19.44-74.675-58.319-107.693-38.879-32.928-95.072-63.035-167.933-90.231-104.22-34.927-178.738-73.677-224.098-116.426-44.527-42.66-68.04-93.14-68.04-149.669 0-83.184 32.12-149.128 93.96-197.752 62.57-52.249 137.088-77.534 224.987-77.534 110.852 0 191.85 30.107 241.795 90.229 50.734 60.214 74.285 125.76 74.285 195.015H514.127c4.251-42.66-8.708-81.5-38.88-116.427-30.272-34.928-73.506-51.693-128.165-51.693-53.271 0-94.377 11.945-124.549 37.14-30.274 25.286-45.36 59.214-45.36 101.873 0 34.927 11.847 65.034 35.64 90.231 23.693 25.285 85.25 55.302 184.676 90.229z" />
  </svg>
)
export { SvgComponent as IconSK }