import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./UserPageSkeleton.module.scss";

export const UserPageSkeleton = ({
	enableAnimation = true,
	numberOfContentItems = 3,
	className,
}) => {
	return (
		<SkeletonTheme
			baseColor="var(--background-color-secondary)"
			highlightColor="var(--darkest-text-tertiary)"
		>
			<div data-testid={"user-page-skeleton"} className={className}>
				<div className={styles.userPageSkeleton}>
					<div className={styles.userHeader}>
						<Skeleton
							enableAnimation={enableAnimation}
							circle
							className={styles.userAvatar}
						/>
						<div className={styles.userHeaderLines}>
							<Skeleton
								enableAnimation={enableAnimation}
								className={styles.userName}
							/>
							<Skeleton
								enableAnimation={enableAnimation}
								className={styles.userDescription}
							/>
						</div>
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
					<div className={styles.contentList}>
						{Array.from({ length: numberOfContentItems }).map((_, index) => (
							<div className={styles.contentItem} key={index}>
								<Skeleton
									enableAnimation={enableAnimation}
									className={styles.contentLine}
								/>
								<Skeleton
									enableAnimation={enableAnimation}
									className={styles.contentLineShort}
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</SkeletonTheme>
	);
};
