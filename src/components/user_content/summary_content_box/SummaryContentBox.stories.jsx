export default {
	title: "User Content/Summary Content Box",
	component: SummaryContentBox,
	args: {
		tag: "Position",
		date: new Date(),
		title: "",
		contentCount: 0,
		tagClassName: "",
		headerOneLine: false,
		showFooter: false,
		language: "",
		lineCount: undefined,
		translationEntries: [],
	},
	argTypes: {
		tag: { control: "text" },
		date: { control: "date" },
		title: { control: "text" },
		contentCount: { control: "number" },
		tagClassName: { control: "text" },
		headerOneLine: { control: "boolean" },
		showFooter: { control: "boolean" },
		language: { control: "text" },
		lineCount: { control: "number" },
		translationEntries: { control: "object" },
	},
};

import { faker } from "@faker-js/faker";
import { ConfigProvider } from "@logora/debate/data/config_provider";
import { Location } from "@logora/debate/util/location";
import React from "react";
import { IntlProvider } from "react-intl";
import { BrowserRouter } from "react-router-dom";
import { SummaryContentBox } from "./SummaryContentBox";

const author = {
	image_url: faker.image.avatarGitHub(),
	full_name: faker.person.fullName(),
	hash_id: faker.lorem.slug(),
	slug: faker.lorem.slug(),
	points: 52,
	role: "contributor",
	last_activity: new Date(),
	description: faker.person.jobTitle(),
};

const argument = {
	id: 43,
	author: author,
	created_at: faker.date.recent(),
	content: faker.lorem.sentences(8),
	position: {
		name: faker.lorem.word(),
	},
};

const debateUrl = faker.internet.url();

const routes = {
	userShowLocation: new Location("espace-debat/user/:userSlug", {
		userSlug: "",
	}),
};

export const DefaultSummaryContentBox = (args) => {
	return (
		<BrowserRouter>
			<ConfigProvider routes={{ ...routes }}>
				<IntlProvider locale="en">
					<SummaryContentBox
						author={author}
						content={argument.content}
						link={debateUrl}
						{...args}
					/>
				</IntlProvider>
			</ConfigProvider>
		</BrowserRouter>
	);
};

export const SummaryContentBoxWithTitle = () => {
	return (
		<BrowserRouter>
			<ConfigProvider routes={{ ...routes }}>
				<IntlProvider locale="en">
					<SummaryContentBox
						author={author}
						tag={argument.position?.name}
						title={"My argument title"}
						date={argument.created_at}
						content={argument.content}
						link={debateUrl}
						showFooter
					/>
				</IntlProvider>
			</ConfigProvider>
		</BrowserRouter>
	);
};

export const SummaryContentBoxWithFooter = () => {
	return (
		<BrowserRouter>
			<ConfigProvider routes={{ ...routes }}>
				<IntlProvider locale="en">
					<SummaryContentBox
						author={author}
						tag={argument.position?.name}
						date={argument.created_at}
						content={argument.content}
						link={debateUrl}
						showFooter
					/>
				</IntlProvider>
			</ConfigProvider>
		</BrowserRouter>
	);
};

export const SummaryContentBoxHeaderOneLine = () => {
	return (
		<BrowserRouter>
			<ConfigProvider routes={{ ...routes }}>
				<IntlProvider locale="en">
					<SummaryContentBox
						author={author}
						tag={argument.position?.name}
						date={argument.created_at}
						content={argument.content}
						link={debateUrl}
						headerOneLine={true}
					/>
				</IntlProvider>
			</ConfigProvider>
		</BrowserRouter>
	);
};
