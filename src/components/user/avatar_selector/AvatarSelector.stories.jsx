export default {
	title: "User/Avatar Selector",
	component: AvatarSelector,
	args: {
		avatarUrlList: [],
		onChooseAvatar: undefined,
		userName: "User Name",
		allowUserImage: false,
	},
	argTypes: {
		avatarUrlList: { control: "object" },
		onChooseAvatar: { action: "chooseAvatar" },
		userName: { control: "text" },
		allowUserImage: { control: "boolean" },
	},
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

export const DefaultAvatarSelector = (args) => {
	return (
		<div style={{ width: "500px", height: "300px" }}>
			<IntlProvider locale="en">
				<AvatarSelector
					onChooseAvatar={args.onChooseAvatar || handleChooseAvatar}
					avatarUrlList={
						args.avatarUrlList?.length > 0 ? args.avatarUrlList : avatarUrlList
					}
					userName={args.userName}
					allowUserImage={args.allowUserImage}
				/>
			</IntlProvider>
		</div>
	);
};

export const AllowUserImageAvatarSelector = (args) => {
	return <DefaultAvatarSelector {...args} allowUserImage={true} />;
};