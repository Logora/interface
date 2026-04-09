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
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { IntlProvider } from "react-intl";
import { MemoryRouter } from "react-router-dom";
import { ProposalBox } from "./ProposalBox";

vi.mock("@lexical/react/LexicalErrorBoundary", () => ({
	LexicalErrorBoundary: ({ children }) => children,
}));

// Mock data
const vote = {
	id: faker.number.int(),
	voteable_type: faker.lorem.word(),
	voteable_id: faker.number.int(),
	user_id: faker.number.int(),
};

const currentUser = {
	id: vote.user_id,
	full_name: faker.person.fullName(),
	image_url: faker.image.avatarGitHub(),
	points: faker.number.int(),
};

const generateProposal = (overrides) => ({
	id: faker.number.int(),
	title: faker.lorem.sentence(),
	content: faker.lorem.paragraph(),
	created_at: faker.date.recent().toISOString(),
	edited_at: null,
	total_upvotes: faker.number.int(100),
	total_downvotes: faker.number.int(50),
	language: "en",
	translation_entries: [],
	author: {
		id: faker.number.int(),
		image_url: faker.image.avatarGitHub(),
		full_name: faker.person.fullName(),
		hash_id: faker.lorem.slug(),
		slug: faker.lorem.slug(),
		points: faker.number.int(5000),
		last_activity: new Date(),
		description: faker.person.jobTitle(),
	},
	tag: {
		display_name: faker.lorem.word(),
		color: faker.color.rgb(),
	},
	...overrides,
});

const proposal = generateProposal();
const editedProposal = generateProposal({
	edited_at: faker.date.recent().toISOString(),
	is_edited: true,
});

const httpClient = {
	post: vi.fn(() =>
		Promise.resolve({ data: { success: true, data: { resource: vote } } }),
	),
	delete: vi.fn(() => Promise.resolve({ data: { success: true, data: {} } })),
};

const data = dataProvider(httpClient, "https://mock.example.api");

const routes = {
	userShowLocation: {
		toUrl: ({ userSlug }) => `/espace-debat/user/${userSlug}`,
	},
};

const Providers = ({ children }) => (
	<MemoryRouter>
		<ConfigProvider
			config={{ translation: { enable: false } }}
			routes={{ ...routes }}
		>
			<DataProviderContext.Provider value={{ dataProvider: data }}>
				<AuthContext.Provider value={{ currentUser, isLoggedIn: true }}>
					<ResponsiveProvider>
						<ModalProvider>
							<ListProvider>
								<ToastProvider>
									<VoteProvider>
										<IconProvider library={regularIcons}>
											<IntlProvider locale="en">{children}</IntlProvider>
										</IconProvider>
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

const renderProposal = (props) =>
	render(
		<Providers>
			<ProposalBox {...props} />
		</Providers>,
	);

describe("ProposalBox", () => {
	it("should render ProposalBox correctly", () => {
		const { getByText } = renderProposal({ proposal, disabled: false });

		expect(getByText(proposal.title)).toBeInTheDocument();
		expect(getByText(proposal.author.full_name)).toBeInTheDocument();
		expect(getByText(proposal.tag.display_name)).toBeInTheDocument();
	});

	it("should show edited status when proposal was edited", () => {
		const { getByText } = renderProposal({ proposal: editedProposal });
		expect(getByText("Updated proposal")).toBeInTheDocument();
	});

	it("should disable voting when current user is author", () => {
		const authorProposal = generateProposal({ author: currentUser });
		renderProposal({ proposal: authorProposal });

		const upvoteButton = screen.getByTestId("upvote-button");
		const downvoteButton = screen.getByTestId("downvote-button");

		expect(upvoteButton).toHaveClass("disabled");
		expect(downvoteButton).toHaveClass("disabled");
	});
});
