import React, { useEffect } from "react";
import { useLocation } from "react-router";

export const HashScroll = ({ elementId, onScroll, children }) => {
	const location = useLocation();

	useEffect(() => {
		if (!elementId) return;

		if (typeof window !== "undefined") {
			const source = location.pathname + location.hash.slice(1);
			const anchorRegex = new RegExp(elementId);
			if (source.match(anchorRegex)) {
				const element = document.getElementById(elementId);
				if (element) {
					onScroll?.();
					element.scrollIntoView({ behavior: "smooth" });
				}
			}
		}
	}, [location]);

	return <>{children}</>;
};
