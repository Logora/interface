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
import { SuggestionInput } from "./SuggestionInput";

const currentUser = {
	id: faker.number.int(),
	full_name: faker.person.fullName(),
	image_url: faker.image.avatarGitHub(),
	points: faker.number.int(),
};

const httpClient = {
	post: () => Promise.resolve({ data: { success: true, data: {} } }),
};

const data = dataProvider(httpClient, "https://mock.example.api");

export default {
	title: "Suggestion/Suggestion Input",
	component: SuggestionInput,
	argTypes: {
		disabled: { control: "boolean" },
		maxLength: { control: "number" },
		userGuideUrl: { control: "text" },
	},
	render: (args) => (
		<BrowserRouter>
			<ConfigProvider>
				<IntlProvider locale="en">
					<DataProviderContext.Provider value={{ dataProvider: data }}>
						<AuthContext.Provider value={{ currentUser, isLoggedIn: true }}>
							<ToastProvider>
								<ModalProvider>
									<ListProvider>
										<InputProvider>
											<SuggestionInput {...args} />
										</InputProvider>
									</ListProvider>
								</ModalProvider>
							</ToastProvider>
						</AuthContext.Provider>
					</DataProviderContext.Provider>
				</IntlProvider>
			</ConfigProvider>
		</BrowserRouter>
	),
};

export const DefaultSuggestionInput = {
	args: {
		disabled: false,
	},
};

export const DisabledSuggestionInput = {
	args: {
		disabled: true,
	},
};

export const SuggestionInputMaxLength = {
	args: {
		disabled: true,
		maxLength: 30,
	},
};

export const SuggestionInputWithUserGuideUrl = {
	args: {
		disabled: true,
		maxLength: 30,
		userGuideUrl: "https://example.com/user-guide",
	},
};
