import React from "react";
import { IntlProvider } from "react-intl";
import { ProgressBar } from "./ProgressBar";

export default {
	title: "Progress/Progress Bar",
	component: ProgressBar,
	args: {
		progress: 25,
		goal: 100,
		title: "",
		showPercentageSubtitle: false,
		showProgressSubtitle: false,
		barFull: false,
		progressUnit: "votes",
		content: "Nice progress !",
	},
	argTypes: {
		progress: { control: "number" },
		goal: { control: "number" },
		title: { control: "text" },
		showPercentageSubtitle: { control: "boolean" },
		showProgressSubtitle: { control: "boolean" },
		barFull: { control: "boolean" },
		progressUnit: { control: "text" },
		content: { control: "text" },
	},
	render: ({ content, ...args }) => (
		<IntlProvider locale="en">
			<ProgressBar {...args}>{content || null}</ProgressBar>
		</IntlProvider>
	),
};

export const DefaultProgressBar = {};

export const FullBar = {
	args: {
		progress: 100,
		barFull: true,
		showProgressSubtitle: true,
	},
};
