import React, { useState, useEffect } from 'react';
import { IconContext } from './IconContext';

export const IconProvider = ({ libraryName, children }) => {
    const [iconLibrary, setIconLibrary] = useState(null);

    const importIconLibrary = async () => {
        return import(`@logora/debate.icons.${libraryName}_icons`);
    };

    useEffect(() => {
        const loadIconLibrary = async () => {
            try {
                const iconLibraryModule = await importIconLibrary();
                setIconLibrary(iconLibraryModule);
            } catch(e) {
                setIconLibrary(null);
            }
        };

        loadIconLibrary();
    }, [libraryName]);

    return (
        <IconContext.Provider value={{ iconLibrary }}>
            {children}
        </IconContext.Provider>
    );
}