import React, { useEffect, useState } from 'react';
import { ResponsiveContext } from './ResponsiveContext';
import PropTypes from 'prop-types';

export const ResponsiveProvider = ({ containerPath, containerWidth, children, isMobile }) => {
    const [elementWidth, setElementWidth] = useState(containerWidth);

    useEffect(() => {
        if(!elementWidth && typeof window !== "undefined") {
            const element = document.querySelector(containerPath);
            if (element) {
                setElementWidth(element.getBoundingClientRect().width.toFixed(2));
            }
        }
    }, [elementWidth]);
    

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