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
import { InputProvider } from "@logora/debate/input/input_provider";
import { ListProvider } from "@logora/debate/list/list_provider";
import { render } from "@testing-library/react";
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
	post: () => {
		return new Promise((resolve) => {
			resolve({ data: { success: true, data: {} } });
		});
	},
};

const data = dataProvider(httpClient, "https://mock.example.api");

const Providers = ({ children }) => (
	<BrowserRouter>
		<ConfigProvider>
			<IconProvider library={regularIcons}>
				<IntlProvider locale="en">
					<DataProviderContext.Provider value={{ dataProvider: data }}>
						<AuthContext.Provider
							value={{ currentUser: currentUser, isLoggedIn: true }}
						>
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
			</IconProvider>
		</ConfigProvider>
	</BrowserRouter>
);

const renderSuggestionInput = () =>
	render(
		<Providers>
			<SuggestionInput />
		</Providers>,
	);

describe("SuggestionInput", () => {
	it("renders the title and input correctly", () => {
		const { getByText, getByPlaceholderText } = renderSuggestionInput();

		expect(getByText("Your suggestion")).toBeInTheDocument();
		expect(
			getByPlaceholderText("Suggest a debate question"),
		).toBeInTheDocument();
	});

	it("should render the submit button correctly", () => {
		const { getByText } = renderSuggestionInput();
		const button = getByText("Submit");
		expect(button).toBeInTheDocument();
	});
});
