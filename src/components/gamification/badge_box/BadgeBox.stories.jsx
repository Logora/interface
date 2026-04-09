import { faker } from "@faker-js/faker";
import React from "react";
import { IntlProvider } from "react-intl";
import { BadgeBox } from "./BadgeBox";

const badge = {
	icon_url: faker.image.avatarGitHub(),
	level: 2,
	name: faker.person.jobTitle(),
	next_title_level: 3,
	steps: 20,
	title: faker.person.jobTitle(),
	progress: 6,
};

const badgeCompleted = {
	icon_url: faker.image.avatarGitHub(),
	level: 3,
	name: faker.person.jobTitle(),
	next_title_level: 3,
	steps: 13,
	title: faker.person.jobTitle(),
	progress: 13,
};

export default {
	title: "Gamification/Badge Box",
	component: BadgeBox,
	args: {
		eloquenceTitle: "",
		...badge,
	},
	argTypes: {
		eloquenceTitle: { control: "text" },
		icon_url: { control: "text" },
		level: { control: "number" },
		name: { control: "text" },
		next_title_level: { control: "number" },
		steps: { control: "number" },
		title: { control: "text" },
		progress: { control: "number" },
	},
	render: (args) => (
		<IntlProvider locale="en">
			<BadgeBox {...args} />
		</IntlProvider>
	),
};

export const DefaultBadgeBox = {};

export const TitleShownBadgeBox = {
	args: {
		...badgeCompleted,
		eloquenceTitle: badgeCompleted.name,
	},
};

export const TitleObtainedBadgeBox = {
	args: {
		...badgeCompleted,
		eloquenceTitle: "",
	},
};
