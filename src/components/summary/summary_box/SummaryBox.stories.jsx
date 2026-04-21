import { faker } from "@faker-js/faker";
import React from "react";
import { SummaryBox } from "./SummaryBox";
import styles from "./SummaryBoxComposition.module.scss";

const generateItems = (count = 5) =>
	Array.from({ length: count }, () => faker.lorem.sentence());

const defaultArgs = {
	summaryItems: generateItems(),
	tag: "Yes",
	tagClassName: undefined,
	emptySummaryText: "",
};

export default {
	title: "Summary/Summary Box",
	component: SummaryBox,
	args: defaultArgs,
	argTypes: {
		summaryItems: { control: "object" },
		tag: { control: "text" },
		tagClassName: { control: "text" },
		emptySummaryText: { control: "text" },
	},
};

export const DefaultSummaryBox = {};

export const SummaryBoxRed = {
	args: {
		tagClassName: styles.darksalmon,
		tag: "No",
	},
};

export const SummaryBoxWithoutTag = {
	args: {
		tag: undefined,
	},
};

export const SummaryBoxEmpty = {
	args: {
		summaryItems: [],
		tag: undefined,
		emptySummaryText: "No elements found",
	},
};

export const SummaryBoxEmptyWithTag = {
	args: {
		summaryItems: [],
		emptySummaryText: "No elements found",
		tag: "tag",
	},
};
