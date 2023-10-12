import React from 'react';

export const Clock = (props) => (
    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="9" cy="9" r="8.45" stroke="black" strokeWidth="1.1"/>
        <path d="M8.5 4.5V9.5H12.5" stroke="black" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)
