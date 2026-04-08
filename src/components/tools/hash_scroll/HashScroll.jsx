import React, { useEffect } from "react";
import { useLocation } from "react-router";

export const HashScroll = ({ elementId, onScroll, children }) => {
    const location = useLocation();

	useEffect(() => {
		if (!elementId) return;

		if (typeof window !== "undefined") {
			let pageAnchor = location.hash.slice(1);
			const anchorRegex = new RegExp(elementId);
			if(pageAnchor.match(anchorRegex)) {
				const element = document.getElementById(elementId);
				if (element) {
					if(onScroll) {
						onScroll();
					}
					element.scrollIntoView({ behavior: "smooth" });
				}
			}
		}
	}, [location.hash])

	return <>{ children }</>;
}

