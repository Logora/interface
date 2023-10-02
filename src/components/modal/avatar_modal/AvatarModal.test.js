import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import { DefaultAvatarModal } from "./AvatarModal.composition";
import { AllowUserImageAvatarModal } from "./AvatarModal.composition";
import { AvatarModal } from "./AvatarModal";
import { faker } from '@faker-js/faker';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from "react-intl";
import { ModalProvider } from "@logora/debate.dialog.modal";

const avatarUrlList = [faker.image.avatar(), faker.image.avatar(), faker.image.avatar(), faker.image.avatar()];
const file = new File(['hello'], 'hello.png', {type: 'image/png'})

describe("AvatarModal", () => {

    it("should render with all images", () => {
        render(<DefaultAvatarModal />);
        const images = screen.getAllByTestId("avatar");
        expect(images.length).toBe(17);
    });

    it("should trigger callback with user validation", async () => {
        const onChooseCallback = jest.fn();

        render(
            <ModalProvider>
                <IntlProvider locale="en">
                    <AvatarModal 
                        onChooseAvatar={onChooseCallback}
                        avatarUrlList={avatarUrlList}
                        userName={"User Name"}
                    />
                </IntlProvider>
            </ModalProvider>
        );

        const images = screen.getAllByTestId("avatar");
        const chosenAvatar = images[0];

        await userEvent.click(chosenAvatar);

        const button = screen.getByRole("button");
        await userEvent.click(button);
        expect(onChooseCallback).toHaveBeenCalledTimes(1);
    });

    it("should render with upload input and avatar list", () => {
        render(<AllowUserImageAvatarModal />);

        const images = screen.getAllByTestId("avatar");
        expect(images.length).toBe(17);
        expect(screen.getByText("Import image of your choice")).toBeInTheDocument();
        expect(screen.getByText("Or choose from one of our avatars")).toBeInTheDocument();
        expect(screen.getByText("Upload an image")).toBeInTheDocument();
    });

    it("should render cancel button", async () => {
        render(<AllowUserImageAvatarModal />);
        
        const images = screen.getAllByTestId("avatar");
        const chosenAvatar = images[0];

        await userEvent.click(chosenAvatar);
        expect(screen.getByText("Cancel selection")).toBeInTheDocument();
    });

    it("should handle image upload", async () => {
        const onChooseCallback = jest.fn();
        render(
            <ModalProvider>
                <IntlProvider locale="en">
                    <AvatarModal 
                        onChooseAvatar={onChooseCallback}
                        avatarUrlList={avatarUrlList}
                        userName={"User Name"}
                        allowUserImage
                    />
                </IntlProvider>
            </ModalProvider>
        );
        
        const fileInput = screen.getByTestId("avatar-input");
        act(() => {
            userEvent.upload(fileInput, file);
        });

        await waitFor(() => screen.getByTestId("upload-avatar"));

        const uploadedAvatarPreview = screen.getByTestId("upload-avatar");
        expect(uploadedAvatarPreview).toBeInTheDocument();

        const confirmButton = screen.getByRole("button");
        expect(confirmButton).toBeEnabled();

        await userEvent.click(confirmButton);

        await waitFor(() => {
            expect(onChooseCallback).toHaveBeenCalledTimes(1);
        });

        expect(onChooseCallback).toHaveBeenCalledWith(file);
    });
});
