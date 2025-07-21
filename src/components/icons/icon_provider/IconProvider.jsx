import React, { useState, useEffect , createContext} from 'react';
import PropTypes from "prop-types";

export const IconContext = createContext({ iconLibrary: {} });

export const IconProvider = ({ library, children }) => {
    return (
        <IconContext.Provider value={{ iconLibrary: library }}>
            {children}
        </IconContext.Provider>
    );
}

IconProvider.propTypes = {
    /** Library name if async or module */
    library: PropTypes.any.isRequired,
    /** Provider children */
	children: PropTypes.node
};