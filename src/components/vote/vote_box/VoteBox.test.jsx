import { faker } from "@faker-js/faker";
import { AuthContext } from "@logora/debate/auth/use_auth";
import { ConfigProvider } from "@logora/debate/data/config_provider";
import {
	DataProviderContext,
	dataProvider,
} from "@logora/debate/data/data_provider";
import { ModalProvider } from "@logora/debate/dialog/modal";
import { ToastProvider } from "@logora/debate/dialog/toast_provider";
import { IconProvider } from "@logora/debate/icons/icon_provider";
import * as regularIcons from "@logora/debate/icons/regular_icons";
import { Location } from "@logora/debate/util/location";
import { VoteProvider } from "@logora/debate/vote/vote_provider";
import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
	get: () => Promise.resolve({ data: { success: true, data: { resource: null } } }),
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

const debate = {
	id: faker.number.int(),
	votes_count: {
		total: 10,
		1: 5,
		2: 5,
		3: 0,
	},
};

const votePositions = [
	{ id: 1, name: "Position 1" },
	{ id: 2, name: "Position 2" },
	{ id: 3, name: "Position 3" },
];

const data = dataProvider(httpClient, "https://mock.example.api");

const VoteBoxWrapper = ({ children, data: providerData = data, config = {} }) => {
	return (
		<BrowserRouter>
			<IntlProvider locale="en">
				<DataProviderContext.Provider value={{ dataProvider: providerData }}>
					<AuthContext.Provider
						value={{ currentUser: currentUser, isLoggedIn: true, isLoggingIn: false }}
					>
						<IconProvider library={regularIcons}>
							<ToastProvider>
								<ConfigProvider config={config} routes={{ ...routes }}>
									<ModalProvider>
										<VoteProvider>{children}</VoteProvider>
									</ModalProvider>
								</ConfigProvider>
							</ToastProvider>
						</IconProvider>
					</AuthContext.Provider>
				</DataProviderContext.Provider>
			</IntlProvider>
		</BrowserRouter>
	);
};

