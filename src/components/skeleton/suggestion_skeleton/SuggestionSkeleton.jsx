import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./SuggestionSkeleton.module.scss";

export const SuggestionSkeleton = ({
	enableAnimation = true,
	numberOfSuggestions = 4,
	className,
}) => {
	return (
		<div data-testid={"suggestion-skeleton"} className={className}>
			<div className={styles.suggestionSkeleton}>
				<div className={styles.suggestionHeader}>
					<Skeleton
						enableAnimation={enableAnimation}
						className={styles.suggestionTitle}
					/>
					<Skeleton
						enableAnimation={enableAnimation}
						className={styles.suggestionDescription}
					/>
				</div>
				<div className={styles.inputBox}>
					<Skeleton
						enableAnimation={enableAnimation}
						className={styles.input}
					/>
				</div>
				<div className={styles.tabsRow}>
					<Skeleton enableAnimation={enableAnimation} className={styles.tab} />
					<Skeleton enableAnimation={enableAnimation} className={styles.tab} />
				</div>
				<div className={styles.suggestionList}>
					{Array.from({ length: numberOfSuggestions }).map((_, index) => (
						<div className={styles.suggestionItem} key={index}>
							<Skeleton
								enableAnimation={enableAnimation}
								className={styles.suggestionAuthor}
							/>
							<Skeleton
								enableAnimation={enableAnimation}
								className={styles.suggestionLine}
							/>
							<Skeleton
								enableAnimation={enableAnimation}
								className={styles.suggestionLineShort}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
