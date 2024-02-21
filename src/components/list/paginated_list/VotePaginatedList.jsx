import React from 'react';
import { VoteProvider, VoteContext } from '@logora/debate.vote.vote_provider';
import { PaginatedList } from '@logora/debate.list.paginated_list';

export const VotePaginatedList = (props) => {
	const loadVotes = (elements, context) => {
		if(props.onElementsLoad) {
			props.onElementsLoad(elements);
		}
		context.addVoteableIds(elements.map(e => e.id));
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