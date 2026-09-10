import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./PageSkeleton.module.scss";

export const PageSkeleton = ({
	photo = "right",
	items = 3,
	tabs = false,
	enableAnimation = true,
	className,
}) => {
	const headerLines = (
		<div className={styles.headerLines}>
			<Skeleton enableAnimation={enableAnimation} className={styles.lineMain} />
			<Skeleton
				enableAnimation={enableAnimation}
				className={styles.lineSecondary}
			/>
		</div>
	);

	const photoBlock =
		photo === "left" ? (
			<Skeleton
				enableAnimation={enableAnimation}
				circle
				className={styles.photoCircle}
			/>
		) : (
			<Skeleton enableAnimation={enableAnimation} className={styles.photoBox} />
		);

	return (
		<div data-testid={"page-skeleton"} className={className}>
			<div className={styles.pageSkeleton}>
				<div className={styles.header}>
					{photo === "left" && photoBlock}
					{headerLines}
					{photo === "right" && photoBlock}
				</div>
				{tabs && (
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
				)}
				<div className={styles.contentList}>
					{Array.from({ length: items }).map((_, index) => (
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
	);
};
