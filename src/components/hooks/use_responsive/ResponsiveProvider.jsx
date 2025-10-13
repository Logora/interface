import React, { useEffect, useState } from 'react';
import { ResponsiveContext } from './ResponsiveContext';
import PropTypes from 'prop-types';
import { useDebouncedCallback } from 'use-debounce';

export const ResponsiveProvider = ({ containerPath, containerWidth, children, isMobile }) => {
    const [elementWidth, setElementWidth] = useState(containerWidth);

    const updateElementWidth = useDebouncedCallback(() => {
        if (typeof window !== "undefined" && containerPath) {
            const element = document.querySelector(containerPath);
            if (element) {
                setElementWidth(element.getBoundingClientRect().width.toFixed(2));
            }
        }
    }, 250);

    useEffect(() => {
        if (!elementWidth && typeof window !== "undefined" && containerPath) {
            const element = document.querySelector(containerPath);
            if (element) {
                setElementWidth(element.getBoundingClientRect().width.toFixed(2));
            }
        }
    }, [elementWidth, containerPath]);

    useEffect(() => {
        if (typeof window !== "undefined" && containerPath) {
            window.addEventListener('resize', updateElementWidth);
            return () => {
                window.removeEventListener('resize', updateElementWidth);
            };
        }
    }, [updateElementWidth, containerPath]);

    return (
        <ResponsiveContext.Provider value={{ elementWidth: elementWidth, isMobile: isMobile || elementWidth <= 576, isTablet: !isMobile && elementWidth > 576, isDesktop: !isMobile && elementWidth >= 769 }}>
            { children }
        </ResponsiveContext.Provider>
    )
}

ResponsiveProvider.propTypes = {
    /** Container path from which the width will be calculated */
    containerPath: PropTypes.string,
    /** Width of container to use for responsive queries */
    containerWidth: PropTypes.number,
    /** Provider children */
    children: PropTypes.node,
    /** Overriding calculation and force mobile design */
    isMobile: PropTypes.bool
}
