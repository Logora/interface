import React from "react";
import styles from "./SummaryBox.module.scss";

export const SummaryBox = ({
	summaryItems = [],
	tagClassName,
	tag,
	emptySummaryText = "",
}) => {
	return (
		<div className={styles.box}>
			<div className={`${styles.stats} ${tag ? styles.withTag : ""}`}>
				{tag && <div className={`${styles.tag} ${tagClassName}`}>{tag}</div>}
			</div>
			{summaryItems.length === 0 ? (
				<span className={styles.emptySummaryText}>{emptySummaryText}</span>
			) : (
				summaryItems.map((item, index) => (
					<li key={index} className={styles.summaryItem}>
						{item && <span>•</span>}
						{item}
					</li>
				))
			)}
		</div>
	);
};
