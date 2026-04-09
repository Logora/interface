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
import { IconProvider } from "@logora/debate/icons/icon_provider";
import * as regularIcons from "@logora/debate/icons/regular_icons";
import { ListProvider } from "@logora/debate/list/list_provider";
import { VoteProvider } from "@logora/debate/vote/vote_provider";
import { fireEvent, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { IntlProvider } from "react-intl";
import { MemoryRouter } from "react-router-dom";
import { SuggestionBox } from "./SuggestionBox";

const vote = {
	id: faker.number.int(),
	voteable_type: faker.lorem.word(),
	voteable_id: faker.number.int(),
	user_id: faker.number.int(),
};

const currentUser = {
	id: faker.number.int(),
	full_name: faker.person.fullName(),
	image_url: faker.image.avatarGitHub(),
	points: faker.number.int(),
};

const generateSuggestion = (groupOverrides, suggestionOverrides) => ({
	id: faker.number.int(),
	name: faker.lorem.words(),
	slug: faker.lorem.slug(),
	created_at: faker.date.recent().toISOString(),
	score: faker.number.int(),
	language: faker.helpers.arrayElement(["en", "fr", "es"]),
	is_active: true,
	messages_count: faker.number.int(),
	is_published: true,
	published_at: faker.date.recent().toISOString(),
	debate_suggestion: {
		id: faker.number.int(),
		created_at: faker.date.recent().toISOString(),
		expires_at: faker.date.future().toISOString(),
		total_upvotes: 20,
		total_downvotes: faker.number.int({ min: 0, max: 100 }),
		is_accepted: false,
		is_expired: false,
		is_published: faker.datatype.boolean(),
		author: {
			id: faker.number.int(),
			full_name: faker.person.fullName(),
			image_url: faker.image.avatarGitHub(),
		},
		language: faker.helpers.arrayElement(["en", "fr", "es"]),
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
	post: vi.fn(() =>
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
		expect(
			getByText(suggestion.debate_suggestion.author.full_name),
		).toBeInTheDocument();
		expect(
			getByText(`${suggestion.debate_suggestion.total_upvotes} supports`),
		).toBeInTheDocument();
	});

	it("should disable SuggestionBox correctly", () => {
		const { getByText } = renderSuggestionBox({ suggestion, disabled: true });

		expect(getByText(suggestion.name)).toBeInTheDocument();
		expect(
			getByText(suggestion.debate_suggestion.author.full_name),
		).toBeInTheDocument();
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
		expect(
			getByText(publishedSuggestion.debate_suggestion.author.full_name),
		).toBeInTheDocument();
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
