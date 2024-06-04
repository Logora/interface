import React from "react";
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ArgumentInput } from "./ArgumentInput";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "@logora/debate.data.config_provider";
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';
import { IntlProvider } from "react-intl";
import { faker } from '@faker-js/faker';
import { ToastProvider } from '@logora/debate.dialog.toast_provider';
import { ModalProvider } from '@logora/debate.dialog.modal';
import { dataProvider, DataProviderContext } from '@logora/debate.data.data_provider';
import { AuthContext } from '@logora/debate.auth.use_auth';
import { ListProvider } from '@logora/debate.list.list_provider';
import { InputProvider, useInput } from '@logora/debate.input.input_provider';
import { IdProvider } from "react-use-id-hook";

const httpClient = {
    get: () => null,
    post: (url, data, config) => {
        return new Promise(function(resolve, reject) {
            resolve({ data: { success: true, data: { resource: argument } }});
        });
    },
    patch: () => null,
    delete: (url, data, config) => {
        return new Promise(function(resolve, reject) {
            resolve({ data: { success: true, data: {} }});
        });
    }
};

const data = dataProvider(httpClient, "https://mock.example.api");

const debate = {
    id: faker.datatype.number(),
    name: faker.lorem.word(),
    positions: [
        {
            id: faker.datatype.number(),
            name: faker.lorem.word(),
        },
        {
            id: faker.datatype.number(),
            name: faker.lorem.word(),
        }
    ],

}

const argument = {
    position : {
        id: debate.positions[0].id
    }
}

const currentUser = {
    id: faker.datatype.number(),
    full_name: faker.name.fullName(),
    image_url: faker.image.avatar(),
    points: faker.datatype.number()
}

const callback = jest.fn();

