import React, { useState, useEffect } from 'react';
import { IconContext } from './IconContext';
import PropTypes from "prop-types";

export const IconProvider = ({ library, children }) => {
    const [iconLibrary, setIconLibrary] = useState(null);

    useEffect(() => {
        setIconLibrary(library);
    }, [library]);

    return (
        <IconContext.Provider value={{ iconLibrary }}>
            { children }
        </IconContext.Provider>
    );
}

IconProvider.propTypes = {
    /** Library name if async or module */
    library: PropTypes.string.isRequired,
    /** Whether to load the library asynchronously or not */
    async: PropTypes.bool,
    /** Provider children */
	children: PropTypes.node
};