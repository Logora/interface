import { useState, useEffect, useContext } from "react";
import { useAuth } from "@logora/debate.auth.use_auth";
import { useDataProvider } from "@logora/debate.data.data_provider";
import { useAuthRequired } from '@logora/debate.hooks.use_auth_required';
import { VoteContext } from "@logora/debate.vote.vote_provider";
import PropTypes from "prop-types";

export const useVote = (
  voteableType,
  voteableId,
  upvotes,
  downvotes,
  onVote = null
) => {
  const { votes } = useContext(VoteContext);
  const { isLoggedIn } = useAuth();
  const api = useDataProvider();

  const [activeVote, setActiveVote] = useState(false);
  const [voteSide, setVoteSide] = useState(true);
  const [voteId, setVoteId] = useState();
  const [totalUpvotes, setTotalUpvotes] = useState(upvotes);
  const [totalDownvotes, setTotalDownvotes] = useState(downvotes);
  const [voteDisabled, setVoteDisabled] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const requireAuthentication = useAuthRequired();

  useEffect(() => {
    if (!hasVoted && isLoggedIn) {
      if (Object.keys(votes).length > 0 && voteableId in votes) {
        const initVote = votes[voteableId];
        setHasVoted(true);
        setActiveVote(Boolean(initVote));
        setVoteSide(initVote && initVote.is_upvote);
        setVoteId(initVote && initVote.id);
      }
    }
  }, [votes, isLoggedIn]);

  const activateVote = (isUpvote) => {
    setActiveVote(true);
    setVoteSide(isUpvote);
    if (isUpvote && onVote) {
      onVote(true);
    }
    if (isUpvote) {
      setTotalUpvotes((prevState) => prevState + 1)
    } else {
      setTotalDownvotes((prevState) => prevState + 1)
    }
  };

  const deactivateVote = (isUpvote) => {
    setActiveVote(false);
    if (isUpvote && onVote) {
      onVote(false);
    }
    if (isUpvote) {
      setTotalUpvotes((prevState) => prevState - 1)
    } else {
      setTotalDownvotes((prevState) => prevState - 1)
    }
  };

  const voteAction = (isUpvote) => {
    if (activeVote) {
      if (voteSide == isUpvote) {
        deactivateVote(isUpvote);
        setVoteDisabled(true);
        api.delete("votes", voteId).then(
          (response) => {
            if (response.data?.success) {
              setVoteId(null);
            } else {
              activateVote(isUpvote);
            }
            setVoteDisabled(false);
          },
          (error) => {
            activateVote(isUpvote);
            setVoteDisabled(false);
          }
        );
      } else {
        deactivateVote(voteSide);
        activateVote(isUpvote);
        const data = {
          is_upvote: isUpvote,
        };
        setVoteDisabled(true);
        api.update("votes", voteId, data).then(
          (response) => {
            if (!response.data?.success) {
              deactivateVote(isUpvote);
              activateVote(!isUpvote);
            }
            setVoteDisabled(false);
          },
          (error) => {
            deactivateVote(isUpvote);
            activateVote(!isUpvote);
            setVoteDisabled(false);
          }
        );
      }
    } else {
      const data = {
        voteable_id: voteableId,
        voteable_type: voteableType,
        is_upvote: isUpvote,
      };
      activateVote(isUpvote);
      setVoteDisabled(true);
      api.create("votes", data).then(
        (response) => {
          if (response.data?.success) {
            setVoteId(response.data.data.resource.id);
          } else {
            deactivateVote(isUpvote);
          }
          setVoteDisabled(false);
        },
        (error) => {
          deactivateVote(isUpvote);
          setVoteDisabled(false);
        }
      );
    }
  };

  const handleVote = (isUpvote) => {
    if (!voteDisabled) {
      if (isLoggedIn) {
        voteAction(isUpvote);
      } else {
        requireAuthentication({ loginAction: "vote" });
      }
    }
  };

  return {
    totalUpvotes,
    totalDownvotes,
    activeVote,
    voteSide,
    handleVote,
  };
};

useVote.propTypes = {
  /** Type of the voteable element (e.g., "article", "comment", etc.) */
  voteableType: PropTypes.string.isRequired,
  /** ID of the voteable element */
  voteableId: PropTypes.string.isRequired,
  /**  Initial number of upvotes */
  upvotes: PropTypes.number.isRequired,
  /**  Initial number of downvotes */
  downvotes: PropTypes.number.isRequired,
  /**  Callback called when a vote is made (optional) */
  onVote: PropTypes.func,
};
