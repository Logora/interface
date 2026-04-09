export default {
	title: "User/Author Box",
	component: AuthorBox,
	args: {},
	argTypes: {},
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

export const DefaultAuthorBox = () => {
	return (
		<BrowserRouter>
			<ConfigProvider routes={{ ...routes }}>
				<IntlProvider locale="en">
					<AuthorBox
						fullName={author.full_name}
						avatarUrl={author.image_url}
						slug={author.hash_id}
						points={author.points}
						showBadge={false}
					/>
				</IntlProvider>
			</ConfigProvider>
		</BrowserRouter>
	);
};

export const AuthorBoxWithoutLinks = () => {
	return (
		<BrowserRouter>
			<ConfigProvider routes={{ ...routes }}>
				<IntlProvider locale="en">
					<AuthorBox
						fullName={author.full_name}
						avatarUrl={author.image_url}
						slug={author.hash_id}
						points={author.points}
						showBadge={false}
						disableLinks
					/>
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

export const AuthorBoxExpert = () => {
	return (
		<BrowserRouter>
			<ConfigProvider routes={{ ...routes }}>
				<IntlProvider locale="en">
					<AuthorBox
						fullName={author.full_name}
						avatarUrl={author.image_url}
						slug={author.hash_id}
						points={author.points}
						showBadge={true}
					/>
				</IntlProvider>
			</ConfigProvider>
		</BrowserRouter>
	);
};

export const AuthorBoxDeletedUser = () => {
	return (
		<BrowserRouter>
			<ConfigProvider routes={{ ...routes }}>
				<IntlProvider locale="en">
					<AuthorBox
						fullName={author.full_name}
						avatarUrl={author.image_url}
						slug={author.hash_id}
						points={author.points}
						isDeleted={true}
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