describe("ArgumentInput", () => {
    beforeAll(() => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation((query) => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: jest.fn(),
                removeListener: jest.fn(),
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            })),
        });
    });

    it("should render correctly", () => {
        const { queryByText } = render(
            <BrowserRouter>
                <ConfigProvider>
                    <IconProvider library={regularIcons}>
                        <IntlProvider locale="en">
                            <DataProviderContext.Provider value={{ dataProvider: data }}>
                                <AuthContext.Provider value={{ currentUser: currentUser, isLoggedIn: true }}>
                                    <ToastProvider>
                                        <ModalProvider>
                                            <ListProvider>
                                                <IdProvider>
                                                    <InputProvider>
                                                        <ArgumentInput
                                                            onSubmit={callback}
                                                            groupId={debate.id}
                                                            groupName={debate.name}
                                                            positions={debate.positions}
                                                            disabledPositions={[]}
                                                            listId={"argumentList"}
                                                            positionId={debate.positions[0].id}
                                                            hideSourceAction={false}
                                                            avatarSize={48}
                                                            placeholder={"Add an argument..."}
                                                        />
                                                    </InputProvider>
                                                </IdProvider>
                                            </ListProvider>
                                        </ModalProvider>
                                    </ToastProvider>
                                </AuthContext.Provider>
                            </DataProviderContext.Provider>
                        </IntlProvider>
                    </IconProvider>
                </ConfigProvider>
            </BrowserRouter>
        );

        expect(queryByText(debate.positions[0].name)).toBeInTheDocument();
        expect(queryByText(debate.positions[1].name)).toBeInTheDocument();
        expect(queryByText(currentUser.full_name)).toBeInTheDocument();
        expect(queryByText("Add an argument...")).toBeInTheDocument();
        expect(queryByText("Your position")).toBeInTheDocument();
    });

    it("should render correctly if is reply", () => {
        const { queryByText } = render(
            <BrowserRouter>
                <ConfigProvider>
                    <IconProvider library={regularIcons}>
                        <IntlProvider locale="en">
                            <DataProviderContext.Provider value={{ dataProvider: data }}>
                                <AuthContext.Provider value={{ currentUser: currentUser, isLoggedIn: true }}>
                                    <ToastProvider>
                                        <ModalProvider>
                                            <ListProvider>
                                                <IdProvider>
                                                    <InputProvider>
                                                        <ArgumentInput
                                                            onSubmit={callback}
                                                            groupId={debate.id}
                                                            groupName={debate.name}
                                                            positions={debate.positions}
                                                            disabledPositions={[]}
                                                            listId={"argumentList"}
                                                            positionId={debate.positions[0].id}
                                                            hideSourceAction={false}
                                                            avatarSize={40}
                                                            isReply
                                                            placeholder={"Your reply..."}
                                                        />
                                                    </InputProvider>
                                                </IdProvider>
                                            </ListProvider>
                                        </ModalProvider>
                                    </ToastProvider>
                                </AuthContext.Provider>
                            </DataProviderContext.Provider>
                        </IntlProvider>
                    </IconProvider>
                </ConfigProvider>
            </BrowserRouter>
        );

        expect(queryByText("Your reply...")).toBeInTheDocument();
        expect(queryByText(debate.positions[0].name)).toBeInTheDocument();
        expect(queryByText(debate.positions[1].name)).toBeInTheDocument();
        expect(queryByText(currentUser.full_name)).not.toBeInTheDocument();
    });

    it("should be disabled", () => {
        const { queryByText } = render(
            <BrowserRouter>
                <ConfigProvider>
                    <IconProvider library={regularIcons}>
                        <IntlProvider locale="en">
                            <DataProviderContext.Provider value={{ dataProvider: data }}>
                                <AuthContext.Provider value={{ currentUser: currentUser, isLoggedIn: true }}>
                                    <ToastProvider>
                                        <ModalProvider>
                                            <ListProvider>
                                                <IdProvider>
                                                    <InputProvider>
                                                        <ArgumentInput
                                                            onSubmit={callback}
                                                            groupId={debate.id}
                                                            groupName={debate.name}
                                                            positions={debate.positions}
                                                            disabledPositions={[]}
                                                            disabled
                                                            listId={"argumentList"}
                                                            positionId={debate.positions[0].id}
                                                            hideSourceAction={false}
                                                            avatarSize={48}
                                                            placeholder={"Add an argument..."}
                                                        />
                                                    </InputProvider>
                                                </IdProvider>
                                            </ListProvider>
                                        </ModalProvider>
                                    </ToastProvider>
                                </AuthContext.Provider>
                            </DataProviderContext.Provider>
                        </IntlProvider>
                    </IconProvider>
                </ConfigProvider>
            </BrowserRouter>
        );

        expect(queryByText("Debate is closed")).toBeInTheDocument();
    });

    it("should display side modal if the position is disabled", async () => {
        const { queryByText, getByText, getByRole } = render(
            <BrowserRouter>
                <ConfigProvider>
                    <IconProvider library={regularIcons}>
                        <IntlProvider locale="en">
                            <DataProviderContext.Provider value={{ dataProvider: data }}>
                                <AuthContext.Provider value={{ currentUser: currentUser, isLoggedIn: true }}>
                                    <ToastProvider>
                                        <ModalProvider>
                                            <ListProvider>
                                                <IdProvider>
                                                    <InputProvider>
                                                        <ArgumentInput
                                                            onSubmit={() => {}}
                                                            groupId={debate.id}
                                                            groupName={debate.name}
                                                            positions={debate.positions}
                                                            disabledPositions={[{id: debate.positions[0].id, name: debate.positions[0].name}]}
                                                            listId={"argumentList"}
                                                            positionId={debate.positions[0].id}
                                                            hideSourceAction
                                                            avatarSize={48}
                                                            placeholder={"Add an argument..."}
                                                        />
                                                    </InputProvider>
                                                </IdProvider>
                                            </ListProvider>
                                        </ModalProvider>
                                    </ToastProvider>
                                </AuthContext.Provider>
                            </DataProviderContext.Provider>
                        </IntlProvider>
                    </IconProvider>
                </ConfigProvider>
            </BrowserRouter>
        );

        expect(queryByText("Add an argument...")).toBeInTheDocument();
        expect(queryByText(debate.positions[0].name)).toBeInTheDocument();
        expect(queryByText(debate.positions[1].name)).toBeInTheDocument();

        const onSubmit = getByRole('button', { type: 'submit' });
        await act(async () => { await userEvent.click(onSubmit) });
        expect(queryByText("Choose your side")).toBeInTheDocument();
        expect(getByText(`You have already reached the argument limit (10) for position ${debate.positions[0].name}. You can support the other position.`)).toBeInTheDocument();
    });

    it("should display error if the validation rules are not met", async () => {
        const targetContent = {"root":{"children":[{"children":[{"detail":0,"format":1,"mode":"normal","style":"","text":"I write","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}};
        const targetUrlContent = {"root":{"children":[{"children":[{"detail":0,"format":1,"mode":"normal","style":"","text":"I write https://mysite.com","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}};
        
        const AddContentComponent = () => {
            const { setInputRichContent } = useInput();

            const setShortContent = (event) => {
                setInputRichContent(targetContent);
            }

            const setUrlContent = (event) => {
                setInputRichContent(targetUrlContent);
            }

            return (
                <>
                    <div onClick={setShortContent}>Click to set short content</div>
                    <div onClick={setUrlContent}>Click to set url content</div>
                </>
            )
        }

        const { getByTestId, queryByText, getByRole } = render(
            <BrowserRouter>
                <ConfigProvider>
                    <IconProvider library={regularIcons}>
                        <IntlProvider locale="en">
                            <DataProviderContext.Provider value={{ dataProvider: data }}>
                                <AuthContext.Provider value={{ currentUser: currentUser, isLoggedIn: true }}>
                                    <ToastProvider>
                                        <ModalProvider>
                                            <ListProvider>
                                                <IdProvider>
                                                    <InputProvider>
                                                        <AddContentComponent />
                                                        <ArgumentInput
                                                            onSubmit={callback}
                                                            groupId={debate.id}
                                                            groupName={debate.name}
                                                            positions={debate.positions}
                                                            disabledPositions={[]}
                                                            disabled
                                                            listId={"argumentList"}
                                                            positionId={debate.positions[0].id}
                                                            hideSourceAction={false}
                                                            avatarSize={48}
                                                            placeholder={"Add an argument..."}
                                                        />
                                                    </InputProvider>
                                                </IdProvider>
                                            </ListProvider>
                                        </ModalProvider>
                                    </ToastProvider>
                                </AuthContext.Provider>
                            </DataProviderContext.Provider>
                        </IntlProvider>
                    </IconProvider>
                </ConfigProvider>
            </BrowserRouter>
        );

        const input = getByTestId("argument-input");
        await userEvent.click(input);

        const onSubmit = getByRole('button', { type: 'submit' });

        // Empty content
        await act(async () => { await userEvent.click(onSubmit) });
        expect(queryByText("content can't be empty.")).toBeInTheDocument();

        // Short content
        const setContentButton = screen.getByText("Click to set short content");
        await act(async () => { await userEvent.click(setContentButton) });
        expect(queryByText("I write")).toBeInTheDocument();
        
        await act(async () => { await userEvent.click(onSubmit) });
        expect(queryByText("content is too short. It must be at least 3 long.")).toBeInTheDocument();

        // Url content
        const setUrlContentButton = screen.getByText("Click to set url content");
        await act(async () => { await userEvent.click(setUrlContentButton) });
        expect(queryByText("I write https://mysite.com")).toBeInTheDocument();
        
        await act(async () => { await userEvent.click(onSubmit) });
        expect(queryByText("content must not contain any links")).toBeInTheDocument();
    });

    it("should call submit callback", async () => {
        const targetContent = {"root":{"children":[{"children":[{"detail":0,"format":1,"mode":"normal","style":"","text":"I write an argument","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}};
        
        const AddContentComponent = () => {
            const { setInputRichContent } = useInput();

            const setContent = (event) => {
                setInputRichContent(targetContent);
            }

            return (
                <>
                    <div onClick={setContent}>Click to set content</div>
                </>
            )
        }

        const { getByTestId, queryByText, getByRole } = render(
            <BrowserRouter>
                <ConfigProvider>
                    <IconProvider library={regularIcons}>
                        <IntlProvider locale="en">
                            <DataProviderContext.Provider value={{ dataProvider: data }}>
                                <AuthContext.Provider value={{ currentUser: currentUser, isLoggedIn: true }}>
                                    <ToastProvider>
                                        <ModalProvider>
                                            <ListProvider>
                                                <IdProvider>
                                                    <InputProvider>
                                                        <AddContentComponent />
                                                        <ArgumentInput
                                                            onSubmit={callback}
                                                            groupId={debate.id}
                                                            groupName={debate.name}
                                                            positions={debate.positions}
                                                            disabledPositions={[]}
                                                            disabled
                                                            listId={"argumentList"}
                                                            positionId={debate.positions[0].id}
                                                            hideSourceAction={false}
                                                            avatarSize={48}
                                                            placeholder={"Add an argument..."}
                                                        />
                                                    </InputProvider>
                                                </IdProvider>
                                            </ListProvider>
                                        </ModalProvider>
                                    </ToastProvider>
                                </AuthContext.Provider>
                            </DataProviderContext.Provider>
                        </IntlProvider>
                    </IconProvider>
                </ConfigProvider>
            </BrowserRouter>
        );

        const input = getByTestId("argument-input");
        await act(async () => { await userEvent.click(input) });

        const setContentButton = screen.getByText("Click to set content");
        await act(async () => { await userEvent.click(setContentButton) });
        expect(queryByText("I write an argument")).toBeInTheDocument();
        
        const onSubmit = getByRole('button', { type: 'submit' });
        await act(async () => { await userEvent.click(onSubmit) });
        expect(callback).toHaveBeenCalled();
    });
});