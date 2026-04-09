import React, { useState, useEffect, createContext } from "react";

export const IconContext = createContext({ iconLibrary: {} });

export const IconProvider = ({ library, children }) => {
	return (
		<IconContext.Provider value={{ iconLibrary: library }}>
			{children}
		</IconContext.Provider>
	);
};
