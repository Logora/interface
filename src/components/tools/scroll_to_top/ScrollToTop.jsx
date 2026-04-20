import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

export const ScrollToTop = ({ elementId }) => {
	const { pathname, search, hash } = useLocation();
	const firstRender = useRef(true);

	useEffect(() => {
		if (typeof window !== "undefined") {
			if (!firstRender.current) {
				if (hash) return;
				const element = document.getElementById(elementId);
				if (element) {
					element.scrollIntoView({ behavior: "smooth" });
				}
			} else {
				firstRender.current = false;
			}
		}
	}, [pathname, search]);

	return null;
};
