import React, { useState, useEffect } from 'react';
import { IconContext } from './IconContext';
import PropTypes from "prop-types";

export const IconProvider = ({ libraryName, children }) => {
    const [iconLibrary, setIconLibrary] = useState(null);

    useEffect(() => {
        if(libraryName) {
            (() => import(libraryName))().then((library) => {
                setIconLibrary(library);
            });
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