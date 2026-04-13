import React, { forwardRef } from "react";
import cx from "classnames";
import styles from "./Tabs.module.scss";

export const Tab = forwardRef(({ label, active, id, panelId, onClick, onKeyDown }, ref) => {
	return (
		<li className={styles.navItem} role="presentation">
			<div
				ref={ref}
				id={id}
				role="tab"
				aria-selected={active}
				aria-controls={panelId}
				tabIndex={active ? 0 : -1}
				className={cx(styles.navLink, { [styles.active]: active })}
				onClick={onClick}
				onKeyDown={onKeyDown}
			>
				{label}
			</div>
		</li>
	);
});

Tab.displayName = "Tab";
