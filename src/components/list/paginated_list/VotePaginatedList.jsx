import React from 'react';
import { VoteProvider, VoteContext } from '@logora/debate.vote.vote_provider';
import { PaginatedList } from './PaginatedList';

export const VotePaginatedList = (props) => {
	const loadVotes = (elements, context) => {
		console.log("ELEMENTS", elements)
		if(props.onElementsLoad) {
			props.onElementsLoad(elements);
		}
		const voteableIds = props.voteableType === "DebateSuggestion" 
			? elements.map(e => e.debate_suggestion.id) 
			: elements.map(e => e.id);
		context.addVoteableIds(voteableIds);
	}

    return (
		<VoteProvider voteableType={props.voteableType}>
			<VoteContext.Consumer>
				{ context => 
					<PaginatedList 
						{ ...props }
						{ ...context }
						onElementsLoad={(elements) => loadVotes(elements, context)}
					/>
				}
			</VoteContext.Consumer>
		</VoteProvider>
    )
};
