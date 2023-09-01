import { SVGProps } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1127 1024"
    {...props}
  >
    <path fill="currentColor" d="M102.4 0H1024v51.2H102.4V0ZM51.2 102.4h1024v51.2H51.2v-51.2ZM0 211.405v805.99c0 3.635 3.226 6.605 7.168 6.605h1112.013c3.993 0 7.168-2.97 7.168-6.605v-805.99c.051-3.635-3.175-6.605-7.168-6.605H7.168C3.226 204.8 0 207.77 0 211.405zM51.2 256h1024v716.8H51.2V256z" />
  </svg>
);
export { SvgComponent as EmpytIcon };
