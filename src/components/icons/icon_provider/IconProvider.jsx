import React, { useState, useEffect , createContext} from 'react';
import PropTypes from "prop-types";

export const IconContext = createContext();

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
    library: PropTypes.any.isRequired,
    /** Provider children */
	children: PropTypes.node
};