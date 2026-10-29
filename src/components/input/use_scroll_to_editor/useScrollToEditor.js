import { useCallback, useEffect, useRef } from "react";

export const SCROLL_TO_EDITOR_MESSAGE = "logora:scroll-to-editor";

const VIEWPORT_SETTLE_DELAY = 1000;

const relayScrollToHostPage = (target) => {
	if (typeof window === "undefined" || !window.parent) {
		return;
	}
	if (window.self === window.top) {
		return;
	}
	const offset =
		target.getBoundingClientRect().top +
		(window.scrollY || window.pageYOffset || 0);
	window.parent.postMessage({ type: SCROLL_TO_EDITOR_MESSAGE, top: offset }, "*");
};

export const useScrollToEditor = (targetRef) => {
	const frameRef = useRef(null);
	const viewportTimerRef = useRef(null);

	const reScrollWhenViewportSettles = useCallback((target) => {
		const viewport =
			typeof window === "undefined" ? null : window.visualViewport;
		if (!viewport) {
			return;
		}
		const handleViewportResize = () => {
			target.scrollIntoView({ behavior: "smooth", block: "center" });
		};
		viewport.addEventListener("resize", handleViewportResize);
		clearTimeout(viewportTimerRef.current);
		viewportTimerRef.current = setTimeout(() => {
			viewport.removeEventListener("resize", handleViewportResize);
		}, VIEWPORT_SETTLE_DELAY);
	}, []);

	const scrollToEditor = useCallback(() => {
		if (
			typeof window === "undefined" ||
			typeof window.requestAnimationFrame !== "function"
		) {
			return;
		}
		window.cancelAnimationFrame(frameRef.current);
		frameRef.current = window.requestAnimationFrame(() => {
			frameRef.current = window.requestAnimationFrame(() => {
				const target = targetRef?.current;
				if (!target) {
					return;
				}
				target.scrollIntoView({ behavior: "smooth", block: "center" });
				relayScrollToHostPage(target);
				reScrollWhenViewportSettles(target);
			});
		});
	}, [targetRef, reScrollWhenViewportSettles]);

	useEffect(
		() => () => {
			window.cancelAnimationFrame(frameRef.current);
			clearTimeout(viewportTimerRef.current);
		},
		[],
	);

	return scrollToEditor;
};
