import { useModal } from "@logora/debate/dialog/modal";
import { useCallback, useEffect, useRef } from "react";

export const useScrollToEditor = (targetRef) => {
	const { isModalPresent = false } = useModal() || {};
	const frameRef = useRef(null);
	const pendingScrollRef = useRef(false);
	const isModalPresentRef = useRef(isModalPresent);

	const scrollIntoView = useCallback(() => {
		window.cancelAnimationFrame(frameRef.current);
		frameRef.current = window.requestAnimationFrame(() => {
			frameRef.current = window.requestAnimationFrame(() => {
				if (isModalPresentRef.current) {
					return;
				}
				const target = targetRef?.current;
				if (!target) {
					return;
				}
				pendingScrollRef.current = false;
				target.scrollIntoView({ behavior: "smooth", block: "center" });
			});
		});
	}, [targetRef]);

	const scrollToEditor = useCallback(() => {
		pendingScrollRef.current = true;
		if (isModalPresentRef.current) {
			return;
		}
		scrollIntoView();
	}, [scrollIntoView]);

	useEffect(() => {
		isModalPresentRef.current = isModalPresent;
		if (isModalPresent || !pendingScrollRef.current) {
			return;
		}
		scrollIntoView();
	}, [isModalPresent, scrollIntoView]);

	useEffect(
		() => () => {
			window.cancelAnimationFrame(frameRef.current);
		},
		[],
	);

	return scrollToEditor;
};
