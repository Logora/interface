import React from "react";
import styles from "./PointBox.module.scss";

export const PointBox = ({ icon, text, timeAgo }) => {
	return (
		<div className={styles.container}>
			<div className={styles.icon}>{icon}</div>
			<div className={styles.text}>
				{text}
				{timeAgo && <div className={styles.timeAgo}>{timeAgo}</div>}
			</div>
		</div>
	);
};
