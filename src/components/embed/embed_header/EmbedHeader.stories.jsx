import { faker } from "@faker-js/faker";
import React from "react";
import { IntlProvider } from "react-intl";
import { EmbedHeader } from "./EmbedHeader";

export default {
	title: "Embed/Embed Header",
	component: EmbedHeader,
	args: {
		title: "How to prevent COVID-19 spread ?",
		titleRedirectUrl: "https://test.fr/",
		onlineUsersCount: 273,
		headerLabel: "Medicine",
		textLeft: false,
		logoUrl: null,
		logoAlt: "Super logo",
	},
	argTypes: {
		title: {
			control: "text",
		},
		titleRedirectUrl: {
			control: "text",
		},
		onlineUsersCount: {
			control: "number",
		},
		headerLabel: {
			control: "text",
		},
		textLeft: {
			control: "boolean",
		},
		logoUrl: {
			control: "text",
		},
		logoAlt: {
			control: "text",
		},
	},
	render: (args) => (
		<IntlProvider locale="en">
			<EmbedHeader {...args} />
		</IntlProvider>
	),
};

export const DefaultEmbedHeader = {};

export const EmbedHeaderWithLogo = {
	args: {
		logoUrl: faker.image.url(),
	},
};
