import React from 'react';

export const ExpertBadge = (props) => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <mask
            id="mask0_167_6302"
            style={{ maskType: 'alpha' }}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="24"
            height="24"
        >
            <rect width="24" height="24" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_167_6302)">
            <path
                d="M6 23V14.775L2.75 9.5L7.375 2H16.625L21.25 9.5L18 14.775V23L12 21L6 23ZM8 20.225L12 18.9L16 20.225V17H8V20.225ZM8.5 4L5.1 9.5L8.5 15H15.5L18.9 9.5L15.5 4H8.5ZM10.95 13.575L7.4 10.05L8.825 8.625L10.95 10.75L15.175 6.5L16.6 7.9L10.95 13.575Z"
            />
        </g>
  </svg>
)