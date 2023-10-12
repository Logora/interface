import React, { useState, useEffect, lazy, Suspense } from 'react';
import { IconContext } from './IconContext';
import PropTypes from "prop-types";

export const IconProvider = ({ libraryName = "regular", children }) => {
    const [iconLibrary, setIconLibrary] = useState(null);

    useEffect(() => {
        if(libraryName === "regular") {
            const IconLibrary = lazy(() => import(`@logora/debate.icons.regular_icons`));
            setIconLibrary(IconLibrary);
        } else if(libraryName === "spiegel") {
            const IconLibrary = lazy(() => import(`@logora/debate.icons.spiegel_icons`));
            setIconLibrary(IconLibrary);
        }
    }, [libraryName]);

    return (
        <Suspense>
            <IconContext.Provider value={{ iconLibrary }}>
                { children }
            </IconContext.Provider>
        </Suspense>
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