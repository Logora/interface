import { faker } from "@faker-js/faker";
import { ResponsiveProvider } from "@logora/debate/hooks/use_responsive";
import React from "react";
import { IntlProvider } from "react-intl";
import { Summary } from "./Summary";
import styles from "./Summary.module.scss";

const tags = Array.from({ length: 3 }, () => ({
	id: faker.string.uuid(),
	name: faker.lorem.word(),
}));

const summaryWithTags = {
	[tags[0].id]: faker.lorem.sentences(3),
	[tags[1].id]: faker.lorem.sentences(2),
	[tags[2].id]: faker.lorem.sentences(4),
};

export default {
	title: "Summary/Summary",
	component: Summary,
	args: {
		title: "Summary",
		subtitle: "this is a summary",
	},
};

const Template = (args) => (
	<ResponsiveProvider>
		<IntlProvider locale="en">
			<Summary {...args} />
		</IntlProvider>
	</ResponsiveProvider>
);

export const SummaryWithTags = {
	render: Template,
	args: {
		summary: summaryWithTags,
		tags: tags,
		tagClassNames: tags.map(() => styles.tag),
	},
};

export const SummaryWithoutTags = {
	render: Template,
	args: {
		summary: { global: faker.lorem.sentences(3) },
		tags: [],
		tagClassNames: [],
	},
};