import React, { useEffect } from "react";
import PropTypes from 'prop-types';
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

HashScroll.propTypes = {
	/** ID of the element to scroll to */
	elementId: PropTypes.string,
	/** Callback when element is scrolled to */
	onScroll: PropTypes.func,
	/** Children to render */
	children: PropTypes.node
};