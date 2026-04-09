import { faker } from "@faker-js/faker";
import { AuthContext } from "@logora/debate/auth/use_auth";
import { ConfigProvider } from "@logora/debate/data/config_provider";
import {
	DataProviderContext,
	dataProvider,
} from "@logora/debate/data/data_provider";
import { ModalProvider } from "@logora/debate/dialog/modal";
import { IconProvider } from "@logora/debate/icons/icon_provider";
import * as regularIcons from "@logora/debate/icons/regular_icons";
import { VoteProvider } from "@logora/debate/vote/vote_provider";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

const callback = vi.fn();

afterEach(() => {
	vi.clearAllMocks();
});

describe("UpDownVoteBox", () => {
	it("should render correct upvotes and downvotes", () => {
		const { queryByText } = render(
			<ConfigProvider config={{}}>
				<IntlProvider locale="en">
					<DataProviderContext.Provider value={{ dataProvider: data }}>
						<IconProvider library={regularIcons}>
							<AuthContext.Provider
								value={{ currentUser: currentUser, isLoggedIn: true }}
							>
								<ModalProvider>
									<VoteProvider>
										<SuggestionVoteBox
											voteableType={vote.voteable_type}
											voteableId={vote.voteable_id}
											totalUpvote={10}
											totalDownvote={12}
										/>
									</VoteProvider>
								</ModalProvider>
							</AuthContext.Provider>
						</IconProvider>
					</DataProviderContext.Provider>
				</IntlProvider>
			</ConfigProvider>,
		);

		expect(queryByText("Not interested")).toBeInTheDocument();
		expect(queryByText("I'm interested")).toBeInTheDocument();
	});

	it("should add user upvote", async () => {
		const container = render(
			<ConfigProvider config={{}}>
				<IntlProvider locale="en">
					<DataProviderContext.Provider value={{ dataProvider: data }}>
						<IconProvider library={regularIcons}>
							<AuthContext.Provider
								value={{ currentUser: currentUser, isLoggedIn: true }}
							>
								<ModalProvider>
									<VoteProvider>
										<SuggestionVoteBox
											voteableType={vote.voteable_type}
											voteableId={vote.voteable_id}
											totalUpvote={10}
											totalDownvote={14}
											onVote={callback}
										/>
									</VoteProvider>
								</ModalProvider>
							</AuthContext.Provider>
						</IconProvider>
					</DataProviderContext.Provider>
				</IntlProvider>
			</ConfigProvider>,
		);

		const voteBox = container.getByTestId("upvote-button");
		const upvoteIcon = container.getByTestId("upvote-icon");
		await userEvent.click(voteBox);

		expect(voteBox).not.toHaveClass("active");
		expect(upvoteIcon).toBeInTheDocument();
		expect(callback).toHaveBeenCalledTimes(1);
	});

	it("should add user upvote and delete it when clicking again", async () => {
		const container = render(
			<ConfigProvider config={{}}>
				<IntlProvider locale="en">
					<DataProviderContext.Provider value={{ dataProvider: data }}>
						<IconProvider library={regularIcons}>
							<AuthContext.Provider
								value={{ currentUser: currentUser, isLoggedIn: true }}
							>
								<ModalProvider>
									<VoteProvider>
										<SuggestionVoteBox
											voteableType={vote.voteable_type}
											voteableId={vote.voteable_id}
											totalUpvote={5}
											totalDownvote={32}
											onVote={callback}
										/>
									</VoteProvider>
								</ModalProvider>
							</AuthContext.Provider>
						</IconProvider>
					</DataProviderContext.Provider>
				</IntlProvider>
			</ConfigProvider>,
		);

		const voteBox = container.getByTestId("upvote-button");
		await userEvent.click(voteBox);

		expect(voteBox).not.toHaveClass("active");
		expect(callback).toHaveBeenCalledTimes(1);

		await userEvent.click(voteBox);

		expect(voteBox).toHaveClass("active");
		expect(callback).toHaveBeenCalledTimes(2);
	});

	it("should do nothing if disabled", async () => {
		const container = render(
			<ConfigProvider config={{}}>
				<IntlProvider locale="en">
					<DataProviderContext.Provider value={{ dataProvider: data }}>
						<IconProvider library={regularIcons}>
							<AuthContext.Provider
								value={{ currentUser: currentUser, isLoggedIn: true }}
							>
								<ModalProvider>
									<VoteProvider>
										<SuggestionVoteBox
											voteableType={vote.voteable_type}
											voteableId={vote.voteable_id}
											totalUpvote={50}
											totalDownvote={0}
											disabled
										/>
									</VoteProvider>
								</ModalProvider>
							</AuthContext.Provider>
						</IconProvider>
					</DataProviderContext.Provider>
				</IntlProvider>
			</ConfigProvider>,
		);

		const voteBox = container.getByTestId("upvote-button");
		const upvoteIcon = container.getByTestId("upvote-icon");
		await userEvent.click(voteBox);

		expect(callback).toHaveBeenCalledTimes(0);
		expect(upvoteIcon).toBeInTheDocument();
		expect(voteBox).toHaveClass("active");
	});
});
