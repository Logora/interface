import { Icon } from "@logora/debate/icons/icon";
import { useVote } from "@logora/debate/vote/use_vote";
import cx from "classnames";
import React from "react";
import { useIntl } from "react-intl";
import styles from "./VoteButton.module.scss";

export const VoteButton = ({
	voteableType,
	voteableId,
	totalUpvote = 0,
	totalDownvote = 0,
	activeClassName,
	disabled = false,
}) => {
	const { totalUpvotes, activeVote, handleVote } = useVote(
		voteableType,
		voteableId,
		totalUpvote,
		totalDownvote,
	);
	const intl = useIntl();

	return (
		<button
			type="button"
			className={cx(styles.voteButton, {
				[styles.active]: activeVote,
				[activeClassName]: activeVote,
				[styles.disabled]: disabled,
			})}
			onClick={disabled ? null : () => handleVote(true)}
			data-testid="vote-button"
			data-tid="action_vote_argument"
			aria-pressed={activeVote}
			aria-label={intl.formatMessage({
				id: "vote.vote_button.aria_label",
				defaultMessage: "Like argument",
			})}
		>
			<Icon
				name="clap"
				aria-hidden="true"
				data-tid={"action_vote_argument"}
				height={18}
				width={18}
			/>
			<span className={styles.voteNumber}>{totalUpvotes}</span>
		</button>
	);
};
