import { Suggestion } from "@logora/debate/icons/regular_icons";
import React from "react";
import { IntlProvider } from "react-intl";
import { MemoryRouter } from "react-router-dom";
import { InformationBox } from "./InformationBox";

export default {
	title: "Information/Information Box",
	component: InformationBox,
	args: {
		title: "Suggestion",
		points: 100,
		description:
			"Propose debate questions and support user suggestions that you find relevant.",
		textLink: "View suggestions",
		link: "https://example.fr/test/",
		isActive: true,
		withIcon: true,
	},
	argTypes: {
		title: { control: "text" },
		points: { control: "number" },
		description: { control: "text" },
		textLink: { control: "text" },
		link: { control: "text" },
		isActive: { control: "boolean" },
		withIcon: { control: "boolean" },
	},
	render: ({ withIcon, ...args }) => (
		<MemoryRouter>
			<IntlProvider locale="en">
				<InformationBox {...args} icon={withIcon ? <Suggestion /> : null} />
			</IntlProvider>
		</MemoryRouter>
	),
};

export const DefaultInformationBox = {};

export const DefaultInformationBoxWithDisabledModule = {
	args: {
		isActive: false,
	},
};
