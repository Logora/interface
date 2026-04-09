import { faker } from "@faker-js/faker";
import { AuthContext } from "@logora/debate/auth/use_auth";
import { ConfigProvider } from "@logora/debate/data/config_provider";
import {
	DataProviderContext,
	dataProvider,
} from "@logora/debate/data/data_provider";
import { ModalProvider } from "@logora/debate/dialog/modal";
import { ToastProvider } from "@logora/debate/dialog/toast_provider";
import { InputProvider } from "@logora/debate/input/input_provider";
import { ListProvider } from "@logora/debate/list/list_provider";
import React from "react";
import { IntlProvider } from "react-intl";
import { BrowserRouter } from "react-router-dom";
import { ArgumentInput } from "./ArgumentInput";

const vote = {
	id: faker.number.int(),
	voteable_type: faker.lorem.word(),
	voteable_id: faker.number.int(),
	user_id: faker.number.int(),
};

const httpClient = {
	get: () => null,
	post: () =>
		Promise.resolve({ data: { success: true, data: { resource: vote } } }),
	patch: () => null,
	delete: () => Promise.resolve({ data: { success: true, data: {} } }),
};

const data = dataProvider(httpClient, "https://mock.example.api");

const debate = {
	id: faker.number.int(),
	name: faker.lorem.word(),
	positions: [
		{
			id: faker.number.int(),
			name: faker.lorem.word(),
		},
		{
			id: faker.number.int(),
			name: faker.lorem.word(),
		},
	],
};

const currentUser = {
	id: faker.number.int(),
	full_name: faker.person.fullName(),
	image_url: faker.image.avatarGitHub(),
	points: faker.number.int(),
};

const defaultArgs = {
	onSubmit: () => {},
	groupId: debate.id,
	groupName: debate.name,
	positions: debate.positions,
	disabledPositions: [],
	listId: "argumentList",
	positionId: debate.positions[0].id,
	hideSourceAction: false,
	avatarSize: 48,
	placeholder: "Add an argument...",
	disabled: false,
	isReply: false,
	focusOnInit: false,
	userGuideUrl: "",
};

const Providers = ({ children, isLoggedIn = true, config = {} }) => (
	<BrowserRouter>
		<ConfigProvider config={config}>
			<IntlProvider locale="en">
				<DataProviderContext.Provider value={{ dataProvider: data }}>
					<AuthContext.Provider value={{ currentUser, isLoggedIn }}>
						<ToastProvider>
							<ModalProvider>
								<ListProvider>
									<InputProvider>{children}</InputProvider>
								</ListProvider>
							</ModalProvider>
						</ToastProvider>
					</AuthContext.Provider>
				</DataProviderContext.Provider>
			</IntlProvider>
		</ConfigProvider>
	</BrowserRouter>
);

export default {
	title: "Input/Argument Input",
	component: ArgumentInput,
	args: defaultArgs,
	argTypes: {
		disabled: { control: "boolean" },
		isReply: { control: "boolean" },
		hideSourceAction: { control: "boolean" },
		focusOnInit: { control: "boolean" },
		avatarSize: { control: { type: "number", min: 24, max: 80, step: 2 } },
		placeholder: { control: "text" },
		userGuideUrl: { control: "text" },
		maxLength: { control: "number" },
		positions: { control: "object" },
		disabledPositions: { control: "object" },
		onSubmit: { control: false },
	},
	render: (args) => (
		<Providers>
			<ArgumentInput {...args} />
		</Providers>
	),
};

export const DefaultArgumentInput = {};

export const ReplyArgumentInput = {
	args: {
		isReply: true,
		avatarSize: 40,
		placeholder: "Your reply...",
	},
};

export const ArgumentInputWithoutSourceAction = {
	args: {
		hideSourceAction: true,
	},
};

export const ArgumentInputDisabled = {
	args: {
		disabled: true,
		hideSourceAction: true,
	},
};

export const ArgumentPositionDisabled = {
	args: {
		disabledPositions: [
			{ id: debate.positions[0].id, name: debate.positions[0].name },
		],
		hideSourceAction: true,
	},
};

export const DisabledArgumentInputForVisitors = {
	render: (args) => (
		<Providers
			isLoggedIn={false}
			config={{
				actions: { disableInputForVisitor: true },
				auth: { type: "social" },
			}}
		>
			<ArgumentInput {...args} />
		</Providers>
	),
};

export const FocusOnInitArgumentInput = {
	args: {
		focusOnInit: true,
		hideSourceAction: true,
	},
};

export const ArgumentInputWithoutPositions = {
	args: {
		positions: [],
		positionId: null,
	},
};

export const ArgumentInputWithGuideMessageLink = {
	args: {
		userGuideUrl: "https://example.com/user-guide",
	},
};

export const ArgumentInputWithTooltipOnSourcesButton = {
	render: (args) => (
		<Providers config={{ allowed_sources: ["https://yes.com"] }}>
			<ArgumentInput {...args} />
		</Providers>
	),
};
