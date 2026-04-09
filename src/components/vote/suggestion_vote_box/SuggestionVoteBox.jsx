import { Button } from "@logora/debate/action/button";
import { useAuth } from "@logora/debate/auth/use_auth";
import { ConfirmModal } from "@logora/debate/dialog/confirm_modal";
import { useModal } from "@logora/debate/dialog/modal";
import { Icon } from "@logora/debate/icons/icon";
import { useVote } from "@logora/debate/vote/use_vote";
import React, { Suspense } from "react";
import { useIntl } from "react-intl";
import styles from "./SuggestionVoteBox.module.scss";

export const SuggestionVoteBox = ({
	voteableType,
	voteableId,
	totalUpvote = 0,
	totalDownvote = 0,
	onVote,
	disabled = false,
}) => {
	const intl = useIntl();
	const { isLoggedIn } = useAuth();
	const { activeVote, voteSide, handleVote } = useVote(
		voteableType,
		voteableId,
		totalUpvote,
		totalDownvote,
		onVote,
	);
	const { showModal } = useModal();

	const handleDownvote = () => {
		if (isLoggedIn) {
			if (!(activeVote && !voteSide)) {
				showModal(
					<Suspense fallback={null}>
						<ConfirmModal
							title={intl.formatMessage({
								id: "vote.suggestion_vote_box.downvote",
								defaultMessage: "Not interested",
							})}
							question={intl.formatMessage({
								id: "vote.suggestion_vote_box.confirm_suggestion_downvote",
								defaultMessage:
									"Your vote should judge the quality of the question. Are you sure you want to continue ?",
							})}
							confirmLabel={intl.formatMessage({
								id: "info.yes",
								defaultMessage: "Yes",
							})}
							cancelLabel={intl.formatMessage({
								id: "info.no",
								defaultMessage: "No",
							})}
							onConfirmCallback={() => handleVote(false)}
						/>
					</Suspense>,
				);
			} else {
				handleVote(false);
			}
		}
	};

	return (
		<div className={styles.voteButtonsContainer}>
			<Button
				type="button"
				onClick={disabled ? null : () => handleVote(true)}
				data-testid="upvote-button"
				disabled={disabled}
				rightIcon={
					<Icon
						name="check"
						width={20}
						height={20}
						data-testid="upvote-icon"
						aria-hidden="true"
					/>
				}
				active={!(activeVote && voteSide)}
			>
				<span className={styles.text}>
					{intl.formatMessage({
						id: "vote.suggestion_vote_box.upvote",
						defaultMessage: "I'm interested",
					})}
				</span>
			</Button>
			<Button
				type="button"
				onClick={disabled ? null : () => handleDownvote()}
				disabled={disabled}
				rightIcon={
					<Icon name="close" width={10} height={10} aria-hidden="true" />
				}
				active={!(activeVote && !voteSide)}
			>
				<span className={styles.text}>
					{intl.formatMessage({
						id: "vote.suggestion_vote_box.downvote",
						defaultMessage: "Not interested",
					})}
				</span>
			</Button>
		</div>
	);
};
