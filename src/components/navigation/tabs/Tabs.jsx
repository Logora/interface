import React, { useId, useRef, useState, useCallback, useEffect } from "react";
import { Icon } from "@logora/debate/icons/icon";
import styles from "./Tabs.module.scss";

export const Tabs = ({ value, onChange, children, label }) => {
	const uid = useId();
	const tabRefs = useRef([]);
	const containerRef = useRef(null);
	const count = React.Children.count(children);
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(false);

	const checkScroll = useCallback(() => {
		const el = containerRef.current;
		if (!el) return;
		setCanScrollLeft(el.scrollLeft > 1);
		setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
	}, []);

	useEffect(() => {
		checkScroll();
		const el = containerRef.current;
		if (!el) return;
		const observer = new ResizeObserver(checkScroll);
		observer.observe(el);
		return () => observer.disconnect();
	}, [children, checkScroll]);

	const scrollToTab = (direction, e) => {
		e.stopPropagation();
		const container = containerRef.current;
		if (!container) return;
		const tabs = Array.from(container.children);
		const activeIndex = value;

		if (direction === "left") {
			if (activeIndex <= 0) return;
			const targetIndex = activeIndex - 1;
			tabs[targetIndex]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
			onChange(e, targetIndex);
		} else {
			if (activeIndex >= tabs.length - 1) return;
			const targetIndex = activeIndex + 1;
			tabs[targetIndex]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
			onChange(e, targetIndex);
		}
		setTimeout(checkScroll, 300);
	};

	const handleKeyDown = (e, index) => {
		let next;
		if (e.key === "ArrowRight") next = (index + 1) % count;
		else if (e.key === "ArrowLeft") next = (index - 1 + count) % count;
		else if (e.key === "Home") next = 0;
		else if (e.key === "End") next = count - 1;
		else return;
		e.preventDefault();
		onChange(e, next);
		tabRefs.current[next]?.focus();
	};

	return (
		<div className={styles.tabsWrapper}>
			<button
				type="button"
				className={`${styles.arrow} ${styles.arrowLeft} ${!canScrollLeft ? styles.arrowHidden : ""}`}
				onClick={(e) => scrollToTab("left", e)}
				aria-label="Onglet précédent"
				tabIndex={canScrollLeft ? 0 : -1}
			>
				<Icon name="lightArrow" height={24} width={24} />
			</button>
			<ul
				ref={containerRef}
				role="tablist"
				aria-label={label}
				className={styles.navTabs}
				onScroll={checkScroll}
			>
				{React.Children.map(children, (child, index) =>
					React.cloneElement(child, {
						active: value === index,
						id: `${uid}-tab-${index}`,
						panelId: `${uid}-panel-${index}`,
						onClick: (e) => onChange(e, index),
						onKeyDown: (e) => handleKeyDown(e, index),
						ref: (el) => { tabRefs.current[index] = el; },
					})
				)}
			</ul>
			<button
				type="button"
				className={`${styles.arrow} ${styles.arrowRight} ${!canScrollRight ? styles.arrowHidden : ""}`}
				onClick={(e) => scrollToTab("right", e)}
				aria-label="Onglet suivant"
				tabIndex={canScrollRight ? 0 : -1}
			>
				<Icon name="lightArrow" height={24} width={24} />
			</button>
		</div>
	);
};
