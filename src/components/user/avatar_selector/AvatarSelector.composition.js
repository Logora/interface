import React from "react";
import { AvatarSelector } from "./AvatarSelector";
import { IntlProvider } from "react-intl";
import { faker } from '@faker-js/faker';

const avatarUrlList = [faker.image.avatar(), faker.image.avatar(), faker.image.avatar(), faker.image.avatar(), faker.image.avatar(), faker.image.avatar(), faker.image.avatar(), faker.image.avatar(), faker.image.avatar(), faker.image.avatar(), faker.image.avatar(), faker.image.avatar(), faker.image.avatar(), faker.image.avatar(), faker.image.avatar(), faker.image.avatar(), faker.image.avatar()];

const handleChooseAvatar = (avatar) => {
    console.log(`Chosen avatar: ${avatar}`);
};

export const DefaultAvatarSelector = () => {
    return (
        <div style={{width:"500px", height: "300px"}}>
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
        <div style={{width:"500px", height: "300px"}}>
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