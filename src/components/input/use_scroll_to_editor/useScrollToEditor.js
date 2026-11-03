import { useCallback, useEffect, useRef } from "react";

export const useScrollToEditor = (targetRef) => {
	const frameRef = useRef(null);

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
			});
		});
	}, [targetRef]);

	useEffect(
		() => () => {
			window.cancelAnimationFrame(frameRef.current);
		},
		[],
	);

	return scrollToEditor;
};
