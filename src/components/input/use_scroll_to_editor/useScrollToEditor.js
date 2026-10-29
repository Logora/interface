import { useCallback, useEffect, useRef } from "react";

export const SCROLL_TO_EDITOR_MESSAGE = "logora:scroll-to-editor";

export const VIEWPORT_SETTLE_DELAY = 1000;

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
	const viewportHandlerRef = useRef(null);

	const detachViewportListener = useCallback(() => {
		clearTimeout(viewportTimerRef.current);
		if (viewportHandlerRef.current && typeof window !== "undefined") {
			window.visualViewport?.removeEventListener(
				"resize",
				viewportHandlerRef.current,
			);
		}
		viewportHandlerRef.current = null;
	}, []);

	const reScrollWhenViewportSettles = useCallback(
		(target) => {
			const viewport =
				typeof window === "undefined" ? null : window.visualViewport;
			if (!viewport) {
				return;
			}
			detachViewportListener();
			const handleViewportResize = () => {
				target.scrollIntoView({ behavior: "smooth", block: "center" });
			};
			viewportHandlerRef.current = handleViewportResize;
			viewport.addEventListener("resize", handleViewportResize);
			viewportTimerRef.current = setTimeout(
				detachViewportListener,
				VIEWPORT_SETTLE_DELAY,
			);
		},
		[detachViewportListener],
	);

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
			detachViewportListener();
		},
		[detachViewportListener],
	);

	return scrollToEditor;
};
