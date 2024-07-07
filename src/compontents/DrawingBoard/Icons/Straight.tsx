import React, { SVGProps } from 'react';

const Straight = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon"
        viewBox="0 0 16 16"
        {...props}
    >
         <line fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" x1="3.5" y1="3.5" x2="12" y2="12" />
    </svg>
)

export default Straight