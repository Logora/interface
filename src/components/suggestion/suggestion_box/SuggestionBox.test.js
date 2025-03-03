import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IntlProvider } from "react-intl";
import { MemoryRouter } from "react-router-dom";
import { ConfigProvider } from "@logora/debate.data.config_provider";
import {
	dataProvider,
	DataProviderContext,
} from "@logora/debate.data.data_provider";
import { AuthContext } from "@logora/debate.auth.use_auth";
import { ModalProvider } from "@logora/debate.dialog.modal";
import { ListProvider } from "@logora/debate.list.list_provider";
import { ToastProvider } from "@logora/debate.dialog.toast_provider";
import { VoteProvider } from "@logora/debate.vote.vote_provider";
import { IconProvider } from "@logora/debate.icons.icon_provider";
import { ResponsiveProvider } from "@logora/debate.hooks.use_responsive";
import * as regularIcons from "@logora/debate.icons.regular_icons";
import { SuggestionBox } from "./SuggestionBox";
import { faker } from "@faker-js/faker";

const vote = {
	id: faker.datatype.number(),
	voteable_type: faker.lorem.word(),
	voteable_id: faker.datatype.number(),
	user_id: faker.datatype.number(),
};

const currentUser = {
	id: faker.datatype.number(),
	full_name: faker.name.fullName(),
	image_url: faker.image.avatar(),
	points: faker.datatype.number(),
};

const generateSuggestion = (groupOverrides, suggestionOverrides) => ({
	id: faker.datatype.number(),
	name: faker.lorem.words(),
	slug: faker.lorem.slug(),
	created_at: faker.date.recent().toISOString(),
	score: faker.datatype.number(),
	language: faker.random.locale(),
	is_active: true,
	messages_count: faker.datatype.number(),
	is_published: true,
	published_at: faker.date.recent().toISOString(),
	debate_suggestion: {
		id: faker.datatype.number(),
		created_at: faker.date.recent().toISOString(),
		expires_at: faker.date.future().toISOString(),
		total_upvotes: 20,
		total_downvotes: faker.datatype.number({ min: 0, max: 100 }),
		is_accepted: false,
		is_expired: false,
		is_published: faker.datatype.boolean(),
		author: {
			id: faker.datatype.number(),
			full_name: faker.name.fullName(),
			image_url: faker.image.avatar(),
		},
		language: faker.random.locale(),
		translation_entries: [],
		name: faker.lorem.words(),
		...suggestionOverrides,
	},
	...groupOverrides,
});
const suggestion = generateSuggestion();

const config = {
	modules: {
		suggestions: {
			vote_goal: 30,
		},
	},
};

const httpClient = {
	post: jest.fn(() =>
		Promise.resolve({ data: { success: true, data: { resource: vote } } }),
	),
};

const data = dataProvider(httpClient, "https://mock.example.api");

const routes = {
	debateShowLocation: {
		toUrl: ({ debateSlug }) => `/espace-debat/group/${debateSlug}`,
	},
};

const Providers = ({ children }) => (
	<MemoryRouter>
		<ConfigProvider config={{ config }} routes={{ ...routes }}>
			<DataProviderContext.Provider value={{ dataProvider: data }}>
				<AuthContext.Provider value={{ currentUser, isLoggedIn: true }}>
					<ResponsiveProvider>
						<ModalProvider>
							<ListProvider>
								<ToastProvider>
									<VoteProvider>
										<IntlProvider locale="en">
											<IconProvider library={regularIcons}>
												{children}
											</IconProvider>
										</IntlProvider>
									</VoteProvider>
								</ToastProvider>
							</ListProvider>
						</ModalProvider>
					</ResponsiveProvider>
				</AuthContext.Provider>
			</DataProviderContext.Provider>
		</ConfigProvider>
	</MemoryRouter>
);

const renderSuggestionBox = (props) =>
	render(
		<Providers>
			<SuggestionBox {...props} />
		</Providers>,
	);

describe("SuggestionBox", () => {
	it("should render SuggestionBox correctly", () => {
		const { getByText } = renderSuggestionBox({ suggestion, disabled: false });

		expect(getByText(suggestion.name)).toBeInTheDocument();
		expect(getByText(suggestion.debate_suggestion.author.full_name)).toBeInTheDocument();
		expect(
			getByText(`${suggestion.debate_suggestion.total_upvotes} supports`),
		).toBeInTheDocument();
	});

	it("should disable SuggestionBox correctly", () => {
		const { getByText } = renderSuggestionBox({ suggestion, disabled: true });

		expect(getByText(suggestion.name)).toBeInTheDocument();
		expect(getByText(suggestion.debate_suggestion.author.full_name)).toBeInTheDocument();
		expect(
			getByText(`${suggestion.debate_suggestion.total_upvotes} supports`),
		).toBeInTheDocument();
	});

	// Cas d'une suggestion publiée
	it("should render published SuggestionBox correctly", () => {
		const publishedSuggestion = generateSuggestion(
			{ is_published: true },
			{
				is_accepted: true,
				is_expired: false,
			},
		);
		const { getByText } = renderSuggestionBox({
			suggestion: publishedSuggestion,
			disabled: false,
		});
		expect(getByText(publishedSuggestion.name)).toBeInTheDocument();
		expect(getByText(publishedSuggestion.debate_suggestion.author.full_name)).toBeInTheDocument();
		expect(getByText(/Go to debate/)).toBeInTheDocument();
	});

	// Cas où on vote: le nombre de personnes intéressées est correct
	it("should update totalUpvotes when voting", async () => {
		const suggestionVote = generateSuggestion(
			{ is_published: false },
			{
				is_accepted: false,
				is_expired: false,
				total_upvotes: 6,
				total_downvotes: 5,
			},
		);
		const { getByText, getByTestId } = renderSuggestionBox({
			suggestion: suggestionVote,
			disabled: false,
		});
		const upvoteButton = getByTestId("upvote-icon");

		await userEvent.click(upvoteButton);
		expect(getByText("7 supports")).toBeInTheDocument();
	});
});
