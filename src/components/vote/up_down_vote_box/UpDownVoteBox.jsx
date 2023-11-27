import React from "react";
import { useVote } from "@logora/debate.vote.use_vote";
import { FormattedMessage } from "react-intl";
import { Icon } from "@logora/debate.icons.icon";
import cx from "classnames";
import styles from "./UpDownVoteBox.module.scss";
import PropTypes from "prop-types";

export const UpDownVoteBox = ({ voteableType, voteableId, totalUpvote = 0, totalDownvote = 0, disabled = false }) => {
  const { totalUpvotes, totalDownvotes, activeVote, voteSide, handleVote } =
    useVote(
      voteableType,
      voteableId,
      totalUpvote,
      totalDownvote
    );

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
                <Icon name="upvote" width={27} height={25} />
                <div className={styles.voteText}>
                    <FormattedMessage 
                        id={"vote.up_down_vote_box.supporters"}
                        values={{ count: totalUpvotes }}
                        defaultMessage={"{count} supporters"}
                    />
                </div>
            </div>
            <div
                className={cx(styles.downvoteContainer, {
                    [styles.disabled]: disabled,
                    [styles.active]: activeVote && !voteSide,
                })}
                onClick={disabled ? null : () => handleVote(false)}
                data-testid="downvote-button"
            >
                <Icon name="downvote" width={27} height={25} />
                <div className={styles.voteText}>
                    <FormattedMessage 
                        id={"vote.up_down_vote_box.opponents"}
                        values={{ count: totalDownvotes }}
                        defaultMessage={"{count} opponents"}
                    />
                </div>
            </div>
        </div>
    );
};

UpDownVoteBox.propTypes = {
    /** The type of the vote */
    voteableType: PropTypes.string.isRequired,
    /** The id of the element */
    voteableId: PropTypes.number.isRequired,
    /** Total upvotes  */
    totalUpvote: PropTypes.number,
    /** Total downvotes */
    totalDownvote: PropTypes.number,
    /** Button custom class name when active */
    activeClassName: PropTypes.string,
    /** Disable vote button */
    disabled: PropTypes.bool
};

UpDownVoteBox.defaultProps = {
    disabled: false,
    totalUpvote: 0,
    totalDownvote: 0
}