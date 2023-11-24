import React, { useEffect, useState } from 'react';
import { ResponsiveContext } from './ResponsiveContext';
import PropTypes from 'prop-types';

export const ResponsiveProvider = ({ containerPath, containerWidth, children }) => {
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
        <ResponsiveContext.Provider value={{ isMobile: elementWidth <= 576, isTablet: elementWidth > 576, isDesktop: elementWidth >= 769 }}>
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
    children: PropTypes.node
}