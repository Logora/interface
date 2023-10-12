import React, { useState, useEffect } from 'react';
import { IconContext } from './IconContext';
import PropTypes from "prop-types";

export const IconProvider = ({ libraryName = "regular", children }) => {
    const [iconLibrary, setIconLibrary] = useState(null);

    useEffect(() => {
        (() => import("@logora/debate.icons.regular_icons"))().then((library) => {
            setIconLibrary(library);
        });
    }, [libraryName]);

    return (
        <IconContext.Provider value={{ iconLibrary }}>
            { children }
        </IconContext.Provider>
    );
}

IconProvider.propTypes = {
    /** Icon library name */
    libraryName: PropTypes.string.isRequired,
    /** Provider children */
	children: PropTypes.node,
};

IconProvider.defaultProps = {
    libraryName: "regular"
}