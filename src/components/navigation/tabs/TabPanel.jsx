import React from "react";

export const TabPanel = ({ children, id, tabId, active }) => {
	return (
		<div
			role="tabpanel"
			id={id}
			aria-labelledby={tabId}
			tabIndex={0}
			hidden={!active}
		>
			{children}
		</div>
	);
};
