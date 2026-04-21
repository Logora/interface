import React from "react";
import { ArgumentSummaryBox } from "./ArgumentSummaryBox";

const defaultArgs = {
	label: "Recurrence of the argument",
	text: '1. The term "Chocolatine" is more familiar and easier to pronounce for French speakers.',
	gauge: 3,
	color: "navy",
	tag: "Yes",
};

export default {
	title: "Summary/Argument Summary Box",
	component: ArgumentSummaryBox,
	args: defaultArgs,
	argTypes: {
		label: { control: "text" },
		text: { control: "text" },
		gauge: { control: { type: "number", min: 0, max: 5, step: 1 } },
		color: { control: "color" },
		tag: { control: "text" },
	},
};

export const DefaultArgumentSummaryBox = {};

export const ArgumentSummaryBoxRed = {
	args: {
		color: "darksalmon",
		gauge: 4,
		tag: "No",
	},
};

export const FullGaugeArgumentSummaryBox = {
	args: {
		gauge: 5,
		color: "blue",
		tag: "Maybe",
	},
};

export const EmptyGaugeArgumentSummaryBox = {
	args: {
		gauge: 0,
		color: "blue",
		tag: "Of course",
	},
};
