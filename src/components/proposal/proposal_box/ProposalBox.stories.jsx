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
import { InputProvider } from "@logora/debate/input/input_provider";
import { ListProvider } from "@logora/debate/list/list_provider";
import { Location } from "@logora/debate/util/location";
import { VoteProvider } from "@logora/debate/vote/vote_provider";
import React from "react";
import { IntlProvider } from "react-intl";
import { BrowserRouter } from "react-router-dom";
import { ProposalBox } from "./ProposalBox";

const routes = {
	userShowLocation: new Location("espace-debat/user/:userSlug", {
		userSlug: "",
	}),
};

const vote = {
	id: faker.number.int(),
	voteable_type: faker.lorem.word(),
	voteable_id: faker.number.int(),
	user_id: faker.number.int(),
};

const httpClient = {
	get: () => Promise.resolve({ data: { success: true, data: [] } }),
	post: () =>
		Promise.resolve({ data: { success: true, data: { resource: vote } } }),
	patch: () => null,
	delete: () => Promise.resolve({ data: { success: true, data: {} } }),
};

const currentUser = { id: vote.user_id };
const data = dataProvider(httpClient, "https://mock.example.api");

const generateProposal = (overrides = {}) => ({
	id: faker.number.int(),
	title: faker.lorem.sentence(),
	content: faker.lorem.paragraphs(2),
	created_at: faker.date.recent(),
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
	...overrides,
});

const proposal = generateProposal();
const longProposal = generateProposal({
	content: faker.lorem.paragraphs(5),
	title: faker.lorem.sentences(2),
});
const editedProposal = generateProposal({ edited_at: faker.date.recent() });
const proposalWithTag = generateProposal({
	tag: {
		display_name: faker.lorem.word(),
		color: faker.color.rgb(),
	},
});
const authoredProposal = generateProposal({
	author: {
		id: currentUser.id,
		image_url: faker.image.avatarGitHub(),
		full_name: faker.person.fullName(),
		hash_id: faker.lorem.slug(),
		slug: faker.lorem.slug(),
		points: faker.number.int(5000),
		last_activity: new Date(),
		description: faker.person.jobTitle(),
	},
});

const Providers = ({ children }) => (
	<BrowserRouter>
		<ConfigProvider
			routes={{ ...routes }}
			config={{ translation: { enable: true } }}
		>
			<DataProviderContext.Provider value={{ dataProvider: data }}>
				<AuthContext.Provider value={{ currentUser, isLoggedIn: true }}>
					<ResponsiveProvider>
						<ModalProvider>
							<ListProvider>
								<ToastProvider>
									<VoteProvider>
										<InputProvider>
											<IntlProvider locale="en">{children}</IntlProvider>
										</InputProvider>
									</VoteProvider>
								</ToastProvider>
							</ListProvider>
						</ModalProvider>
					</ResponsiveProvider>
				</AuthContext.Provider>
			</DataProviderContext.Provider>
		</ConfigProvider>
	</BrowserRouter>
);

export default {
	title: "Proposal/Proposal Box",
	component: ProposalBox,
	argTypes: {
		proposal: { control: "object" },
		containerWidth: { control: "text" },
		containerHeight: { control: "text" },
	},
	args: {
		proposal,
		containerWidth: "400px",
		containerHeight: "240px",
	},
	render: ({ containerWidth, containerHeight, ...args }) => (
		<div style={{ width: containerWidth, height: containerHeight }}>
			<Providers>
				<ProposalBox {...args} />
			</Providers>
		</div>
	),
};

export const DefaultProposal = {};

export const LongProposal = {
	args: {
		proposal: longProposal,
		containerHeight: "auto",
	},
};

export const EditedProposal = {
	args: {
		proposal: editedProposal,
	},
};

export const ProposalWithTag = {
	args: {
		proposal: proposalWithTag,
	},
};

export const OwnProposal = {
	args: {
		proposal: authoredProposal,
	},
};
