import React from "react";
import { IntlProvider } from "react-intl";
import { KeywordBox } from "./KeywordBox";

const defaultArgs = {
	keyword: "Politics",
	occurrences: 879,
	color: "#FBC62F",
	handleClick: () => console.log("DO SOMETHING"),
};

export default {
	title: "Summary/Keyword Box",
	component: KeywordBox,
	args: defaultArgs,
	argTypes: {
		keyword: { control: "text" },
		occurrences: { control: "number" },
		color: { control: "color" },
		handleClick: { control: false },
	},
	render: (args) => (
		<IntlProvider locale="en">
			<KeywordBox {...args} />
		</IntlProvider>
	),
};

export const DefaultKeywordBox = {};

export const KeywordBoxRed = {
	args: {
		keyword: "Sports",
		occurrences: 475,
		color: "red",
	},
};

export const KeywordBoxPurple = {
	args: {
		keyword: "Medical",
		occurrences: 321,
		color: "purple",
	},
};
