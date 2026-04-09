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
import { Argument } from "./Argument";

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

const generateArgument = (overrides) => ({
	id: 414,
	content: faker.lorem.sentences(3),
	upvotes: 0,
	group_id: 417,
	is_reply: false,
	created_at: faker.date.recent(),
	is_deleted: false,
	score: 50,
	author: {
		image_url: faker.image.avatarGitHub(),
		full_name: faker.person.fullName(),
		hash_id: faker.lorem.slug(),
		slug: faker.lorem.slug(),
		points: 1320,
		last_activity: new Date(),
		description: faker.person.jobTitle(),
	},
	position: {
		id: 1,
		name: "Yes",
		language: "en",
		translation_entries: [],
	},
	...overrides,
});

const baseArgument = generateArgument();
const longArgument = generateArgument({ content: faker.lorem.sentences(15) });
const argumentReply = generateArgument({
	id: 415,
	is_reply: true,
	reply_to_id: baseArgument.id,
});
const argumentDeleted = generateArgument({ id: 416, is_deleted: true });
const argumentWithReplies = generateArgument({
	id: 417,
	content: faker.lorem.sentences(2),
	number_replies: 3,
	replies_authors: Array.from({ length: 3 }).map(() => ({
		image_url: faker.image.avatarGitHub(),
		full_name: faker.person.fullName(),
	})),
});

const positions = [
	{ id: 1, name: "Yes", language: "en", translation_entries: [] },
	{ id: 2, name: "No", language: "en", translation_entries: [] },
];

const groupName = faker.lorem.sentence(5);

const httpClient = {
	get: () =>
		Promise.resolve({ data: { success: true, data: [argumentReply] } }),
	post: (url) => {
		if (url.includes("vote")) {
			return Promise.resolve({
				data: { success: true, data: { resource: vote } },
			});
		}
		if (url.includes("messages")) {
			return Promise.resolve({
				data: { success: true, data: { resource: argumentReply } },
			});
		}
		return Promise.reject(new Error("Unknown endpoint"));
	},
	patch: () => null,
	delete: () => Promise.resolve({ data: { success: true, data: {} } }),
};

const currentUser = { id: vote.user_id };
const data = dataProvider(httpClient, "https://mock.example.api");

const BaseProviders = ({ children, config }) => (
	<BrowserRouter>
		<ConfigProvider routes={{ ...routes }} config={config}>
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

const getScenarioData = (mode) => {
	switch (mode) {
		case "reply":
			return {
				argument: argumentReply,
				parentArgument: baseArgument,
				nestingLevel: 1,
			};
		case "deleted":
			return { argument: argumentDeleted };
		case "withReplies":
			return { argument: argumentWithReplies };
		case "withArgumentReplies":
			return { argument: baseArgument, argumentReplies: [argumentReply] };
		case "emptyContent":
			return { argument: { ...baseArgument, content: "" } };
		case "rejected":
			return {
				argument: {
					...baseArgument,
					status: "rejected",
					moderation_entry: {
						moderation_reason: faker.lorem.sentence(),
						moderator_notes: faker.lorem.paragraph(),
					},
				},
			};
		default:
			return { argument: baseArgument };
	}
};

const meta = {
	title: "Argument/Argument",
	component: Argument,
	args: {
		mode: "default",
		useLongContent: false,
		expandable: true,
		disableLinks: false,
		disabled: false,
		hideFooter: false,
		enableDeletion: true,
		enableEdition: true,
		hideContent: false,
		showModerationFeedback: false,
	},
	argTypes: {
		mode: {
			control: "select",
			options: [
				"default",
				"reply",
				"deleted",
				"withReplies",
				"withArgumentReplies",
				"emptyContent",
				"rejected",
			],
		},
		useLongContent: { control: "boolean" },
		expandable: { control: "boolean" },
		disableLinks: { control: "boolean" },
		disabled: { control: "boolean" },
		hideFooter: { control: "boolean" },
		enableDeletion: { control: "boolean" },
		enableEdition: { control: "boolean" },
		hideContent: { control: "boolean" },
		showModerationFeedback: { control: "boolean" },
	},
	render: ({ mode, useLongContent, ...args }) => {
		const scenario = getScenarioData(mode);
		const argument =
			useLongContent && mode === "default" ? longArgument : scenario.argument;

		const config =
			mode === "rejected"
				? {
						moderation: { showFeedback: true },
						provider: {
							userGuideUrl: "https://www.example.com/moderation-policy",
						},
					}
				: { translation: { enable: false } };

		return (
			<div style={{ width: "400px", minHeight: "240px" }}>
				<BaseProviders config={config}>
					<Argument
						argument={argument}
						positions={positions}
						groupName={groupName}
						{...scenario}
						{...args}
					/>
				</BaseProviders>
			</div>
		);
	},
};

export default meta;

export const DefaultArgument = {};

export const ArgumentReply = {
	args: { mode: "reply" },
};

export const DeletedArgument = {
	args: { mode: "deleted" },
};

export const ArgumentWithReplies = {
	args: { mode: "withReplies" },
};

export const ArgumentWithArgumentReplies = {
	args: { mode: "withArgumentReplies" },
};

export const RejectedArgument = {
	args: {
		mode: "rejected",
		showModerationFeedback: true,
	},
};
