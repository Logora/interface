import React, { useState, useEffect, lazy } from 'react';
import { IconContext } from './IconContext';
import PropTypes from "prop-types";

export const IconProvider = ({ libraryName, children }) => {
    const [iconLibrary, setIconLibrary] = useState(null);

    useEffect(async () => {
        if(libraryName === "regular") {
            const library = await lazy(() => import('@logora/debate.icons.regular_icons'));
            setIconLibrary(library);
        } else if(libraryName === "spiegel") {
            const library = await lazy(() => import('@logora/debate.icons.spiegelg_icons'));
            setIconLibrary(library);
        }
    }, [libraryName]);

    return (
        <IconContext.Provider value={{ iconLibrary }}>
            { children }
        </IconContext.Provider>
    );
}

IconProvider.propTypes = {
    /** Icon library name */
    libraryName: PropTypes.string,
    /** Provider children */
	children: PropTypes.node,
};