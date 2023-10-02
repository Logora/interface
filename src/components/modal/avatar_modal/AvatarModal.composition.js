import React from "react";
import { AvatarModal } from "./AvatarModal";
import { IntlProvider } from "react-intl";
import { ModalProvider } from "@logora/debate.dialog.modal";
import { faker } from '@faker-js/faker';

const avatarUrlList = [faker.image.avatar(), faker.image.avatar(), faker.image.avatar(), faker.image.avatar(), faker.image.avatar(), faker.image.avatar(), faker.image.avatar(), faker.image.avatar(), faker.image.avatar(), faker.image.avatar(), faker.image.avatar(), faker.image.avatar(), faker.image.avatar(), faker.image.avatar(), faker.image.avatar(), faker.image.avatar(), faker.image.avatar()];

const handleChooseAvatar = (avatar) => {
    console.log(`Chosen avatar: ${avatar}`);
};

export const DefaultAvatarModal = () => {
    return (
        <div style={{width:"500px", height: "300px"}}>
            <ModalProvider>
                <IntlProvider locale="en">
                    <AvatarModal
                        onChooseAvatar={handleChooseAvatar}
                        avatarUrlList={avatarUrlList}
                        userName={"User Name"}
                    />
                </IntlProvider>
            </ModalProvider>
        </div>
    );
};

export const AllowUserImageAvatarModal = () => {
    return (
        <div style={{width:"500px", height: "300px"}}>
            <ModalProvider>
                <IntlProvider locale="en">
                    <AvatarModal
                        onChooseAvatar={handleChooseAvatar}
                        avatarUrlList={avatarUrlList}
                        userName={"User Name"}
                        allowUserImage
                    />
                </IntlProvider>
            </ModalProvider>
        </div>
    );
};