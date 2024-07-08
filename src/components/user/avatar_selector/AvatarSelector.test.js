import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import { DefaultAvatarSelector } from "./AvatarSelector.composition";
import { AllowUserImageAvatarSelector } from "./AvatarSelector.composition";
import { AvatarSelector } from "./AvatarSelector";
import { faker } from '@faker-js/faker';
import { IntlProvider } from "react-intl";
import userEvent from '@testing-library/user-event';

const avatarUrlList = [faker.image.avatar(), faker.image.avatar(), faker.image.avatar(), faker.image.avatar()];
const file = new File(['hello'], 'hello.png', {type: 'image/png'})

describe("AvatarSelector", () => {
    it("should render with all images", () => {
        render(<DefaultAvatarSelector />);
        const images = screen.getAllByTestId("avatar");
        expect(images.length).toBe(17);
    });

    it("should trigger callback with user validation", async () => {
        const onChooseCallback = jest.fn();

        render(
            <IntlProvider locale="en">
                <AvatarSelector 
                    onChooseAvatar={onChooseCallback}
                    avatarUrlList={avatarUrlList}
                    userName={"User Name"}
                />
            </IntlProvider>
        );

        const images = screen.getAllByTestId("avatar");
        const chosenAvatar = images[0];

        await userEvent.click(chosenAvatar);

        const button = screen.getByRole("button");
        await userEvent.click(button);
        expect(onChooseCallback).toHaveBeenCalledTimes(1);
    });

    it("should render with upload input and avatar list", () => {
        render(<AllowUserImageAvatarSelector />);

        const images = screen.getAllByTestId("avatar");
        expect(images.length).toBe(17);
        expect(screen.getByText("Import image of your choice")).toBeInTheDocument();
        expect(screen.getByText("Or choose from one of our avatars")).toBeInTheDocument();
        expect(screen.getByText("Upload an image")).toBeInTheDocument();
    });

    it("should render cancel button", async () => {
        render(<AllowUserImageAvatarSelector />);
        
        const images = screen.getAllByTestId("avatar");
        const chosenAvatar = images[0];

        await userEvent.click(chosenAvatar);
        expect(screen.getByText("Cancel selection")).toBeInTheDocument();
    });

    it("should handle image upload", async () => {
        const onChooseCallback = jest.fn();
        render(
            <IntlProvider locale="en">
                <AvatarSelector 
                    onChooseAvatar={onChooseCallback}
                    avatarUrlList={avatarUrlList}
                    userName={"User Name"}
                    allowUserImage
                />
            </IntlProvider>
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
