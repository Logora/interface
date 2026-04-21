export default {
	title: "User/Avatar",
	component: Avatar,
	args: {
		avatarUrl: "https://avatars.githubusercontent.com/u/1?v=4",
		userName: "John Doe",
		isOnline: false,
		showTooltip: false,
		size: 40,
		className: "",
	},
	argTypes: {
		avatarUrl: { control: "text" },
		userName: { control: "text" },
		isOnline: { control: "boolean" },
		showTooltip: { control: "boolean" },
		size: { control: "number" },
		className: { control: "text" },
	},
};

import { faker } from "@faker-js/faker";
import React from "react";
import { IntlProvider } from "react-intl";
import { Avatar } from "./Avatar";

const avatarUrl = faker.image.avatarGitHub();
const userName = faker.person.fullName();

export const DefaultAvatar = (args) => {
	return (
		<IntlProvider locale="en">
			<Avatar {...args} />
		</IntlProvider>
	);
};

export const AvatarWithDefaultImage = () => {
	return (
		<IntlProvider locale="en">
			<Avatar userName={userName} />
		</IntlProvider>
	);
};

export const FallbackAvatar = () => {
	return (
		<IntlProvider locale="en">
			<Avatar
				avatarUrl={"https://example.com/does-not-exist.png"}
				userName={userName}
			/>
		</IntlProvider>
	);
};