describe("VoteBox Component", () => {
	beforeAll(() => {
		Object.defineProperty(window, "matchMedia", {
			writable: true,
			value: vi.fn().mockImplementation((query) => ({
				matches: false,
				media: query,
				onchange: null,
				addListener: vi.fn(),
				removeListener: vi.fn(),
				addEventListener: vi.fn(),
				removeEventListener: vi.fn(),
				dispatchEvent: vi.fn(),
			})),
		});
	});

	it("should render component correctly", () => {
		const { getByText, getAllByTestId, queryByRole } = render(
			<VoteBoxWrapper>
				<VoteBox
					voteableId={debate.id}
					voteableType={vote.voteable_type}
					votePositions={votePositions}
					numberVotes={debate.votes_count}
				/>
			</VoteBoxWrapper>,
		);

		const voteButtons = getAllByTestId("voteButton");
		expect(voteButtons).toHaveLength(3);
		expect(voteButtons[0].getAttribute("title")).toBe("Position 1");
		expect(voteButtons[1].getAttribute("title")).toBe("Position 2");
		expect(voteButtons[2].getAttribute("title")).toBe("Position 3");

		expect(queryByRole("link")).toBeNull();
	});

	it("should apply the filled-neutral class when the setting is enabled", () => {
		const { container } = render(
			<VoteBoxWrapper config={{ layout: { filledNeutralVoteButton: true } }}>
				<VoteBox
					voteableId={debate.id}
					voteableType={vote.voteable_type}
					votePositions={votePositions}
					numberVotes={debate.votes_count}
				/>
			</VoteBoxWrapper>,
		);

		expect(
			container.querySelector(".voteBoxActionsBodyFilledNeutral"),
		).toBeInTheDocument();
	});

	it("should not apply the filled-neutral class by default", () => {
		const { container } = render(
			<VoteBoxWrapper>
				<VoteBox
					voteableId={debate.id}
					voteableType={vote.voteable_type}
					votePositions={votePositions}
					numberVotes={debate.votes_count}
				/>
			</VoteBoxWrapper>,
		);

		expect(
			container.querySelector(".voteBoxActionsBodyFilledNeutral"),
		).toBeNull();
	});

	it("should call callback", async () => {
		const onVote = vi.fn();
		const { getByTitle } = render(
			<VoteBoxWrapper>
				<VoteBox
					voteableId={debate.id}
					voteableType={vote.voteable_type}
					votePositions={votePositions}
					numberVotes={debate.votes_count}
					onVote={onVote}
				/>
			</VoteBoxWrapper>,
		);

		const button = getByTitle("Position 1");
		await userEvent.click(button);
		expect(onVote).toHaveBeenCalled();
	});

	it("should show result when disabled", () => {
		const { getAllByText, queryByText } = render(
			<VoteBoxWrapper>
				<VoteBox
					voteableId={debate.id}
					voteableType={vote.voteable_type}
					votePositions={votePositions}
					numberVotes={debate.votes_count}
					disabled={true}
				/>
			</VoteBoxWrapper>,
		);

		const resultPercentages = getAllByText(/\d+%$/i);
		expect(resultPercentages).toHaveLength(3);
		expect(within(resultPercentages[0]).getByText("50%")).toBeInTheDocument();
		expect(within(resultPercentages[1]).getByText("50%")).toBeInTheDocument();
		expect(within(resultPercentages[2]).getByText("0%")).toBeInTheDocument();

		const modify = queryByText("Modify");
		const backToVote = queryByText("Back to vote");
		expect(modify).toBeNull();
		expect(backToVote).toBeNull();
	});

	it("should display results", async () => {
		const { getByTestId, getByText, getAllByText } = render(
			<VoteBoxWrapper>
				<VoteBox
					voteableId={debate.id}
					voteableType={vote.voteable_type}
					votePositions={votePositions}
					numberVotes={debate.votes_count}
				/>
			</VoteBoxWrapper>,
		);

		const showResultLink = getByTestId("show-result");
		expect(showResultLink).toBeInTheDocument();
		await userEvent.click(showResultLink);

		const backToVote = getByText("Back to vote");
		const resultHeadings = getAllByText(/position \d/i);
		const resultPercentages = getAllByText(/\d+%$/i);
		expect(backToVote).toBeInTheDocument();
		expect(resultHeadings).toHaveLength(3);
		expect(resultPercentages).toHaveLength(3);
		expect(within(resultPercentages[0]).getByText("50%")).toBeInTheDocument();
		expect(within(resultPercentages[1]).getByText("50%")).toBeInTheDocument();
		expect(within(resultPercentages[2]).getByText("0%")).toBeInTheDocument();
	});

	it("should add vote", async () => {
		const { getByTitle, queryByText, getAllByText } = render(
			<VoteBoxWrapper>
				<VoteBox
					voteableId={debate.id}
					voteableType={vote.voteable_type}
					votePositions={votePositions}
					numberVotes={debate.votes_count}
				/>
			</VoteBoxWrapper>,
		);

		const position1 = getByTitle("Position 1");
		expect(queryByText("Modify")).toBeNull();
		expect(queryByText("Show result")).toBeInTheDocument();

		// Vote buttons are disabled while the user's vote state is loading
		await waitFor(() => expect(position1).not.toBeDisabled());

		await userEvent.click(position1);
		expect(queryByText("11 votes")).toBeInTheDocument();
		expect(queryByText("Modify")).toBeInTheDocument();
		expect(queryByText("Show result")).toBeNull();
		const resultPercentages = getAllByText(/\d+%$/i);
		expect(within(resultPercentages[0]).getByText("55%")).toBeInTheDocument();
		expect(within(resultPercentages[1]).getByText("45%")).toBeInTheDocument();
		expect(within(resultPercentages[2]).getByText("0%")).toBeInTheDocument();

		await userEvent.click(queryByText("Modify"));
		expect(queryByText("Show result")).toBeInTheDocument();
		expect(queryByText("Modify")).toBeNull();
	});

	it("should redirect after vote", async () => {
		const { getByTestId, getByTitle } = render(
			<VoteBoxWrapper>
				<VoteBox
					voteableId={debate.id}
					voteableType={vote.voteable_type}
					votePositions={votePositions}
					numberVotes={debate.votes_count}
					redirectUrl={"myUrl"}
				/>
			</VoteBoxWrapper>,
		);

		// In redirect mode, vote actions are rendered as links (one per position + show result)
		expect(screen.getAllByRole("link")).toHaveLength(4);

		const showResultLink = getByTestId("show-result");
		expect(showResultLink).toHaveAttribute("href", "myUrl?initVote=true");

		const firstPosition = getByTitle("Position 1");
		expect(firstPosition).toHaveAttribute(
			"href",
			"myUrl?initVote=true&positionId=1",
		);

		const secondPosition = getByTitle("Position 2");
		expect(secondPosition).toHaveAttribute(
			"href",
			"myUrl?initVote=true&positionId=2",
		);

		const thirdPosition = getByTitle("Position 3");
		expect(thirdPosition).toHaveAttribute(
			"href",
			"myUrl?initVote=true&positionId=3",
		);
	});

	it("should not create a vote while the user's vote is still loading", async () => {
		const loadingHttpClient = {
			get: () => new Promise(() => {}),
			post: vi.fn(() =>
				Promise.resolve({
					data: { success: true, data: { resource: vote } },
				}),
			),
			patch: vi.fn(),
			delete: vi.fn(),
		};
		const { getByTitle } = render(
			<VoteBoxWrapper data={dataProvider(loadingHttpClient, "https://mock.example.api")}>
				<VoteBox
					voteableId={debate.id}
					voteableType={vote.voteable_type}
					votePositions={votePositions}
					numberVotes={debate.votes_count}
				/>
			</VoteBoxWrapper>,
		);

		// The user's vote never finishes loading: buttons are disabled and a
		// click must not send any request (no double vote).
		const position1 = getByTitle("Position 1");
		expect(position1).toBeDisabled();

		await userEvent.click(position1);
		expect(loadingHttpClient.post).not.toHaveBeenCalled();
	});

	it("should still apply a vote triggered from URL parameters once the user's vote is loaded", async () => {
		window.history.replaceState({}, "", "/?initVote=true&positionId=1");
		sessionStorage.clear();

		const postMock = vi.fn(() =>
			Promise.resolve({
				data: {
					success: true,
					data: {
						resource: {
							...vote,
							position_id: 1,
							voteable_id: debate.id,
							voteable_type: vote.voteable_type,
						},
					},
				},
			}),
		);
		const urlVoteHttpClient = {
			get: () => Promise.resolve({ data: { success: true, data: { resource: null } } }),
			post: postMock,
			patch: vi.fn(),
			delete: vi.fn(),
		};
		const { findByText } = render(
			<VoteBoxWrapper data={dataProvider(urlVoteHttpClient, "https://mock.example.api")}>
				<VoteBox
					voteableId={debate.id}
					voteableType={vote.voteable_type}
					votePositions={votePositions}
					numberVotes={debate.votes_count}
				/>
			</VoteBoxWrapper>,
		);

		// Once the user's vote state is loaded, the vote requested via the URL is applied.
		await waitFor(() => expect(postMock).toHaveBeenCalledTimes(1));
		expect(await findByText("Modify")).toBeInTheDocument();
	});

	it("should report updated counts to the parent", async () => {
		const onVoteCountsChange = vi.fn();
		const { getByTitle } = render(
			<VoteBoxWrapper>
				<VoteBox
					voteableId={debate.id}
					voteableType={vote.voteable_type}
					votePositions={votePositions}
					numberVotes={debate.votes_count}
					onVoteCountsChange={onVoteCountsChange}
				/>
			</VoteBoxWrapper>,
		);

		const position1 = getByTitle("Position 1");
		await waitFor(() => expect(position1).not.toBeDisabled());
		await userEvent.click(position1);

		await waitFor(() =>
			expect(onVoteCountsChange).toHaveBeenLastCalledWith({
				total: 11,
				counts: {
					1: { count: 6, percentage: 55 },
					2: { count: 5, percentage: 45 },
					3: { count: 0, percentage: 0 },
				},
			}),
		);
	});

	it("should keep the total unchanged when the position changes", async () => {
		const existingVote = {
			...vote,
			position_id: 1,
			voteable_id: debate.id,
			voteable_type: vote.voteable_type,
		};
		const updateMock = vi.fn(() =>
			Promise.resolve({
				data: {
					success: true,
					data: { resource: { ...existingVote, position_id: 2 } },
				},
			}),
		);
		const updateHttpClient = {
			get: () =>
				Promise.resolve({ data: { success: true, data: { resource: existingVote } } }),
			post: vi.fn(),
			patch: updateMock,
			delete: vi.fn(),
		};
		const onVoteCountsChange = vi.fn();
		const { findByTitle, findByText } = render(
			<VoteBoxWrapper
				data={dataProvider(updateHttpClient, "https://mock.example.api")}
			>
				<VoteBox
					voteableId={debate.id}
					voteableType={vote.voteable_type}
					votePositions={votePositions}
					numberVotes={debate.votes_count}
					onVoteCountsChange={onVoteCountsChange}
				/>
			</VoteBoxWrapper>,
		);

		await userEvent.click(await findByText("Modify"));
		const position2 = await findByTitle("Position 2");
		await waitFor(() => expect(position2).not.toBeDisabled());
		await userEvent.click(position2);

		await waitFor(() => expect(updateMock).toHaveBeenCalledTimes(1));
		expect(onVoteCountsChange).toHaveBeenLastCalledWith({
			total: 10,
			counts: {
				1: { count: 4, percentage: 40 },
				2: { count: 6, percentage: 60 },
				3: { count: 0, percentage: 0 },
			},
		});
	});

	it("should revert the counts when the vote request fails", async () => {
		let rejectVote;
		const failingHttpClient = {
			get: () =>
				Promise.resolve({ data: { success: true, data: { resource: null } } }),
			post: vi.fn(
				() =>
					new Promise((resolve, reject) => {
						rejectVote = reject;
					}),
			),
			patch: vi.fn(),
			delete: vi.fn(),
		};
		const onVoteCountsChange = vi.fn();
		const { findByTitle, findByText, queryByText } = render(
			<VoteBoxWrapper
				data={dataProvider(failingHttpClient, "https://mock.example.api")}
			>
				<VoteBox
					voteableId={debate.id}
					voteableType={vote.voteable_type}
					votePositions={votePositions}
					numberVotes={debate.votes_count}
					onVoteCountsChange={onVoteCountsChange}
				/>
			</VoteBoxWrapper>,
		);

		const position1 = await findByTitle("Position 1");
		await waitFor(() => expect(position1).not.toBeDisabled());
		await userEvent.click(position1);

		await waitFor(() => expect(failingHttpClient.post).toHaveBeenCalledTimes(1));
		await waitFor(() =>
			expect(onVoteCountsChange).toHaveBeenLastCalledWith({
				total: 11,
				counts: {
					1: { count: 6, percentage: 55 },
					2: { count: 5, percentage: 45 },
					3: { count: 0, percentage: 0 },
				},
			}),
		);

		await act(async () => rejectVote(new Error("vote failed")));

		await waitFor(() =>
			expect(onVoteCountsChange).toHaveBeenLastCalledWith({
				total: 10,
				counts: {
					1: { count: 5, percentage: 50 },
					2: { count: 5, percentage: 50 },
					3: { count: 0, percentage: 0 },
				},
			}),
		);
		expect(await findByText("10 votes")).toBeInTheDocument();
		expect(queryByText("Modify")).toBeNull();
	});

		const existingVote = {
			...vote,
			position_id: 1,
			voteable_id: debate.id,
			voteable_type: vote.voteable_type,
		};

		const renderVotedVoteBox = (httpClientMock, onVoteCountsChange) =>
			render(
				<VoteBoxWrapper
					data={dataProvider(httpClientMock, "https://mock.example.api")}
				>
					<VoteBox
						voteableId={debate.id}
						voteableType={vote.voteable_type}
						votePositions={votePositions}
						numberVotes={debate.votes_count}
						onVoteCountsChange={onVoteCountsChange}
					/>
				</VoteBoxWrapper>,
			);

		const votedHttpClient = (deleteMock, voteResource = existingVote) => ({
			get: () =>
				Promise.resolve({ data: { success: true, data: { resource: voteResource } } }),
			post: vi.fn(),
			patch: vi.fn(),
			delete: deleteMock,
		});

		it("should delete the vote when the user cancels it", async () => {
			const deleteMock = vi.fn(() => Promise.resolve({ data: { success: true, data: {} } }));
			const onVoteCountsChange = vi.fn();
			const { findByText, findByTitle, queryByText } = renderVotedVoteBox(
				votedHttpClient(deleteMock),
				onVoteCountsChange,
			);

			await userEvent.click(await findByText("Cancel"));

			await waitFor(() => expect(deleteMock).toHaveBeenCalledTimes(1));
			expect(deleteMock.mock.calls[0][0]).toContain(`/votes/${existingVote.id}`);

			// The "not voted" state is only displayed once the deletion is confirmed
			const position1 = await findByTitle("Position 1");
			await waitFor(() => expect(position1).not.toBeDisabled());
			expect(queryByText("Cancel")).toBeNull();
			expect(queryByText("Modify")).toBeNull();
			await waitFor(() =>
				expect(onVoteCountsChange).toHaveBeenLastCalledWith({
					total: 9,
					counts: {
						1: { count: 4, percentage: 44 },
						2: { count: 5, percentage: 56 },
						3: { count: 0, percentage: 0 },
					},
				}),
			);
		});

		it("should not display the not-voted state while the cancellation is pending", async () => {
			let resolveDelete;
			const deleteMock = vi.fn(
				() =>
					new Promise((resolve) => {
						resolveDelete = resolve;
					}),
			);
			const onVoteCountsChange = vi.fn();
			const { findByText, findByTitle, queryByText, queryByTitle } = renderVotedVoteBox(
				votedHttpClient(deleteMock),
				onVoteCountsChange,
			);

			await userEvent.click(await findByText("Cancel"));
			await waitFor(() => expect(deleteMock).toHaveBeenCalledTimes(1));

			// The vote is still stored server-side, so the vote buttons stay hidden
			expect(queryByTitle("Position 1")).toBeNull();
			expect(queryByText("Modify")).toBeInTheDocument();
			expect(queryByText("Cancel")).toBeDisabled();

			await act(async () => resolveDelete({ data: { success: true, data: {} } }));

			expect(await findByTitle("Position 1")).toBeInTheDocument();
			expect(queryByText("Cancel")).toBeNull();
		});

		it("should restore the vote when the cancellation fails", async () => {
			const deleteMock = vi.fn(() => Promise.reject(new Error("delete failed")));
			const onVoteCountsChange = vi.fn();
			const { findByText, queryByText, queryByTitle } = renderVotedVoteBox(
				votedHttpClient(deleteMock),
				onVoteCountsChange,
			);

			await userEvent.click(await findByText("Cancel"));
			await waitFor(() => expect(deleteMock).toHaveBeenCalledTimes(1));

			await waitFor(() =>
				expect(onVoteCountsChange).toHaveBeenLastCalledWith({
					total: 10,
					counts: {
						1: { count: 5, percentage: 50 },
						2: { count: 5, percentage: 50 },
						3: { count: 0, percentage: 0 },
					},
				}),
			);
			// The vote is still stored, so the results and the actions stay displayed
			expect(queryByText("Modify")).toBeInTheDocument();
			expect(queryByText("Cancel")).toBeInTheDocument();
			expect(queryByTitle("Position 1")).toBeNull();
			expect(await findByText("10 votes")).toBeInTheDocument();
		});

		it("should cancel a vote whose position is not listed anymore", async () => {
			// A vote stored for later would replay and update the vote instead of cancelling it
			window.sessionStorage.clear();
			const deleteMock = vi.fn(() => Promise.resolve({ data: { success: true, data: {} } }));
			const onVoteCountsChange = vi.fn();
			const { findByText, findByTitle, queryByText } = renderVotedVoteBox(
				votedHttpClient(deleteMock, { ...existingVote, position_id: 42 }),
				onVoteCountsChange,
			);

			await userEvent.click(await findByText("Cancel"));

			await waitFor(() => expect(deleteMock).toHaveBeenCalledTimes(1));

			// Only the total decreases: the cancelled position has no counter to decrement
			expect(await findByTitle("Position 1")).toBeInTheDocument();
			expect(queryByText("Cancel")).toBeNull();
			await waitFor(() =>
				expect(onVoteCountsChange).toHaveBeenLastCalledWith({
					total: 9,
					counts: {
						1: { count: 5, percentage: 56 },
						2: { count: 5, percentage: 56 },
						3: { count: 0, percentage: 0 },
					},
				}),
			);
		});

		it("should change the position of a vote whose position is not listed anymore", async () => {
			window.sessionStorage.clear();
			const updateMock = vi.fn(() =>
				Promise.resolve({ data: { success: true, data: { resource: { ...existingVote, position_id: 1 } } } }),
			);
			const onVoteCountsChange = vi.fn();
			const { findByText, findByTitle, queryByText } = renderVotedVoteBox(
				{
					get: () =>
						Promise.resolve({
							data: { success: true, data: { resource: { ...existingVote, position_id: 42 } } },
						}),
					post: vi.fn(),
					patch: updateMock,
					delete: vi.fn(),
				},
				onVoteCountsChange,
			);

			await userEvent.click(await findByText("Modify"));
			const position1 = await findByTitle("Position 1");
			await waitFor(() => expect(position1).not.toBeDisabled());
			await userEvent.click(position1);

			await waitFor(() => expect(updateMock).toHaveBeenCalledTimes(1));
			// Only the new position is incremented: the previous one has no counter
			await waitFor(() =>
				expect(onVoteCountsChange).toHaveBeenLastCalledWith({
					total: 10,
					counts: {
						1: { count: 6, percentage: 60 },
						2: { count: 5, percentage: 50 },
						3: { count: 0, percentage: 0 },
					},
				}),
			);
			expect(queryByText("Modify")).toBeInTheDocument();
		});
});
