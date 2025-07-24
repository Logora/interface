import React from 'react';

export const Send = (props) => (
    <svg
      {...props} 
      width={props.width || "24"} 
      height={props.height || "24"} 
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
        <rect width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g>
        <path d="M3 20V14L11 12L3 10V4L22 12L3 20Z" />
      </g>
    </svg>
)