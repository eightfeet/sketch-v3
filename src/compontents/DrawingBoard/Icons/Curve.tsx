import React, { SVGProps } from 'react';

const Curve = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon"
        viewBox="0 0 16 16"
        {...props}
    >
        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" d="M2.5,7.5c1-4,4-4.5,5-4c2,1-3,6,1,8c2,1,5-1,4-5" />
    </svg>
)

export default Curve