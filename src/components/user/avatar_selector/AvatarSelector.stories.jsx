export default {
	title: "User/Avatar Selector",
	component: AvatarSelector,
	args: {},
	argTypes: {},
};

import { faker } from "@faker-js/faker";
import React from "react";
import { IntlProvider } from "react-intl";
import { AvatarSelector } from "./AvatarSelector";

const avatarUrlList = [
	faker.image.avatarGitHub(),
	faker.image.avatarGitHub(),
	faker.image.avatarGitHub(),
	faker.image.avatarGitHub(),
	faker.image.avatarGitHub(),
	faker.image.avatarGitHub(),
	faker.image.avatarGitHub(),
	faker.image.avatarGitHub(),
	faker.image.avatarGitHub(),
	faker.image.avatarGitHub(),
	faker.image.avatarGitHub(),
	faker.image.avatarGitHub(),
	faker.image.avatarGitHub(),
	faker.image.avatarGitHub(),
	faker.image.avatarGitHub(),
	faker.image.avatarGitHub(),
	faker.image.avatarGitHub(),
];

const handleChooseAvatar = (avatar) => {
	console.log(`Chosen avatar: ${avatar}`);
};

export const DefaultAvatarSelector = () => {
	return (
		<div style={{ width: "500px", height: "300px" }}>
			<IntlProvider locale="en">
				<AvatarSelector
					onChooseAvatar={handleChooseAvatar}
					avatarUrlList={avatarUrlList}
					userName={"User Name"}
				/>
			</IntlProvider>
		</div>
	);
};

export const AllowUserImageAvatarSelector = () => {
	return (
		<div style={{ width: "500px", height: "300px" }}>
			<IntlProvider locale="en">
				<AvatarSelector
					onChooseAvatar={handleChooseAvatar}
					avatarUrlList={avatarUrlList}
					userName={"User Name"}
					allowUserImage
				/>
			</IntlProvider>
		</div>
	);
};
