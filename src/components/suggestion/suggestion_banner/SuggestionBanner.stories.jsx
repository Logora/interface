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
import { Location } from "@logora/debate/util/location";
import { VoteProvider } from "@logora/debate/vote/vote_provider";
import React from "react";
import { IntlProvider } from "react-intl";
import { MemoryRouter } from "react-router-dom";
import { SuggestionBanner } from "./SuggestionBanner";

const suggestionBannerShowLocation = new Location("espace-debat/suggestions");

const routes = {
	suggestionLocation: suggestionBannerShowLocation,
};

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

const createFakeSuggestion = (id, authorName, suggestionName) => ({
	id,
	name: suggestionName,
	slug: faker.lorem.slug(),
	created_at: faker.date.recent().toISOString(),
	score: faker.number.int(),
	language: faker.helpers.arrayElement(["en", "fr", "es"]),
	is_active: true,
	messages_count: faker.number.int(),
	is_published: false,
	published_at: faker.date.recent().toISOString(),
	debate_suggestion: {
		id: faker.number.int(),
		created_at: faker.date.recent().toISOString(),
		expires_at: faker.date.future().toISOString(),
		total_upvotes: 20,
		total_downvotes: faker.number.int({ min: 0, max: 100 }),
		is_accepted: false,
		is_expired: false,
		author: {
			id: faker.number.int(),
			full_name: authorName,
			image_url: faker.image.avatarGitHub(),
		},
		language: faker.helpers.arrayElement(["en", "fr", "es"]),
		translation_entries: [],
		name: faker.lorem.words(),
	},
});

const baseSuggestions = [
	createFakeSuggestion(1, "First Author", "First Suggestion"),
	createFakeSuggestion(2, "Second Author", "Second Suggestion"),
];

const Providers = ({ children, suggestions }) => {
	const httpClient = {
		get: () => Promise.resolve({ data: { success: true, data: suggestions } }),
		post: () =>
			Promise.resolve({ data: { success: true, data: { resource: vote } } }),
	};

	const data = dataProvider(httpClient, "https://mock.example.api");

	return (
		<MemoryRouter>
			<ConfigProvider config={{}} routes={{ ...routes }}>
				<DataProviderContext.Provider value={{ dataProvider: data }}>
					<AuthContext.Provider value={{ currentUser, isLoggedIn: true }}>
						<ResponsiveProvider>
							<ModalProvider>
								<ListProvider>
									<ToastProvider>
										<VoteProvider>
											<IntlProvider locale="en">{children}</IntlProvider>
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
};

export default {
	title: "Suggestion/Suggestion Banner",
	component: SuggestionBanner,
	args: {
		suggestions: baseSuggestions,
	},
	argTypes: {
		suggestions: { control: "object" },
	},
	render: (args) => (
		<Providers suggestions={args.suggestions}>
			<SuggestionBanner />
		</Providers>
	),
};

export const DefaultSuggestionBanner = {};

export const EmptySuggestionBanner = {
	args: {
		suggestions: [],
	},
};
