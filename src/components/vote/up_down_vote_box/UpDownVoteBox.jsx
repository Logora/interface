import { Icon } from "@logora/debate/icons/icon";
import { useVote } from "@logora/debate/vote/use_vote";
import cx from "classnames";
import React from "react";
import { useIntl } from "react-intl";
import styles from "./UpDownVoteBox.module.scss";

export const UpDownVoteBox = ({
	voteableType,
	voteableId,
	totalUpvote = 0,
	totalDownvote = 0,
	disabled = false,
}) => {
	const { totalUpvotes, totalDownvotes, activeVote, voteSide, handleVote } =
		useVote(voteableType, voteableId, totalUpvote, totalDownvote);
	const intl = useIntl();

	return (
		<div className={styles.container}>
			<div
				className={cx(styles.upvoteContainer, {
					[styles.disabled]: disabled,
					[styles.active]: activeVote && voteSide,
				})}
				onClick={disabled ? null : () => handleVote(true)}
				data-testid="upvote-button"
			>
				<Icon
					name="upvote"
					width={27}
					height={25}
					aria-label={intl.formatMessage({
						id: "vote.up_down_vote_box.supporters",
						defaultMessage: "supporters",
					})}
				/>
				<div className={styles.voteText}>{totalUpvotes}</div>
			</div>
			<div
				className={cx(styles.downvoteContainer, {
					[styles.disabled]: disabled,
					[styles.active]: activeVote && !voteSide,
				})}
				onClick={disabled ? null : () => handleVote(false)}
				data-testid="downvote-button"
			>
				<Icon
					name="downvote"
					width={27}
					height={25}
					aria-label={intl.formatMessage({
						id: "vote.up_down_vote_box.opponents",
						defaultMessage: "opponents",
					})}
				/>
				<div className={styles.voteText}>{totalDownvotes}</div>
			</div>
		</div>
	);
};
