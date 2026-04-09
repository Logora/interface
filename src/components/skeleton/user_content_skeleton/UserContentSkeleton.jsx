import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import cx from "classnames";
import styles from "./UserContentSkeleton.module.scss";

export const UserContentSkeleton = ({
	enableAnimation = true,
	numberLines = 4,
	border = false,
	tag,
	tagClassName,
	children,
}) => {
	return (
		<SkeletonTheme
			baseColor="var(--background-color-secondary)"
			highlightColor="var(--darkest-text-tertiary)"
		>
			<div
				data-testid={"user-content-skeleton"}
				className={cx(styles.skeletonContainer, { [styles.border]: border })}
			>
				<div className={styles.skeletonHeader}>
					<Skeleton
						enableAnimation={enableAnimation}
						circle={true}
						height={60}
						width={60}
					/>
					<div className={styles.skeletonHeaderLines}>
						<Skeleton enableAnimation={enableAnimation} />
						<Skeleton enableAnimation={enableAnimation} />
					</div>
					{tag && (
						<div className={styles.tagContainer}>
							<div className={cx(styles.tagBox, tagClassName)}>
								<div className={styles.tag}>{tag}</div>
							</div>
						</div>
					)}
				</div>
				{numberLines > 0 && (
					<div data-testid={"skeleton-body"} className={styles.skeletonBody}>
						<Skeleton enableAnimation={enableAnimation} count={numberLines} />
					</div>
				)}
				{children && <div className={styles.childrenLayer}>{children}</div>}
			</div>
		</SkeletonTheme>
	);
};
