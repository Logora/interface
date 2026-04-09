export default {
	title: "Vote/Suggestion Vote Box",
	component: SuggestionVoteBox,
	args: {},
	argTypes: {},
};

import { faker } from "@faker-js/faker";
import { AuthContext } from "@logora/debate/auth/use_auth";
import { ConfigProvider } from "@logora/debate/data/config_provider";
import {
	DataProviderContext,
	dataProvider,
} from "@logora/debate/data/data_provider";
import { ModalProvider } from "@logora/debate/dialog/modal";
import { VoteProvider } from "@logora/debate/vote/vote_provider";
import React from "react";
import { IntlProvider } from "react-intl";
import { SuggestionVoteBox } from "./SuggestionVoteBox";

const vote = {
	id: faker.number.int(),
	voteable_type: faker.lorem.word(),
	voteable_id: faker.number.int(),
	user_id: faker.number.int(),
};

const httpClient = {
	get: () => null,
	post: (url, data, config) => {
		return new Promise((resolve, reject) => {
			resolve({ data: { success: true, data: { resource: vote } } });
		});
	},
	patch: () => null,
	delete: (url, data, config) => {
		return new Promise((resolve, reject) => {
			resolve({ data: { success: true, data: {} } });
		});
	},
};

const currentUser = {
	id: vote.user_id,
};

const data = dataProvider(httpClient, "https://mock.example.api");

export const DefaultSuggestionVoteBox = () => {
	return (
		<ConfigProvider config={{}}>
			<IntlProvider locale="en">
				<DataProviderContext.Provider value={{ dataProvider: data }}>
					<AuthContext.Provider
						value={{ currentUser: currentUser, isLoggedIn: true }}
					>
						<ModalProvider>
							<VoteProvider>
								<SuggestionVoteBox
									voteableType={vote.voteable_type}
									voteableId={vote.voteable_id}
									totalUpvote={10}
									totalDownvote={0}
								/>
							</VoteProvider>
						</ModalProvider>
					</AuthContext.Provider>
				</DataProviderContext.Provider>
			</IntlProvider>
		</ConfigProvider>
	);
};

export const DisabledSuggestinVoteBox = () => {
	return (
		<ConfigProvider config={{}}>
			<IntlProvider locale="en">
				<DataProviderContext.Provider value={{ dataProvider: data }}>
					<AuthContext.Provider
						value={{ currentUser: currentUser, isLoggedIn: true }}
					>
						<ModalProvider>
							<VoteProvider>
								<SuggestionVoteBox
									voteableType={vote.voteable_type}
									voteableId={vote.voteable_id}
									totalUpvote={10}
									totalDownvote={0}
									disabled={true}
								/>
							</VoteProvider>
						</ModalProvider>
					</AuthContext.Provider>
				</DataProviderContext.Provider>
			</IntlProvider>
		</ConfigProvider>
	);
};
