import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./CommentsSkeleton.module.scss";

export const CommentsSkeleton = ({
	enableAnimation = true,
	numberOfComments = 3,
	className,
}) => {
	return (
		<div data-testid={"comments-skeleton"} className={className}>
			<div className={styles.commentsSkeleton}>
				<div className={styles.commentsHeader}>
					<Skeleton
						enableAnimation={enableAnimation}
						className={styles.commentsTitle}
					/>
					<Skeleton
						enableAnimation={enableAnimation}
						className={styles.commentsDescription}
					/>
				</div>
				<div className={styles.commentList}>
					{Array.from({ length: numberOfComments }).map((_, index) => (
						<div className={styles.commentItem} key={index}>
							<div className={styles.commentHeader}>
								<Skeleton
									enableAnimation={enableAnimation}
									circle
									className={styles.commentAvatar}
								/>
								<div className={styles.commentAuthorLines}>
									<Skeleton
										enableAnimation={enableAnimation}
										className={styles.commentAuthorLine}
									/>
									<Skeleton
										enableAnimation={enableAnimation}
										className={styles.commentAuthorSubline}
									/>
								</div>
							</div>
							<div className={styles.commentBody}>
								<Skeleton
									enableAnimation={enableAnimation}
									className={styles.commentLine}
								/>
								<Skeleton
									enableAnimation={enableAnimation}
									className={styles.commentLineShort}
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
