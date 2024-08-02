import React, { Suspense } from "react";
import { useAuth } from "@logora/debate.auth.use_auth";
import { useModal } from "@logora/debate.dialog.modal";
import { useVote } from "@logora/debate.vote.use_vote";
import { useIntl } from "react-intl";
import { Icon } from "@logora/debate.icons.icon";
import { ConfirmModal } from "@logora/debate.dialog.confirm_modal";
import { Button } from '@logora/debate.action.button';
import styles from "./SuggestionVoteBox.module.scss";
import PropTypes from "prop-types";

export const SuggestionVoteBox = ({ voteableType, voteableId, totalUpvote = 0, totalDownvote = 0, onVote, disabled = false }) => {
  const intl = useIntl();
  const { isLoggedIn } = useAuth();
  const { activeVote, voteSide, handleVote } = useVote(
    voteableType,
    voteableId,
    totalUpvote,
    totalDownvote,
    onVote
  );
  const { showModal } = useModal();

  const handleDownvote = () => {
    if (isLoggedIn) {
      showModal(
        <Suspense fallback={null}>
          <ConfirmModal
            title={intl.formatMessage({ id: "vote.suggestion_vote_box.downvote", defaultMessage: "Not relevant" })}
            question={intl.formatMessage({
              id: "vote.suggestion_vote_box.confirm_suggestion_downvote",
              defaultMessage: "Your vote should judge the quality of the question. Are you sure you want to continue ?"
            })}
            confirmLabel={intl.formatMessage({ id: "info.yes", defaultMessage: "Yes" })}
            cancelLabel={intl.formatMessage({ id: "info.no", defaultMessage: "No" })}
            onConfirmCallback={() => handleVote(false)}
          />
        </Suspense>
      );
    }
  };

  return (
    <div className={styles.voteButtonsContainer}>
      <Button
        className={styles.voteButton}
        onClick={disabled ? null : () => handleVote(true)}
        data-testid="upvote-button"
        disabled={disabled}
        rightIcon={activeVote && voteSide ? null : <Icon name="check" width={20} height={20} data-testid="upvote-icon" />}
        active={!(activeVote && voteSide)}
      >
        <span className={styles.text}>
          {intl.formatMessage({ id: "vote.suggestion_vote_box.upvote", defaultMessage: "I'm interested" })}
        </span>
      </Button>
      <Button
        className={styles.voteButton}
        onClick={disabled ? null : () => handleDownvote()}
        disabled={disabled}
        rightIcon={activeVote && !voteSide ? null : <Icon name="close" width={10} height={10} />}
        active={!(activeVote && !voteSide)}
      >
        <span className={styles.text}>
          {intl.formatMessage({ id: "vote.suggestion_vote_box.downvote", defaultMessage: "Not relevant" })}
        </span>
      </Button>
    </div>
  );
};

SuggestionVoteBox.propTypes = {
  /** The type of the vote */
  voteableType: PropTypes.string.isRequired,
  /** The id of the element */
  voteableId: PropTypes.number.isRequired,
  /** Total upvotes  */
  totalUpvote: PropTypes.number,
  /** Total downvotes */
  totalDownvote: PropTypes.number,
  /** Disable vote button */
  disabled: PropTypes.bool
};