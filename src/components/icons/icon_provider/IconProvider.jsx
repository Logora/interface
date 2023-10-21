import React, { useState, useEffect } from 'react';
import { IconContext } from './IconContext';
import PropTypes from "prop-types";

export const IconProvider = ({ library = "regular", async = false, children }) => {
    const [iconLibrary, setIconLibrary] = useState(null);

    useEffect(() => {
        if(library) {
            if(async) {
                import(`@logora/debate.icons.${library}_icons`).then(library => {
                    setIconLibrary(library);
                });
            } else {
                setIconLibrary(library);
            }
        }
    }, [library]);

    return (
        <IconContext.Provider value={{ iconLibrary }}>
            { children }
        </IconContext.Provider>
    );
}

IconProvider.propTypes = {
    /** Library name if async or module */
    library: PropTypes.string,
    /** Whether to load the library asynchronously or not */
    async: PropTypes.bool,
    /** Provider children */
	children: PropTypes.node
};

IconProvider.defaultProps = {
    library: "regular",
    async: false
}