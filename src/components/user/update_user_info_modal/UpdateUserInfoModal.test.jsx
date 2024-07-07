import React from "react";
import { render } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { UpdateUserInfoModal } from "./UpdateUserInfoModal";
import { IntlProvider } from 'react-intl';
import { dataProvider, DataProviderContext } from '@logora/debate.data.data_provider';
import { AuthContext } from '@logora/debate.auth.use_auth';
import { ModalProvider } from "@logora/debate.dialog.modal";
import { ConfigProvider } from '@logora/debate.data.config_provider';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';
import { faker } from '@faker-js/faker';

const httpClient = {
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn()
};

const currentUser = {
    id: faker.datatype.number(),
    full_name: faker.name.fullName(),
    image_url: faker.image.avatar(),
    points: faker.datatype.number()
}

const currentUserWithInfos = {
    id: faker.datatype.number(),
    full_name: faker.name.fullName(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    description: faker.name.jobTitle(),
    image_url: faker.image.avatar(),
    points: faker.datatype.number()
}

const data = dataProvider(httpClient, "https://mock.example.api");

describe("UpdateUserInfoModal", () => {
    it("should appear normally", async () => {
        const { queryByText } = render(
            <ModalProvider>
                <ConfigProvider config={{ translation: { translationMethods: [{fr: "en"}]}, actions: { disableNameUpdate: true } }}>
                    <IntlProvider locale="en">
                        <IconProvider library={regularIcons}>
                            <DataProviderContext.Provider value={{ dataProvider: data }}>
                                <AuthContext.Provider value={{ currentUser: currentUser, isLoggedIn: true }}>
                                    <UpdateUserInfoModal />
                                </AuthContext.Provider>
                            </DataProviderContext.Provider>
                        </IconProvider>
                    </IntlProvider>
                </ConfigProvider>
            </ModalProvider> 
        );
        expect(queryByText("Last name")).toBeInTheDocument();
        expect(queryByText("First name")).toBeInTheDocument();
        expect(queryByText("0")).toBeInTheDocument();
        expect(queryByText("Update your profile")).toBeInTheDocument();
        expect(queryByText("Select an avatar")).toBeInTheDocument();
        expect(queryByText("Save")).toBeInTheDocument();
        expect(queryByText("I declare I have read the General Conditions of Use and the Privacy policy of the debate space and accept them.")).not.toBeInTheDocument();
        expect(queryByText("I agree to receive emails from the editor")).not.toBeInTheDocument();
    });

    it("should appear with terms and consent", async () => {
        const { queryByText } = render(
            <ModalProvider>
                <ConfigProvider config={{ translation: { translationMethods: [{fr: "en"}]}, actions: { disableNameUpdate: true } }}>
                    <IntlProvider locale="en">
                        <IconProvider library={regularIcons}>
                            <DataProviderContext.Provider value={{ dataProvider: data }}>
                                <AuthContext.Provider value={{ currentUser: currentUser, isLoggedIn: true }}>
                                    <UpdateUserInfoModal 
                                        showEmailConsent
                                        showTerms
                                    />
                                </AuthContext.Provider>
                            </DataProviderContext.Provider>
                        </IconProvider>
                    </IntlProvider>
                </ConfigProvider>
            </ModalProvider> 
        );
        expect(queryByText("Last name")).toBeInTheDocument();
        expect(queryByText("First name")).toBeInTheDocument();
        expect(queryByText("0")).toBeInTheDocument();
        expect(queryByText("Update your profile")).toBeInTheDocument();
        expect(queryByText("Select an avatar")).toBeInTheDocument();
        expect(queryByText("Save")).toBeInTheDocument();
        expect(queryByText(/I declare I have read the /i)).toBeInTheDocument();
        expect(queryByText(/ of the debate space and accept them./i)).toBeInTheDocument();
        expect(queryByText("I agree to receive emails from the editor")).toBeInTheDocument();
    });

    it("should throw an error if the name field is less than 2 characters", async () => {
        const { getByTestId, queryByText } = render(
            <ModalProvider>
                <ConfigProvider config={{ translation: { translationMethods: [{fr: "en"}]}, actions: { disableNameUpdate: true } }}>
                    <IntlProvider locale="en">
                        <IconProvider library={regularIcons}>
                            <DataProviderContext.Provider value={{ dataProvider: data }}>
                                <AuthContext.Provider value={{ currentUser: currentUser, isLoggedIn: true }}>
                                    <UpdateUserInfoModal />
                                </AuthContext.Provider>
                            </DataProviderContext.Provider>
                        </IconProvider>
                    </IntlProvider>
                </ConfigProvider>
            </ModalProvider> 
        );

        const saveButton = getByTestId('save-button');
        await userEvent.click(saveButton)
        expect(queryByText("first_name is too short.")).toBeInTheDocument();
        expect(queryByText("last_name is too short.")).toBeInTheDocument();
    });

    it("should display back button when choosing an avatar", async () => {
        const { getByTestId, queryByText } = render(
            <ModalProvider>
                <ConfigProvider config={{ translation: { translationMethods: [{fr: "en"}]}, actions: { disableNameUpdate: true } }}>
                    <IntlProvider locale="en">
                        <IconProvider library={regularIcons}>
                            <DataProviderContext.Provider value={{ dataProvider: data }}>
                                <AuthContext.Provider value={{ currentUser: currentUser, isLoggedIn: true }}>
                                    <UpdateUserInfoModal 
                                        showEmailConsent
                                        showTerms
                                    />
                                </AuthContext.Provider>
                            </DataProviderContext.Provider>
                        </IconProvider>
                    </IntlProvider>
                </ConfigProvider>
            </ModalProvider> 
        );
        
        const avatarButton = getByTestId('avatar-button');
        await userEvent.click(avatarButton)

        expect(queryByText("Back")).toBeInTheDocument();
    });

    it("should throw an error if the terms are not accepted", async () => {
        const { getByTestId, queryByText } = render(
            <ModalProvider>
                <ConfigProvider config={{ translation: { translationMethods: [{fr: "en"}]}, actions: { disableNameUpdate: true } }}>
                    <IntlProvider locale="en">
                        <IconProvider library={regularIcons}>
                            <DataProviderContext.Provider value={{ dataProvider: data }}>
                                <AuthContext.Provider value={{ currentUser: currentUser, isLoggedIn: true }}>
                                    <UpdateUserInfoModal 
                                        showEmailConsent
                                        showTerms
                                    />
                                </AuthContext.Provider>
                            </DataProviderContext.Provider>
                        </IconProvider>
                    </IntlProvider>
                </ConfigProvider>
            </ModalProvider>
        );
        
        const firstName = getByTestId('first-name');
        await userEvent.click(firstName)
        await userEvent.keyboard("First name")

        const lastName = getByTestId('last-name');
         await userEvent.click(lastName)
        await userEvent.keyboard("Last name")

        const saveButton = getByTestId('save-button');
        await userEvent.click(saveButton)
        expect(queryByText("accepts_terms must be true.")).toBeInTheDocument();
    });

    it("should displays the current user's info", async () => {
        const { getByTestId} = render(
            <ModalProvider>
                <ConfigProvider config={{ translation: { translationMethods: [{fr: "en"}]}, actions: { disableNameUpdate: true } }}>
                    <IntlProvider locale="en">
                        <IconProvider library={regularIcons}>
                            <DataProviderContext.Provider value={{ dataProvider: data }}>
                                <AuthContext.Provider value={{ currentUser: currentUserWithInfos, isLoggedIn: true }}>
                                    <UpdateUserInfoModal />
                                </AuthContext.Provider>
                            </DataProviderContext.Provider>
                        </IconProvider>
                    </IntlProvider>
                </ConfigProvider>
            </ModalProvider> 
        );

        const firstName = getByTestId('first-name');
        expect(firstName.value).toBe(currentUserWithInfos.first_name);

        const lastName = getByTestId('last-name');
        expect(lastName.value).toBe(currentUserWithInfos.last_name);

        const description = getByTestId('description');
        expect(description.value).toBe(currentUserWithInfos.description);
    });
});
