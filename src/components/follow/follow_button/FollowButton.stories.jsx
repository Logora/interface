import { AuthProvider } from "@logora/debate/auth/use_auth";
import { ConfigContext } from "@logora/debate/data/config_provider";
import {
	DataProviderContext,
	dataProvider,
} from "@logora/debate/data/data_provider";
import { ModalProvider } from "@logora/debate/dialog/modal";
import React from "react";
import { IntlProvider } from "react-intl";
import { MemoryRouter } from "react-router-dom";
import { FollowButton } from "./FollowButton";

const httpClient = {};
const data = dataProvider(httpClient, "https://mock.example.api");
const config = { auth: { disableLoginModal: false } };

export default {
	title: "Follow/Follow Button",
	component: FollowButton,
	args: {
		followableType: "content",
		followableId: 12,
		tooltipText: "Tooltip content",
		dataTid: "data-tid",
		noBorder: false,
	},
	argTypes: {
		followableType: { control: "text" },
		followableId: { control: "number" },
		tooltipText: { control: "text" },
		dataTid: { control: "text" },
		noBorder: { control: "boolean" },
	},
	render: (args) => (
		<MemoryRouter>
			<IntlProvider locale="en">
				<DataProviderContext.Provider value={{ dataProvider: data }}>
					<AuthProvider>
						<ConfigContext.Provider value={{ config }}>
							<ModalProvider>
								<FollowButton {...args} />
							</ModalProvider>
						</ConfigContext.Provider>
					</AuthProvider>
				</DataProviderContext.Provider>
			</IntlProvider>
		</MemoryRouter>
	),
};

export const DefaultFollowButton = {};

export const FollowButtonNoBorder = {
	args: {
		noBorder: true,
	},
};
