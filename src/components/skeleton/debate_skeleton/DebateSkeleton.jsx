import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./DebateSkeleton.module.scss";

export const DebateSkeleton = ({ enableAnimation = true, className }) => {
	return (
		<SkeletonTheme
			baseColor="var(--background-color-secondary)"
			highlightColor="var(--darkest-text-tertiary)"
		>
			<div data-testid={"debate-skeleton"} className={className}>
				<div className={styles.debateSkeleton}>
					<div className={styles.debateImageBox}>
						<Skeleton
							enableAnimation={enableAnimation}
							className={styles.debateImage}
						/>
					</div>
					<div className={styles.debateHeader}>
						<Skeleton
							enableAnimation={enableAnimation}
							className={styles.debateTitle}
						/>
						<Skeleton
							enableAnimation={enableAnimation}
							className={styles.debateSubtitle}
						/>
					</div>
					<div className={styles.debateContent}>
						<div className={styles.debateMainColumn}>
							<div className={styles.argumentBlock}>
								<Skeleton
									enableAnimation={enableAnimation}
									className={styles.argumentLine}
								/>
								<Skeleton
									enableAnimation={enableAnimation}
									className={styles.argumentLine}
								/>
								<Skeleton
									enableAnimation={enableAnimation}
									className={styles.argumentLineShort}
								/>
							</div>
							<div className={styles.argumentBlock}>
								<Skeleton
									enableAnimation={enableAnimation}
									className={styles.argumentLine}
								/>
								<Skeleton
									enableAnimation={enableAnimation}
									className={styles.argumentLine}
								/>
								<Skeleton
									enableAnimation={enableAnimation}
									className={styles.argumentLineShort}
								/>
							</div>
						</div>
						<div className={styles.debateSideColumn}>
							<Skeleton
								enableAnimation={enableAnimation}
								className={styles.sideBox}
							/>
						</div>
					</div>
				</div>
			</div>
		</SkeletonTheme>
	);
};
