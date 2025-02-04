import React, { useEffect } from 'react';
import { useLocation } from 'react-router';

export const ScrollToTop = (props) => {
    const { pathname, search } = useLocation();

    useEffect(() => {
        if(typeof window !== 'undefined') {
            const element = document.getElementById(props.elementId);
            if (element) {
                element.scrollIntoView();
            }
        }
    }, [pathname, search]);

    return null;
}