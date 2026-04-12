import { faker } from "@faker-js/faker";
import { AuthContext } from "@logora/debate/auth/use_auth";
import { ConfigProvider } from "@logora/debate/data/config_provider";
import {
	DataProviderContext,
	dataProvider,
} from "@logora/debate/data/data_provider";
import { ModalProvider } from "@logora/debate/dialog/modal";
import { VoteContext } from "@logora/debate/vote/vote_provider";
import { VoteProvider } from "@logora/debate/vote/vote_provider";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { useState } from "react";
import { useVote } from "./useVote";

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

const errorHttpClient = {
	get: () => null,
	post: (url, data, config) => {
		return new Promise((resolve, reject) => {
			reject();
		});
	},
	patch: () => null,
	delete: (url, data, config) => {
		return new Promise((resolve, reject) => {
			reject();
		});
	},
};

const vote = {
	id: faker.number.int(),
	voteable_type: faker.lorem.word(),
	voteable_id: faker.number.int(),
	user_id: faker.number.int(),
};

const currentUser = {
	id: vote.user_id,
};

const data = dataProvider(httpClient, "https://mock.example.api");
const errorData = dataProvider(errorHttpClient, "https://mock.example.api");

const VoteWrapper = ({ children, data }) => (
	<ConfigProvider config={{}}>
		<DataProviderContext.Provider value={{ dataProvider: data }}>
			<AuthContext.Provider
				value={{ currentUser: currentUser, isLoggedIn: true }}
			>
				<ModalProvider>
					<VoteProvider>{children}</VoteProvider>
				</ModalProvider>
			</AuthContext.Provider>
		</DataProviderContext.Provider>
	</ConfigProvider>
);

