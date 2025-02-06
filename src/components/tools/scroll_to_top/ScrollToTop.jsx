import { useEffect } from 'react';
import { useLocation } from 'react-router';

export const ScrollToTop = ({ elementId }) => {
    const { pathname, search } = useLocation();

    useEffect(() => {
        if(typeof window !== 'undefined') {
            const element = document.getElementById(elementId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [pathname, search]);

    return null;
}