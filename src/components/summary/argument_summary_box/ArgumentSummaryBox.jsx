import cx from "classnames";
import React from "react";
import styles from "./ArgumentSummaryBox.module.scss";

export const ArgumentSummaryBox = ({ label, text, gauge, color, tag }) => {
	return (
		<div className={styles.box}>
			<div className={styles.stats}>
				<div className={styles.informationsContainer}>
					<div className={styles.label}>{label}</div>
					<div className={styles.gauge} style={{ borderColor: color }}>
						<div
							className={cx(styles.bar, styles.barFirst)}
							style={{
								backgroundColor: gauge >= 1 ? color : "white",
								borderColor: gauge >= 1 ? "white" : color,
							}}
						/>
						<div
							className={cx(styles.bar)}
							style={{
								backgroundColor: gauge >= 2 ? color : "white",
								borderColor: gauge >= 2 ? "white" : color,
							}}
						/>
						<div
							className={cx(styles.bar)}
							style={{
								backgroundColor: gauge >= 3 ? color : "white",
								borderColor: gauge >= 3 ? "white" : color,
							}}
						/>
						<div
							className={cx(styles.bar)}
							style={{
								backgroundColor: gauge >= 4 ? color : "white",
								borderColor: gauge >= 4 ? "white" : color,
							}}
						/>
						<div
							className={cx(styles.bar, styles.barLast)}
							style={{ backgroundColor: gauge === 5 ? color : "white" }}
						/>
					</div>
				</div>
				<div className={styles.tag} style={{ backgroundColor: color }}>
					{tag}
				</div>
			</div>
			{text}
		</div>
	);
};
