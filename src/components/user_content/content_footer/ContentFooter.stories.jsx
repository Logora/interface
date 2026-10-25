export default {
	title: "User Content/Content Footer",
	component: ContentFooter,
	args: {
		reportType: "",
		deleteType: "",
		deleteListId: "",
		softDelete: false,
		disabled: false,
		enableReply: true,
		handleReplyTo: undefined,
		showActions: true,
		showShareButton: true,
		shareModal: false,
		shareUrl: "https://test.com",
		shareTitle: "Share title",
		shareText: "Share text",
		shareModalTitle: "Share content",
		showShareCode: true,
		shareCode: "</>",
		showShareText: true,
		enableEdition: true,
		enableDeletion: true,
		enableReport: true,
		containerClassName: "",
		voteActionClassName: "",
		replyRedirectUrl: "",
	},
	argTypes: {
		reportType: { control: "text" },
		deleteType: { control: "text" },
		deleteListId: { control: "text" },
		softDelete: { control: "boolean" },
		disabled: { control: "boolean" },
		enableReply: { control: "boolean" },
		handleReplyTo: { action: "replied" },
		showActions: { control: "boolean" },
		showShareButton: { control: "boolean" },
		shareModal: { control: "boolean" },
		shareUrl: { control: "text" },
		shareTitle: { control: "text" },
		shareText: { control: "text" },
		shareModalTitle: { control: "text" },
		showShareCode: { control: "boolean" },
		shareCode: { control: "text" },
		showShareText: { control: "boolean" },
		enableEdition: { control: "boolean" },
		enableDeletion: { control: "boolean" },
		enableReport: { control: "boolean" },
		containerClassName: { control: "text" },
		voteActionClassName: { control: "text" },
		replyRedirectUrl: { control: "text" },
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
import { ResponsiveProvider } from "@logora/debate/hooks/use_responsive";
import { ListProvider } from "@logora/debate/list/list_provider";
import { ProgressBar } from "@logora/debate/progress/progress_bar";
import { UpDownVoteBox } from "@logora/debate/vote/up_down_vote_box";
import { VoteButton } from "@logora/debate/vote/vote_button";
import { VoteProvider } from "@logora/debate/vote/vote_provider";
import React from "react";
import { IntlProvider } from "react-intl";
import { ContentFooter } from "./ContentFooter";

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

const data = dataProvider(httpClient, "https://mock.example.api");

const resource = {
	id: faker.number.int(),
	author: {
		id: faker.number.int(),
	},
	created_at: faker.date.recent(),
	upvotes: 10,
	total_upvotes: 10,
	total_downvotes: 8,
};

const currentUser = {
	id: resource.author.id,
};

export const DefaultContentFooter = (args = {}) => {
	const defaultStoryArgs = {
		reportType: "",
		deleteType: "",
		deleteListId: "",
		softDelete: false,
		disabled: false,
		enableReply: true,
		handleReplyTo: undefined,
		showActions: true,
		showShareButton: true,
		shareModal: false,
		shareUrl: "https://test.com",
		shareTitle: "Share title",
		shareText: "Share text",
		shareModalTitle: "Share content",
		showShareCode: true,
		shareCode: "</>",
		showShareText: true,
		enableEdition: true,
		enableDeletion: true,
		enableReport: true,
		containerClassName: "",
		voteActionClassName: "",
		replyRedirectUrl: "",
	};

	return (
		<div style={{ width: "400px", height: "60px" }}>
			<IntlProvider locale="en">
				<ConfigProvider config={{ auth: { disableLoginModal: true } }}>
					<DataProviderContext.Provider value={{ dataProvider: data }}>
						<AuthContext.Provider
							value={{ currentUser: currentUser, isLoggedIn: true }}
						>
							<ListProvider>
								<ResponsiveProvider elementWidth={1000} iMobile>
									<ModalProvider>
										<ToastProvider>
											<VoteProvider>
												<ContentFooter
													resource={resource}
													{...defaultStoryArgs}
													{...args}
												>
													<VoteButton
														voteableType={"Message"}
														voteableId={45}
														totalUpvote={10}
														totalDownvote={0}
														disabled={false}
													/>
												</ContentFooter>
											</VoteProvider>
										</ToastProvider>
									</ModalProvider>
								</ResponsiveProvider>
							</ListProvider>
						</AuthContext.Provider>
					</DataProviderContext.Provider>
				</ConfigProvider>
			</IntlProvider>
		</div>
	);
};

export const ContentFooterShareModal = () => {
	return (
		<div style={{ width: "400px", height: "60px" }}>
			<IntlProvider locale="en">
				<ConfigProvider config={{ auth: { disableLoginModal: true } }}>
					<DataProviderContext.Provider value={{ dataProvider: data }}>
						<AuthContext.Provider
							value={{ currentUser: currentUser, isLoggedIn: true }}
						>
							<ListProvider>
								<ResponsiveProvider>
									<ModalProvider>
										<ToastProvider>
											<VoteProvider>
												<ContentFooter
													resource={resource}
													showActions
													shareModal
													showShareButton={false}
													enableReply
													shareUrl={"https://test.com"}
													shareTitle={"Share title"}
													shareText={"Share text"}
													showShareText
													showShareCode
													shareCode={"</>"}
													shareModalTitle={"Share content"}
												>
													<VoteButton
														voteableType={"Message"}
														voteableId={45}
														totalUpvote={10}
														totalDownvote={0}
														disabled={false}
													/>
												</ContentFooter>
											</VoteProvider>
										</ToastProvider>
									</ModalProvider>
								</ResponsiveProvider>
							</ListProvider>
						</AuthContext.Provider>
					</DataProviderContext.Provider>
				</ConfigProvider>
			</IntlProvider>
		</div>
	);
};

export const ContentFooterUpDownVoteBox = () => {
	return (
		<div style={{ width: "400px", height: "60px" }}>
			<IntlProvider locale="en">
				<ConfigProvider config={{ auth: { disableLoginModal: true } }}>
					<DataProviderContext.Provider value={{ dataProvider: data }}>
						<AuthContext.Provider
							value={{ currentUser: currentUser, isLoggedIn: true }}
						>
							<ListProvider>
								<ResponsiveProvider>
									<ModalProvider>
										<ToastProvider>
											<VoteProvider>
												<ContentFooter
													resource={resource}
													showActions
													shareModal
													upDownVoteBox
													shareUrl={"https://test.com"}
													shareTitle={"Share title"}
													shareText={"Share text"}
													voteableType={vote.voteable_type}
													showShareText
													showShareCode
													shareCode={"</>"}
													shareModalTitle={"Share content"}
												>
													<UpDownVoteBox
														voteableType={"Message"}
														voteableId={45}
														totalUpvote={10}
														totalDownvote={5}
														disabled={false}
													/>
												</ContentFooter>
											</VoteProvider>
										</ToastProvider>
									</ModalProvider>
								</ResponsiveProvider>
							</ListProvider>
						</AuthContext.Provider>
					</DataProviderContext.Provider>
				</ConfigProvider>
			</IntlProvider>
		</div>
	);
};

export const ContentFooterDisabled = () => {
	return (
		<div style={{ width: "400px", height: "60px" }}>
			<IntlProvider locale="en">
				<ConfigProvider config={{ auth: { disableLoginModal: true } }}>
					<DataProviderContext.Provider value={{ dataProvider: data }}>
						<AuthContext.Provider
							value={{ currentUser: currentUser, isLoggedIn: true }}
						>
							<ListProvider>
								<ResponsiveProvider>
									<ModalProvider>
										<ToastProvider>
											<VoteProvider>
												<ContentFooter
													resource={resource}
													disabled
													showActions
													shareModal
													enableReply
													shareUrl={"https://test.com"}
													shareTitle={"Share title"}
													shareText={"Share text"}
													showShareText
													showShareCode
													shareCode={"</>"}
													shareModalTitle={"Share content"}
												>
													<VoteButton
														voteableType={"Message"}
														voteableId={45}
														totalUpvote={10}
														totalDownvote={0}
														disabled={true}
													/>
												</ContentFooter>
											</VoteProvider>
										</ToastProvider>
									</ModalProvider>
								</ResponsiveProvider>
							</ListProvider>
						</AuthContext.Provider>
					</DataProviderContext.Provider>
				</ConfigProvider>
			</IntlProvider>
		</div>
	);
};

export const ContentFooterWithoutReply = () => {
	return (
		<div style={{ width: "400px", height: "60px" }}>
			<IntlProvider locale="en">
				<ConfigProvider config={{ auth: { disableLoginModal: true } }}>
					<DataProviderContext.Provider value={{ dataProvider: data }}>
						<AuthContext.Provider
							value={{ currentUser: currentUser, isLoggedIn: true }}
						>
							<ListProvider>
								<ResponsiveProvider>
									<ModalProvider>
										<ToastProvider>
											<VoteProvider>
												<ContentFooter
													resource={resource}
													showActions
													showShareButton
													shareUrl={"https://test.com"}
													shareTitle={"Share title"}
													shareText={"Share text"}
													showShareText
													showShareCode
													shareCode={"</>"}
												>
													<VoteButton
														voteableType={"Message"}
														voteableId={45}
														totalUpvote={10}
														totalDownvote={0}
														disabled={false}
													/>
												</ContentFooter>
											</VoteProvider>
										</ToastProvider>
									</ModalProvider>
								</ResponsiveProvider>
							</ListProvider>
						</AuthContext.Provider>
					</DataProviderContext.Provider>
				</ConfigProvider>
			</IntlProvider>
		</div>
	);
};

export const ContentFooterProgressBar = () => {
	return (
		<div style={{ width: "400px", height: "60px" }}>
			<IntlProvider locale="en">
				<ConfigProvider config={{ auth: { disableLoginModal: true } }}>
					<DataProviderContext.Provider value={{ dataProvider: data }}>
						<AuthContext.Provider
							value={{ currentUser: currentUser, isLoggedIn: true }}
						>
							<ListProvider>
								<ResponsiveProvider>
									<ModalProvider>
										<ToastProvider>
											<VoteProvider>
												<ContentFooter resource={resource} showActions>
													<div>25/30 supports</div>
													<ProgressBar progress={25} goal={30}>
														Nice progress !
													</ProgressBar>
												</ContentFooter>
											</VoteProvider>
										</ToastProvider>
									</ModalProvider>
								</ResponsiveProvider>
							</ListProvider>
						</AuthContext.Provider>
					</DataProviderContext.Provider>
				</ConfigProvider>
			</IntlProvider>
		</div>
	);
};

export const ContentFooterWithoutEdition = () => {
	return (
		<div style={{ width: "400px", height: "60px" }}>
			<IntlProvider locale="en">
				<ConfigProvider config={{ auth: { disableLoginModal: true } }}>
					<DataProviderContext.Provider value={{ dataProvider: data }}>
						<AuthContext.Provider
							value={{ currentUser: currentUser, isLoggedIn: true }}
						>
							<ListProvider>
								<ResponsiveProvider>
									<ModalProvider>
										<ToastProvider>
											<VoteProvider>
												<ContentFooter
													resource={resource}
													showActions
													showShareButton
													enableReply
													shareUrl={"https://test.com"}
													shareTitle={"Share title"}
													shareText={"Share text"}
													showShareText
													showShareCode
													shareCode={"</>"}
													enableEdition={false}
												>
													<VoteButton
														voteableType={"Message"}
														voteableId={45}
														totalUpvote={10}
														totalDownvote={0}
														disabled={false}
													/>
												</ContentFooter>
											</VoteProvider>
										</ToastProvider>
									</ModalProvider>
								</ResponsiveProvider>
							</ListProvider>
						</AuthContext.Provider>
					</DataProviderContext.Provider>
				</ConfigProvider>
			</IntlProvider>
		</div>
	);
};

export const ContentFooterWithoutDeletion = () => {
	return (
		<div style={{ width: "400px", height: "60px" }}>
			<IntlProvider locale="en">
				<ConfigProvider config={{ auth: { disableLoginModal: true } }}>
					<DataProviderContext.Provider value={{ dataProvider: data }}>
						<AuthContext.Provider
							value={{ currentUser: currentUser, isLoggedIn: true }}
						>
							<ListProvider>
								<ResponsiveProvider>
									<ModalProvider>
										<ToastProvider>
											<VoteProvider>
												<ContentFooter
													resource={resource}
													showActions
													showShareButton
													enableReply
													shareUrl={"https://test.com"}
													shareTitle={"Share title"}
													shareText={"Share text"}
													showShareText
													showShareCode
													shareCode={"</>"}
													enableDeletion={false}
												>
													<VoteButton
														voteableType={"Message"}
														voteableId={45}
														totalUpvote={10}
														totalDownvote={0}
														disabled={false}
													/>
												</ContentFooter>
											</VoteProvider>
										</ToastProvider>
									</ModalProvider>
								</ResponsiveProvider>
							</ListProvider>
						</AuthContext.Provider>
					</DataProviderContext.Provider>
				</ConfigProvider>
			</IntlProvider>
		</div>
	);
};
