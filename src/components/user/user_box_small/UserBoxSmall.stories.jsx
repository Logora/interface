export default {
	title: "User/User Box Small",
	component: UserBoxSmall,
	args: {
		userName: "John Doe",
		avatarUrl: "https://avatars.githubusercontent.com/u/1?v=4",
		userSlug: "john-doe",
	},
	argTypes: {
		userName: { control: "text" },
		avatarUrl: { control: "text" },
		userSlug: { control: "text" },
	},
};

import { faker } from "@faker-js/faker";
import { ConfigProvider } from "@logora/debate/data/config_provider";
import { Location } from "@logora/debate/util/location";
import React from "react";
import { IntlProvider } from "react-intl";
import { BrowserRouter } from "react-router-dom";
import { UserBoxSmall } from "./UserBoxSmall";

const user = {
	image_url: faker.image.avatarGitHub(),
	full_name: faker.person.fullName(),
	slug: faker.lorem.slug(),
};

const UserShowLocation = new Location("espace-debat/user/:userSlug", {
	userSlug: "",
});

const routes = {
	userShowLocation: UserShowLocation,
};

export const DefaultUserBoxSmall = (args) => {
	return (
		<BrowserRouter>
			<ConfigProvider routes={{ ...routes }}>
				<IntlProvider locale="en">
					<UserBoxSmall {...args} />
				</IntlProvider>
			</ConfigProvider>
		</BrowserRouter>
	);
};
