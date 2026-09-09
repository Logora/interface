import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./ConsultationSkeleton.module.scss";

export const ConsultationSkeleton = ({
	enableAnimation = true,
	numberOfProposals = 4,
	className,
}) => {
	return (
		<div data-testid={"consultation-skeleton"} className={className}>
			<div className={styles.consultationSkeleton}>
				<div className={styles.consultationHeader}>
					<Skeleton
						enableAnimation={enableAnimation}
						className={styles.consultationTitle}
					/>
					<Skeleton
						enableAnimation={enableAnimation}
						className={styles.consultationDescription}
					/>
				</div>
				<div className={styles.tabsRow}>
					<Skeleton
						enableAnimation={enableAnimation}
						className={styles.tab}
					/>
					<Skeleton
						enableAnimation={enableAnimation}
						className={styles.tab}
					/>
					<Skeleton
						enableAnimation={enableAnimation}
						className={styles.tab}
					/>
				</div>
				<div className={styles.proposalList}>
					{Array.from({ length: numberOfProposals }).map((_, index) => (
						<div className={styles.proposalItem} key={index}>
							<Skeleton
								enableAnimation={enableAnimation}
								className={styles.proposalAuthor}
							/>
							<Skeleton
								enableAnimation={enableAnimation}
								className={styles.proposalLine}
							/>
							<Skeleton
								enableAnimation={enableAnimation}
								className={styles.proposalLineShort}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
