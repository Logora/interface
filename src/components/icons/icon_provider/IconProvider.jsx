import React, { useState, useEffect, lazy } from 'react';
import { IconContext } from './IconContext';
import PropTypes from "prop-types";
const RegularIcons = lazy(() => import('@logora/debate.icons.regular_icons'));
const SpiegelIcons = lazy(() => import('@logora/debate.icons.spiegel_icons'));

export const IconProvider = ({ libraryName, children }) => {
    const [iconLibrary, setIconLibrary] = useState(null);

    useEffect(() => {
        if(libraryName === "regular") {
            setIconLibrary(RegularIcons);
        } else if(libraryName === "spiegel") {
            setIconLibrary(SpiegelIcons);
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