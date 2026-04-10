import { Icon } from "@logora/debate/icons/icon";
import { Avatar } from "@logora/debate/user/avatar";
import cx from "classnames";
import React from "react";
import { FormattedMessage } from "react-intl";
import styles from "./ReplyFooter.module.scss";

export const ReplyFooter = ({
	numberReplies,
	repliesAuthors = [],
	onToggleReplies,
	expandReplies,
    isReply = false,
}) => {
	if (numberReplies <= 0) return null;

	return (
		<div className={styles.replyFooter} onClick={onToggleReplies}>
			{repliesAuthors.map((author, index) => (
				<span
					key={index}
					className={
						author.role === "editor"
							? styles.replyAvatarRing
							: styles.replyAvatarNormal
					}
				>
					<Avatar
						avatarUrl={author.image_url}
						userName={author.full_name}
						size={32}
						showTooltip
					/>
				</span>
			))}
			<div className={styles.expandRepliesContainer}>
				<button
					tabIndex="0"
					className={cx(styles.expandRepliesButton, {
						[styles.repliesExpanded]: expandReplies,
                        [styles.isReply]: isReply,
					})}
				>
					<FormattedMessage
						id={expandReplies ? "alt.hide_answers" : "alt.view_answers"}
						values={{ number_replies: numberReplies }}
						defaultMessage={expandReplies ? "Hide answers" : "View answers"}
					/>
					<Icon name="lightArrow" width={10} height={10} />
				</button>
			</div>
		</div>
	);
};