describe("useVote", () => {
	it("should render correctly", () => {
		const VoteButton = ({
			voteableType,
			voteableId,
			totalUpvote,
			totalDownvote,
		}) => {
			const { totalUpvotes, totalDownvotes, activeVote, voteSide, handleVote } =
				useVote(voteableType, voteableId, totalUpvote, totalDownvote);
			return (
				<>
					<button
						onClick={() => handleVote(true)}
						data-testid="upvote"
					/>
					<button
						onClick={() => handleVote(false)}
						data-testid="downvote"
					/>
					<span>Upvotes : {totalUpvotes}</span>
					<span>Downvotes : {totalDownvotes}</span>
					<span>VoteSide : {voteSide.toString()}</span>
					<span>ActiveVote : {activeVote.toString()}</span>
				</>
			);
		};

		render(
			<VoteWrapper data={data}>
				<VoteButton
					voteableType={vote.voteable_type}
					voteableId={vote.voteable_id}
					totalUpvote={10}
					totalDownvote={5}
				/>
			</VoteWrapper>,
		);

		expect(screen.getByText("Upvotes : 10"));
		expect(screen.getByText("Downvotes : 5"));
		expect(screen.getByText("VoteSide : true"));
		expect(screen.getByText("ActiveVote : false"));
	});

	it("should handle upvote correctly", async () => {
		const VoteButton = ({
			voteableType,
			voteableId,
			totalUpvote,
			totalDownvote,
		}) => {
			const { totalUpvotes, totalDownvotes, activeVote, voteSide, handleVote } =
				useVote(voteableType, voteableId, totalUpvote, totalDownvote);
			return (
				<>
					<button
						onClick={() => handleVote(true)}
						data-testid="upvote"
					/>
					<button
						onClick={() => handleVote(false)}
						data-testid="downvote"
					/>
					<span>Upvotes : {totalUpvotes}</span>
					<span>Downvotes : {totalDownvotes}</span>
					<span>VoteSide : {voteSide.toString()}</span>
					<span>ActiveVote : {activeVote.toString()}</span>
				</>
			);
		};

		const { getByTestId } = render(
			<VoteWrapper data={data}>
				<VoteButton
					voteableType={"message"}
					voteableId={faker.number.int()}
					totalUpvote={10}
					totalDownvote={5}
				/>
			</VoteWrapper>,
		);

		expect(screen.getByText("ActiveVote : false"));

		const upvoteButton = getByTestId("upvote");
		await userEvent.click(upvoteButton);

		expect(screen.getByText("Upvotes : 11"));
		expect(screen.getByText("Downvotes : 5"));
		expect(screen.getByText("VoteSide : true"));
		expect(screen.getByText("ActiveVote : true"));
	});

	it("should handle downvote correctly", async () => {
		const VoteButton = ({
			voteableType,
			voteableId,
			totalUpvote,
			totalDownvote,
		}) => {
			const { totalUpvotes, totalDownvotes, activeVote, voteSide, handleVote } =
				useVote(voteableType, voteableId, totalUpvote, totalDownvote);
			return (
				<>
					<button
						onClick={() => handleVote(true)}
						data-testid="upvote"
					/>
					<button
						onClick={() => handleVote(false)}
						data-testid="downvote"
					/>
					<span>Upvotes : {totalUpvotes}</span>
					<span>Downvotes : {totalDownvotes}</span>
					<span>VoteSide : {voteSide.toString()}</span>
					<span>ActiveVote : {activeVote.toString()}</span>
				</>
			);
		};

		const { getByTestId } = render(
			<VoteWrapper data={data}>
				<VoteButton
					voteableType={"message"}
					voteableId={faker.number.int()}
					totalUpvote={10}
					totalDownvote={5}
				/>
			</VoteWrapper>,
		);

		expect(screen.getByText("ActiveVote : false"));

		const downvoteButton = getByTestId("downvote");
		await userEvent.click(downvoteButton);

		expect(screen.getByText("Upvotes : 10"));
		expect(screen.getByText("Downvotes : 6"));
		expect(screen.getByText("VoteSide : false"));
		expect(screen.getByText("ActiveVote : true"));
	});

	it("should update upvote and then upvote again correctly", async () => {
		const VoteButton = ({
			voteableType,
			voteableId,
			totalUpvote,
			totalDownvote,
		}) => {
			const { totalUpvotes, totalDownvotes, activeVote, voteSide, handleVote } =
				useVote(voteableType, voteableId, totalUpvote, totalDownvote);
			return (
				<>
					<button
						onClick={() => handleVote(true)}
						data-testid="upvote"
					/>
					<button
						onClick={() => handleVote(false)}
						data-testid="downvote"
					/>
					<span>Upvotes : {totalUpvotes}</span>
					<span>Downvotes : {totalDownvotes}</span>
					<span>VoteSide : {voteSide.toString()}</span>
					<span>ActiveVote : {activeVote.toString()}</span>
				</>
			);
		};

		const { getByTestId } = render(
			<VoteWrapper data={data}>
				<VoteButton
					voteableType={"message"}
					voteableId={faker.number.int()}
					totalUpvote={10}
					totalDownvote={5}
				/>
			</VoteWrapper>,
		);

		expect(screen.getByText("ActiveVote : false"));

		const upvoteButton = getByTestId("upvote");
		await userEvent.click(upvoteButton);

		expect(screen.getByText("Upvotes : 11"));
		expect(screen.getByText("Downvotes : 5"));
		expect(screen.getByText("VoteSide : true"));
		expect(screen.getByText("ActiveVote : true"));

		await userEvent.click(upvoteButton);

		expect(screen.getByText("Upvotes : 10"));
		expect(screen.getByText("Downvotes : 5"));
		expect(screen.getByText("VoteSide : true"));
		expect(screen.getByText("ActiveVote : false"));
	});

	it("should not show negative votes if error", async () => {
		const VoteButton = ({
			voteableType,
			voteableId,
			totalUpvote,
			totalDownvote,
		}) => {
			const { totalUpvotes, totalDownvotes, activeVote, voteSide, handleVote } =
				useVote(voteableType, voteableId, totalUpvote, totalDownvote);
			return (
				<>
					<button
						onClick={() => handleVote(true)}
						data-testid="upvote"
					/>
					<button
						onClick={() => handleVote(false)}
						data-testid="downvote"
					/>
					<span>Upvotes : {totalUpvotes}</span>
					<span>Downvotes : {totalDownvotes}</span>
					<span>VoteSide : {voteSide.toString()}</span>
					<span>ActiveVote : {activeVote.toString()}</span>
				</>
			);
		};

		const { getByTestId } = render(
			<VoteWrapper data={errorData}>
				<VoteButton
					voteableType={"message"}
					voteableId={faker.number.int()}
					totalUpvote={0}
					totalDownvote={0}
				/>
			</VoteWrapper>,
		);

		expect(screen.getByText("ActiveVote : false"));

		const upvoteButton = getByTestId("upvote");
		await userEvent.click(upvoteButton);

		expect(screen.getByText("Upvotes : 0"));
		expect(screen.getByText("Downvotes : 0"));
		expect(screen.getByText("VoteSide : true"));
		expect(screen.getByText("ActiveVote : false"));

		await userEvent.click(upvoteButton);

		expect(screen.getByText("Upvotes : 0"));
		expect(screen.getByText("Downvotes : 0"));
		expect(screen.getByText("VoteSide : true"));
		expect(screen.getByText("ActiveVote : false"));
	});

	it("should not reset active vote when VoteContext loads with no existing vote after user has clicked (race condition)", async () => {
		const voteableId = faker.number.int();
		const voteableType = "message";

		// Wrapper with controllable votes context
		const ControllableVoteWrapper = ({ children }) => {
			const [votes, setVotes] = useState({});
			return (
				<ConfigProvider config={{}}>
					<DataProviderContext.Provider value={{ dataProvider: data }}>
						<AuthContext.Provider value={{ currentUser, isLoggedIn: true }}>
							<ModalProvider>
								<VoteContext.Provider value={{ votes, addVoteableIds: vi.fn() }}>
									{children}
									<button
										data-testid="load-empty-votes"
										onClick={() => act(() => setVotes({ [voteableId]: null }))}
									/>
								</VoteContext.Provider>
							</ModalProvider>
						</AuthContext.Provider>
					</DataProviderContext.Provider>
				</ConfigProvider>
			);
		};

		const VoteButton = () => {
			const { totalUpvotes, activeVote, handleVote } = useVote(
				voteableType,
				voteableId,
				10,
				5,
			);
			return (
				<>
					<button onClick={() => handleVote(true)} data-testid="upvote" />
					<span>ActiveVote : {activeVote.toString()}</span>
					<span>Upvotes : {totalUpvotes}</span>
				</>
			);
		};

		const { getByTestId } = render(
			<ControllableVoteWrapper>
				<VoteButton />
			</ControllableVoteWrapper>,
		);

		// User clicks vote before getVotes() has returned
		await userEvent.click(getByTestId("upvote"));
		expect(screen.getByText("ActiveVote : true"));
		expect(screen.getByText("Upvotes : 11"));

		// Simulate getVotes() returning with no existing vote (null)
		await userEvent.click(getByTestId("load-empty-votes"));

		// Vote state must NOT be reset — fix is in effect
		expect(screen.getByText("ActiveVote : true"));
		expect(screen.getByText("Upvotes : 11"));
	});

	it("should initialise vote state from VoteContext when it loads before user interaction", async () => {
		const existingVoteId = faker.number.int();
		const voteableId = faker.number.int();
		const voteableType = "message";
		const existingVote = { id: existingVoteId, is_upvote: true };

		const ControllableVoteWrapper = ({ children }) => {
			const [votes, setVotes] = useState({});
			return (
				<ConfigProvider config={{}}>
					<DataProviderContext.Provider value={{ dataProvider: data }}>
						<AuthContext.Provider value={{ currentUser, isLoggedIn: true }}>
							<ModalProvider>
								<VoteContext.Provider value={{ votes, addVoteableIds: vi.fn() }}>
									{children}
									<button
										data-testid="load-existing-vote"
										onClick={() =>
											act(() => setVotes({ [voteableId]: existingVote }))
										}
									/>
								</VoteContext.Provider>
							</ModalProvider>
						</AuthContext.Provider>
					</DataProviderContext.Provider>
				</ConfigProvider>
			);
		};

		const VoteButton = () => {
			const { totalUpvotes, activeVote, handleVote } = useVote(
				voteableType,
				voteableId,
				10,
				5,
			);
			return (
				<>
					<button onClick={() => handleVote(true)} data-testid="upvote" />
					<span>ActiveVote : {activeVote.toString()}</span>
					<span>Upvotes : {totalUpvotes}</span>
				</>
			);
		};

		const { getByTestId } = render(
			<ControllableVoteWrapper>
				<VoteButton />
			</ControllableVoteWrapper>,
		);

		expect(screen.getByText("ActiveVote : false"));

		// Context loads with existing vote before user interaction
		await userEvent.click(getByTestId("load-existing-vote"));

		// State should be initialised from context
		expect(screen.getByText("ActiveVote : true"));
		expect(screen.getByText("Upvotes : 10")); // no change to count, just status
	});
});
