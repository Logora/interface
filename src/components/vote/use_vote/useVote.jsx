import { useAuth } from "@logora/debate/auth/use_auth";
import { useDataProvider } from "@logora/debate/data/data_provider";
import { useAuthRequired } from "@logora/debate/hooks/use_auth_required";
import { VoteContext } from "@logora/debate/vote/vote_provider";
import { useContext, useEffect, useRef, useState } from "react";

export const useVote = (
	voteableType,
	voteableId,
	upvotes,
	downvotes,
	onVote = null,
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
	// Synchronous lock against the `setState` delay: a second click during an
	// in-flight vote request is ignored instead of issuing a duplicate request.
	const voteRequestInProgress = useRef(false);
	const requireAuthentication = useAuthRequired();

	useEffect(() => {
		if (!hasVoted && isLoggedIn) {
			if (Object.keys(votes).length > 0 && voteableId in votes) {
				const initVote = votes[voteableId];
				setHasVoted(true);
				setActiveVote(Boolean(initVote));
				setVoteSide(initVote?.is_upvote);
				setVoteId(initVote?.id);
			}
		}
	}, [votes, isLoggedIn]);

	const activateVote = (isUpvote) => {
		setActiveVote(true);
		setVoteSide(isUpvote);

		const newTotalUpvotes = isUpvote ? totalUpvotes + 1 : totalUpvotes;
		const newTotalDownvotes = isUpvote ? totalDownvotes : totalDownvotes + 1;
		onVote?.(isUpvote, true, newTotalUpvotes, newTotalDownvotes);

		if (isUpvote) {
			setTotalUpvotes((prevState) => prevState + 1);
		} else {
			setTotalDownvotes((prevState) => prevState + 1);
		}
	};

	const deactivateVote = (isUpvote) => {
		setActiveVote(false);

		const newTotalUpvotes = isUpvote ? totalUpvotes - 1 : totalUpvotes;
		const newTotalDownvotes = isUpvote ? totalDownvotes : totalDownvotes - 1;
		onVote?.(isUpvote, false, newTotalUpvotes, newTotalDownvotes);

		if (isUpvote) {
			setTotalUpvotes((prevState) => prevState - 1);
		} else {
			setTotalDownvotes((prevState) => prevState - 1);
		}
	};

	const voteAction = (isUpvote) => {
		const releaseVoteLock = () => {
			voteRequestInProgress.current = false;
			setVoteDisabled(false);
		};
		voteRequestInProgress.current = true;
		setHasVoted(true);
		if (activeVote) {
			if (voteSide === isUpvote) {
				deactivateVote(isUpvote);
				setVoteDisabled(true);
				api.delete("votes", voteId).then(
					(response) => {
						if (response.data?.success) {
							setVoteId(null);
						} else {
							activateVote(isUpvote);
						}
						releaseVoteLock();
					},
					(error) => {
						activateVote(isUpvote);
						releaseVoteLock();
					},
				);
			} else {
				deactivateVote(!isUpvote);
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
						releaseVoteLock();
					},
					(error) => {
						deactivateVote(isUpvote);
						activateVote(!isUpvote);
						releaseVoteLock();
					},
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
					releaseVoteLock();
				},
				(error) => {
					deactivateVote(isUpvote);
					releaseVoteLock();
				},
			);
		}
	};

	const handleVote = (isUpvote) => {
		if (!voteDisabled && !voteRequestInProgress.current) {
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
