export default {
	title: "User/Author Box",
	component: AuthorBox,
	args: {
		fullName: "John Doe",
		slug: "john-doe",
		avatarUrl: "https://avatars.githubusercontent.com/u/1?v=4",
		lastActivity: new Date().toISOString(),
		showBadge: false,
		points: 52,
		eloquenceTitle: "A",
		occupation: "Writer",
		disableLinks: false,
		isDeleted: false,
		language: null,
		languageDialect: null,
	},
	argTypes: {
		fullName: { control: "text" },
		slug: { control: "text" },
		avatarUrl: { control: "text" },
		lastActivity: { control: "text" },
		showBadge: { control: "boolean" },
		points: { control: "number" },
		eloquenceTitle: { control: "text" },
		occupation: { control: "text" },
		disableLinks: { control: "boolean" },
		isDeleted: { control: "boolean" },
		language: { control: "text" },
		languageDialect: { control: "text" },
	},
};

import { faker } from "@faker-js/faker";
import { ConfigProvider } from "@logora/debate/data/config_provider";
import { Location } from "@logora/debate/util/location";
import React from "react";
import { IntlProvider } from "react-intl";
import { BrowserRouter } from "react-router-dom";
import { AuthorBox } from "./AuthorBox";

const author = {
	image_url: faker.image.avatarGitHub(),
	full_name: faker.person.fullName(),
	hash_id: faker.lorem.slug(),
	points: 52,
	eloquence_title: faker.science.chemicalElement().symbol,
	occupation: faker.vehicle.bicycle(),
	last_activity: faker.date.recent(),
	description: faker.person.jobTitle(),
};

const routes = {
	userShowLocation: new Location("espace-debat/user/:userSlug", {
		userSlug: "",
	}),
};

export const DefaultAuthorBox = (args) => {
	return (
		<BrowserRouter>
			<ConfigProvider routes={{ ...routes }}>
				<IntlProvider locale="en">
					<AuthorBox {...args} />
				</IntlProvider>
			</ConfigProvider>
		</BrowserRouter>
	);
};

export const AuthorBoxWithTitle = () => {
	return (
		<BrowserRouter>
			<ConfigProvider routes={{ ...routes }}>
				<IntlProvider locale="en">
					<AuthorBox
						fullName={author.full_name}
						avatarUrl={author.image_url}
						slug={author.hash_id}
						points={author.points}
						eloquenceTitle={author.eloquence_title}
					/>
				</IntlProvider>
			</ConfigProvider>
		</BrowserRouter>
	);
};

export const AuthorBoxWithOccupation = () => {
	return (
		<BrowserRouter>
			<ConfigProvider routes={{ ...routes }}>
				<IntlProvider locale="en">
					<AuthorBox
						fullName={author.full_name}
						avatarUrl={author.image_url}
						slug={author.hash_id}
						points={author.points}
						occupation={author.occupation}
					/>
				</IntlProvider>
			</ConfigProvider>
		</BrowserRouter>
	);
};

export const AuthorBoxWithoutPoints = () => {
	return (
		<BrowserRouter>
			<ConfigProvider routes={{ ...routes }}>
				<IntlProvider locale="en">
					<AuthorBox
						fullName={author.full_name}
						avatarUrl={author.image_url}
						slug={author.hash_id}
						points={null}
						showBadge={true}
					/>
				</IntlProvider>
			</ConfigProvider>
		</BrowserRouter>
	);
};

export const AuthorBoxWithLang = () => {
	return (
		<BrowserRouter>
			<ConfigProvider routes={{ ...routes }}>
				<IntlProvider locale="en">
					<AuthorBox
						fullName={author.full_name}
						avatarUrl={author.image_url}
						slug={author.hash_id}
						language={"fr-CH"}
						showBadge={false}
					/>
				</IntlProvider>
			</ConfigProvider>
		</BrowserRouter>
	);
};
