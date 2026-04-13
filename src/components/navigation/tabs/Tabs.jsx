import React, { useId, useRef } from "react";
import styles from "./Tabs.module.scss";

export const Tabs = ({ value, onChange, children, label }) => {
	const uid = useId();
	const tabRefs = useRef([]);
	const count = React.Children.count(children);

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
		<ul role="tablist" aria-label={label} className={styles.navTabs}>
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
	);
};
