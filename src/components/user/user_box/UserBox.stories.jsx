export default {
	title: "User/User Box",
	component: UserBox,
	args: {
		user: {
			id: 83,
			uid: "396deae0-15e3-46dd-bd85-498456809453",
			hash_id: "396deae0-15e3-46dd",
			image_url: "https://avatars.githubusercontent.com/u/1?v=4",
			full_name: "John Doe",
			slug: "john-doe",
			score: 0,
			points: 100,
			description: null,
			last_activity: new Date().toISOString(),
			groups_count: 2,
			upvotes: 5,
			messages_count: 8,
			eloquence_title: null,
		},
	},
	argTypes: {
		user: { control: "object" },
	},
};

import { faker } from "@faker-js/faker";
import { ConfigProvider } from "@logora/debate/data/config_provider";
import { Location } from "@logora/debate/util/location";
import React from "react";
import { IntlProvider } from "react-intl";
import { BrowserRouter } from "react-router-dom";
import { UserBox } from "./UserBox";

const defaultUser = {
	id: 83,
	uid: "396deae0-15e3-46dd-bd85-498456809453",
	hash_id: "396deae0-15e3-46dd",
	image_url: faker.image.avatarGitHub(),
	full_name: faker.person.fullName(),
	slug: faker.lorem.slug(),
	score: 0,
	points: 100,
	description: null,
	last_activity: faker.date.recent(),
	groups_count: 2,
	upvotes: 5,
	messages_count: 8,
	eloquence_title: null,
};

const contributorUser = {
	id: 82,
	uid: "296deae0-15e3-46dd-bd85-498456809453",
	hash_id: "296deae0-15e3-46dd",
	image_url: faker.image.avatarGitHub(),
	full_name: faker.person.fullName(),
	slug: faker.lorem.slug(),
	score: 0,
	points: 1539,
	role: "contributor",
	description: null,
	last_activity: faker.date.recent(),
	groups_count: 5,
	upvotes: 13,
	messages_count: 20,
	eloquence_title: null,
};

const UserShowLocation = new Location("espace-debat/user/:userSlug", {
	userSlug: "",
});

const routes = {
	userShowLocation: UserShowLocation,
};

export const DefaultUserBox = (args) => {
	return (
		<BrowserRouter>
			<IntlProvider locale="en">
				<ConfigProvider routes={{ ...routes }}>
					<UserBox {...args} />
				</ConfigProvider>
			</IntlProvider>
		</BrowserRouter>
	);
};

export const UserBoxWithRoleContributor = () => {
	return (
		<BrowserRouter>
			<IntlProvider locale="en">
				<ConfigProvider routes={{ ...routes }}>
					<UserBox user={contributorUser} />
				</ConfigProvider>
			</IntlProvider>
		</BrowserRouter>
	);
};
