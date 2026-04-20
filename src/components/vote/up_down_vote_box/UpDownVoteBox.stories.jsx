export default {
	title: "Vote/Up Down Vote Box",
	component: UpDownVoteBox,
	args: {
		voteableType: "argument",
		voteableId: 1,
		totalUpvote: 10,
		totalDownvote: 5,
		disabled: false,
		hideDownvotes: false,
	},
	argTypes: {
		voteableType: {
			control: "text",
		},
		voteableId: {
			control: "number",
		},
		totalUpvote: {
			control: "number",
		},
		totalDownvote: {
			control: "number",
		},
		disabled: {
			control: "boolean",
		},
		hideDownvotes: {
			control: "boolean",
		},
	},
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
import { UpDownVoteBox } from "./UpDownVoteBox";

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

export const DefaultVoteBox = (args) => {
	return (
		<ConfigProvider config={{}}>
			<IntlProvider locale="en">
				<DataProviderContext.Provider value={{ dataProvider: data }}>
					<AuthContext.Provider
						value={{ currentUser: currentUser, isLoggedIn: true }}
					>
						<ModalProvider>
							<VoteProvider>
								<UpDownVoteBox
									{...args}
									voteableType={args.voteableType || vote.voteable_type}
									voteableId={args.voteableId || vote.voteable_id}
									totalUpvote={args.totalUpvote}
									totalDownvote={args.totalDownvote}
									disabled={args.disabled}
									hideDownvotes={args.hideDownvotes}
								/>
							</VoteProvider>
						</ModalProvider>
					</AuthContext.Provider>
				</DataProviderContext.Provider>
			</IntlProvider>
		</ConfigProvider>
	);
};

export const DisabledVoteBox = (args) => {
	return (
		<ConfigProvider config={{}}>
			<IntlProvider locale="en">
				<DataProviderContext.Provider value={{ dataProvider: data }}>
					<AuthContext.Provider
						value={{ currentUser: currentUser, isLoggedIn: true }}
					>
						<ModalProvider>
							<VoteProvider>
								<UpDownVoteBox
									{...args}
									voteableType={args.voteableType || vote.voteable_type}
									voteableId={args.voteableId || vote.voteable_id}
									totalUpvote={args.totalUpvote}
									totalDownvote={args.totalDownvote}
									disabled={true}
									hideDownvotes={args.hideDownvotes}
								/>
							</VoteProvider>
						</ModalProvider>
					</AuthContext.Provider>
				</DataProviderContext.Provider>
			</IntlProvider>
		</ConfigProvider>
	);
};
