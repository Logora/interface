export default {
	title: "Vote/Vote Box",
	component: VoteBox,
	args: {
		numberVotes: { total: 15, 1: 10, 2: 5 },
		votePositions: [{ id: 1, name: "Yes" }, { id: 2, name: "No" }],
		voteableType: "Group",
		voteableId: 1,
		redirectUrl: "",
		displayColumn: true,
		textAlignLeft: false,
		showTotal: true,
		voteBoxClassName: "",
		buttonContainerClassName: "",
		buttonClassName: "",
		showResultClassName: "",
		onVote: undefined,
		disabled: false,
		showVotesCommentsNumber: false,
		commentsCount: 0,
		hideShowResultButton: true,
	},
	argTypes: {
		numberVotes: { control: "object" },
		votePositions: { control: "object" },
		voteableType: { control: "text" },
		voteableId: { control: "number" },
		redirectUrl: { control: "text" },
		displayColumn: { control: "boolean" },
		textAlignLeft: { control: "boolean" },
		showTotal: { control: "boolean" },
		voteBoxClassName: { control: "text" },
		buttonContainerClassName: { control: "text" },
		buttonClassName: { control: "text" },
		showResultClassName: { control: "text" },
		onVote: { action: "voted" },
		disabled: { control: "boolean" },
		showVotesCommentsNumber: { control: "boolean" },
		commentsCount: { control: "number" },
		hideShowResultButton: { control: "boolean" },
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
import { ToastProvider } from "@logora/debate/dialog/toast_provider";
import { Location } from "@logora/debate/util/location";
import { VoteProvider } from "@logora/debate/vote/vote_provider";
import React from "react";
import { IntlProvider } from "react-intl";
import { BrowserRouter } from "react-router-dom";
import { VoteBox } from "./VoteBox";

const routes = {
	debateShowLocation: new Location("espace-debat/debate/:debateSlug", {
		debateSlug: "",
	}),
};

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

const votePositions = [
	{ id: 1, name: "Yes" },
	{ id: 2, name: "No" },
];

const threeVotePositions = [
	{ id: 1, name: "Yes" },
	{ id: 2, name: "No" },
	{ id: 3, name: "No Opinion" },
];

const debate = {
	id: faker.number.int(),
	votes_count: {
		total: 15,
		1: 10,
		2: 5,
	},
	messages_count: 23,
};

const debateThreeVotePositions = {
	id: 1,
	votes_count: {
		1: "10",
		2: "8",
		3: "6",
		total: "24",
	},
};

const data = dataProvider(httpClient, "https://mock.example.api");

export const DefaultVoteBox = (args) => {	return (
		<div style={{ width: "400px" }}>
			<BrowserRouter>
				<IntlProvider locale="en">
					<DataProviderContext.Provider value={{ dataProvider: data }}>
						<AuthContext.Provider
							value={{ currentUser: currentUser, isLoggedIn: true }}
						>
							<ToastProvider>
								<ConfigProvider config={{}} routes={{ ...routes }}>
									<ModalProvider>
										<VoteProvider>
											<VoteBox
												voteableId={debate.id}
												numberVotes={debate.votes_count}
												voteableType={"Group"}
												votePositions={votePositions}
												displayColumn
												{...args}
											/>
										</VoteProvider>
									</ModalProvider>
								</ConfigProvider>
							</ToastProvider>
						</AuthContext.Provider>
					</DataProviderContext.Provider>
				</IntlProvider>
			</BrowserRouter>
		</div>
	);
};

export const VoteBoxRow = () => {
	return (
		<div style={{ width: "400px" }}>
			<BrowserRouter>
				<IntlProvider locale="en">
					<DataProviderContext.Provider value={{ dataProvider: data }}>
						<AuthContext.Provider
							value={{ currentUser: currentUser, isLoggedIn: true }}
						>
							<ToastProvider>
								<ConfigProvider config={{}} routes={{ ...routes }}>
									<ModalProvider>
										<VoteProvider>
											<VoteBox
												voteableId={debate.id}
												numberVotes={debate.votes_count}
												voteableType={"Group"}
												votePositions={votePositions}
											/>
										</VoteProvider>
									</ModalProvider>
								</ConfigProvider>
							</ToastProvider>
						</AuthContext.Provider>
					</DataProviderContext.Provider>
				</IntlProvider>
			</BrowserRouter>
		</div>
	);
};

export const VoteBoxNeutralPosition = () => {
	return (
		<div style={{ width: "400px" }}>
			<BrowserRouter>
				<IntlProvider locale="en">
					<DataProviderContext.Provider value={{ dataProvider: data }}>
						<AuthContext.Provider
							value={{ currentUser: currentUser, isLoggedIn: true }}
						>
							<ToastProvider>
								<ConfigProvider config={{}} routes={{ ...routes }}>
									<ModalProvider>
										<VoteProvider>
											<VoteBox
												voteableId={debateThreeVotePositions.id}
												numberVotes={debateThreeVotePositions.votes_count}
												voteableType={"Group"}
												votePositions={threeVotePositions}
												displayColumn
											/>
										</VoteProvider>
									</ModalProvider>
								</ConfigProvider>
							</ToastProvider>
						</AuthContext.Provider>
					</DataProviderContext.Provider>
				</IntlProvider>
			</BrowserRouter>
		</div>
	);
};

export const VoteBoxDisabled = () => {
	return (
		<div style={{ width: "400px" }}>
			<BrowserRouter>
				<IntlProvider locale="en">
					<DataProviderContext.Provider value={{ dataProvider: data }}>
						<AuthContext.Provider
							value={{ currentUser: currentUser, isLoggedIn: true }}
						>
							<ToastProvider>
								<ConfigProvider config={{}} routes={{ ...routes }}>
									<ModalProvider>
										<VoteProvider>
											<VoteBox
												voteableId={debateThreeVotePositions.id}
												numberVotes={debateThreeVotePositions.votes_count}
												voteableType={"Group"}
												votePositions={threeVotePositions}
												displayColumn
												disabled
											/>
										</VoteProvider>
									</ModalProvider>
								</ConfigProvider>
							</ToastProvider>
						</AuthContext.Provider>
					</DataProviderContext.Provider>
				</IntlProvider>
			</BrowserRouter>
		</div>
	);
};

export const VoteBoxWithVotesAndComments = (args) => {	return (
		<div style={{ width: "400px" }}>
			<BrowserRouter>
				<IntlProvider locale="en">
					<DataProviderContext.Provider value={{ dataProvider: data }}>
						<AuthContext.Provider
							value={{ currentUser: currentUser, isLoggedIn: true }}
						>
							<ToastProvider>
								<ConfigProvider
									config={{}}
									routes={{ ...routes }}
								>
									<ModalProvider>
										<VoteProvider>
											<VoteBox
												voteableId={debate.id}
												numberVotes={debate.votes_count}
												voteableType={"Group"}
												votePositions={votePositions}
												showTotal={false}
												showVotesCommentsNumber={true}
												commentsCount={debate.messages_count}
											/>
										</VoteProvider>
									</ModalProvider>
								</ConfigProvider>
							</ToastProvider>
						</AuthContext.Provider>
					</DataProviderContext.Provider>
				</IntlProvider>
			</BrowserRouter>
		</div>
	);
};
