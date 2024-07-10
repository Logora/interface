import React from 'react';
import { render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from 'react-intl';
import { ConfigProvider } from '@logora/debate.data.config_provider';
import { BrowserRouter } from 'react-router-dom';
import { Location } from '@logora/debate.util.location';
import { dataProvider, DataProviderContext } from '@logora/debate.data.data_provider';
import { AuthContext } from '@logora/debate.auth.use_auth';
import { ModalProvider } from '@logora/debate.dialog.modal';
import { ListProvider } from '@logora/debate.list.list_provider';
import { ToastProvider } from '@logora/debate.dialog.toast_provider';
import { VoteProvider } from '@logora/debate.vote.vote_provider';
import { InputProvider } from '@logora/debate.input.input_provider';
import { IdProvider } from "react-use-id-hook";
import { Argument } from './Argument';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import { ResponsiveProvider } from '@logora/debate.hooks.use_responsive';
import * as regularIcons from '@logora/debate.icons.regular_icons';
import { faker } from '@faker-js/faker';

const routes = {
    userShowLocation: new Location('espace-debat/user/:userSlug', { userSlug: '' })
};

const vote = { 
    id: faker.datatype.number(),
    voteable_type: faker.lorem.word(),
    voteable_id: faker.datatype.number(), 
    user_id: faker.datatype.number()
};

const httpClient = {
    get: () => null,
    post: (url, data, config) => {
        return new Promise(function(resolve, reject) {
            resolve({ data: { success: true, data: { resource: vote } }});
        });
    },
    patch: () => null,
    delete: (url, data, config) => {
        return new Promise(function(resolve, reject) {
            resolve({ data: { success: true, data: {} }});
        });
    }
};

const currentUser = {
    id: vote.user_id,
}

const data = dataProvider(httpClient, "https://mock.example.api");

const argument = {
    id: 414,
    content: faker.lorem.sentences(3),
    upvotes: 0,
    group_id: 417,
    is_reply: false,
    created_at: faker.date.recent(),
    is_deleted: false,
    score: 50,
    author: {
        image_url: faker.image.avatar(),
        full_name: faker.name.fullName(),
        hash_id: faker.lorem.slug(),
        slug: faker.lorem.slug(),
        points: 1320,
        last_activity: new Date(),
        description: faker.name.jobTitle()
    },
    position: {
        id: 1,
        name: "Yes",
        language: "en",
        translation_entries: []
    }
};

const argumentWithReplies = {
    id: 414,
    content: faker.lorem.sentences(2),
    upvotes: 0,
    group_id: 417,
    is_reply: false,
    created_at: faker.date.recent(),
    is_deleted: false,
    score: 50,
    author: {
        image_url: faker.image.avatar(),
        full_name: faker.name.fullName(),
        hash_id: faker.lorem.slug(),
        slug: faker.lorem.slug(),
        points: 1320,
        last_activity: new Date(),
        description: faker.name.jobTitle()
    },
    position: {
        id: 1,
        name: "Yes",
        language: "en",
        translation_entries: []
    },
    number_replies: 3,
    replies_authors: [
        {
            image_url: faker.image.avatar(),
            full_name: faker.name.fullName(),
        },
        {
            image_url: faker.image.avatar(),
            full_name: faker.name.fullName(),
        },
        {
            image_url: faker.image.avatar(),
            full_name: faker.name.fullName(),
        },
    ]
};

const argumentReply = {
    id: 415,
    content: faker.lorem.sentences(2),
    upvotes: 12,
    group_id: 417,
    is_reply: true,
    created_at: faker.date.recent(),
    is_deleted: false,
    score: 50,
    author: {
        image_url: faker.image.avatar(),
        full_name: faker.name.fullName(),
        hash_id: faker.lorem.slug(),
        slug: faker.lorem.slug(),
        points: 1320,
        last_activity: new Date(),
        description: faker.name.jobTitle()
    },
    position: {
        id: 2,
        name: "No",
        language: "en",
        translation_entries: []
    }
};

const argumentDeleted = {
    id: 416,
    content: faker.lorem.sentences(1),
    upvotes: 12,
    group_id: 417,
    is_reply: false,
    created_at: faker.date.recent(),
    is_deleted: true,
    score: 50,
    author: {
        image_url: faker.image.avatar(),
        full_name: faker.name.fullName(),
        hash_id: faker.lorem.slug(),
        slug: faker.lorem.slug(),
        points: 1320,
        last_activity: new Date(),
        description: faker.name.jobTitle()
    },
    position: {
        id: 2,
        name: "No",
        language: "en",
        translation_entries: []
    }
};

const debatePositions = [
    {
        id: 1,
        name: "Yes",
        language: "en",
        translation_entries: []
    },
    {
        id: 2,
        name: "No",
        language: "en",
        translation_entries: []
    },
];

const debateName = faker.lorem.sentence(5);

describe('Argument', () => {
    it ('should render argument correctly', () => {  
        const { getByText } = render(
            <BrowserRouter>
                <ConfigProvider routes={{ ...routes }} config={{ translation: { enable: false } }}>
                    <DataProviderContext.Provider value={{ dataProvider: data }}>
                        <AuthContext.Provider value={{ currentUser: currentUser, isLoggedIn: true }}>
                            <ResponsiveProvider>
                                <ModalProvider>
                                    <ListProvider>
                                        <ToastProvider>
                                            <VoteProvider>
                                                <IdProvider>
                                                    <InputProvider>
                                                        <IconProvider library={regularIcons}>
                                                            <IntlProvider locale="en">
                                                                <Argument
                                                                    argument={argument}
                                                                    debatePositions={debatePositions}
                                                                    debateName={debateName}
                                                                    nestingLevel={0}
                                                                    debateIsActive
                                                                />
                                                            </IntlProvider>
                                                        </IconProvider>
                                                    </InputProvider>
                                                </IdProvider>
                                            </VoteProvider>
                                        </ToastProvider>
                                    </ListProvider>
                                </ModalProvider>
                            </ResponsiveProvider>
                        </AuthContext.Provider>
                    </DataProviderContext.Provider>
                </ConfigProvider>
            </BrowserRouter>
        );

        expect(getByText(argument.author.full_name)).toBeInTheDocument();
        expect(getByText(argument.position.name)).toBeInTheDocument();
        expect(getByText("Reply")).toBeInTheDocument();
        expect(getByText("Share")).toBeInTheDocument();
    });

    it ('should render argument with replies', () => {  
        const { getByText, getByAltText } = render(
            <BrowserRouter>
                <ConfigProvider routes={{ ...routes }} config={{ translation: { enable: false } }}>
                    <DataProviderContext.Provider value={{ dataProvider: data }}>
                        <AuthContext.Provider value={{ currentUser: currentUser, isLoggedIn: true }}>
                            <ResponsiveProvider>
                                <ModalProvider>
                                    <ListProvider>
                                        <ToastProvider>
                                            <VoteProvider>
                                                <IdProvider>
                                                    <InputProvider>
                                                        <IconProvider library={regularIcons}>
                                                            <IntlProvider locale="en">
                                                                <Argument
                                                                    argument={argumentWithReplies}
                                                                    debatePositions={debatePositions}
                                                                    debateName={debateName}
                                                                    nestingLevel={0}
                                                                    debateIsActive
                                                                />
                                                            </IntlProvider>
                                                        </IconProvider>
                                                    </InputProvider>
                                                </IdProvider>
                                            </VoteProvider>
                                        </ToastProvider>
                                    </ListProvider>
                                </ModalProvider>
                            </ResponsiveProvider>
                        </AuthContext.Provider>
                    </DataProviderContext.Provider>
                </ConfigProvider>
            </BrowserRouter>
        );
        
        expect(getByText("View answers")).toBeInTheDocument();

        const user1Img = getByAltText(`${argumentWithReplies.replies_authors[0].full_name}'s profile picture`);
        const user2Img = getByAltText(`${argumentWithReplies.replies_authors[1].full_name}'s profile picture`);
        const user3Img = getByAltText(`${argumentWithReplies.replies_authors[2].full_name}'s profile picture`);
        expect(user1Img).toBeInTheDocument();
        expect(user2Img).toBeInTheDocument();
        expect(user3Img).toBeInTheDocument();
        expect(user1Img).toHaveAttribute('src', argumentWithReplies.replies_authors[0].image_url);
        expect(user2Img).toHaveAttribute('src', argumentWithReplies.replies_authors[1].image_url);
        expect(user3Img).toHaveAttribute('src', argumentWithReplies.replies_authors[2].image_url);
    });

    it ('should render argument as a reply', () => {  
        const { container } = render(
            <BrowserRouter>
                <ConfigProvider routes={{ ...routes }} config={{ translation: { enable: false } }}>
                    <DataProviderContext.Provider value={{ dataProvider: data }}>
                        <AuthContext.Provider value={{ currentUser: currentUser, isLoggedIn: true }}>
                            <ResponsiveProvider>
                                <ModalProvider>
                                    <ListProvider>
                                        <ToastProvider>
                                            <VoteProvider>
                                                <IdProvider>
                                                    <InputProvider>
                                                        <IconProvider library={regularIcons}>
                                                            <IntlProvider locale="en">
                                                                <Argument
                                                                    argument={argumentReply}
                                                                    debatePositions={debatePositions}
                                                                    debateName={debateName}
                                                                    nestingLevel={0}
                                                                    debateIsActive
                                                                />
                                                            </IntlProvider>
                                                        </IconProvider>
                                                    </InputProvider>
                                                </IdProvider>
                                            </VoteProvider>
                                        </ToastProvider>
                                    </ListProvider>
                                </ModalProvider>
                            </ResponsiveProvider>
                        </AuthContext.Provider>
                    </DataProviderContext.Provider>
                </ConfigProvider>
            </BrowserRouter>
        );

        const argumentContainer = container.querySelector(`#argument_${argumentReply.id}`);
        expect(argumentContainer).toHaveClass('argumentReply');
    });

    it ('should render comment argument', () => {  
        const { queryByText, getByTestId } = render(
            <BrowserRouter>
                <ConfigProvider routes={{ ...routes }} config={{ translation: { enable: false } }}>
                    <DataProviderContext.Provider value={{ dataProvider: data }}>
                        <AuthContext.Provider value={{ currentUser: currentUser, isLoggedIn: true }}>
                            <ResponsiveProvider>
                                <ModalProvider>
                                    <ListProvider>
                                        <ToastProvider>
                                            <VoteProvider>
                                                <IdProvider>
                                                    <InputProvider>
                                                        <IconProvider library={regularIcons}>
                                                            <IntlProvider locale="en">
                                                                <Argument
                                                                    argument={argument}
                                                                    debatePositions={debatePositions}
                                                                    debateName={debateName}
                                                                    nestingLevel={0}
                                                                    debateIsActive
                                                                    isComment
                                                                />
                                                            </IntlProvider>
                                                        </IconProvider>
                                                    </InputProvider>
                                                </IdProvider>
                                            </VoteProvider>
                                        </ToastProvider>
                                    </ListProvider>
                                </ModalProvider>
                            </ResponsiveProvider>
                        </AuthContext.Provider>
                    </DataProviderContext.Provider>
                </ConfigProvider>
            </BrowserRouter>
        );

        expect(queryByText("Share")).not.toBeInTheDocument();
        const replyButton = getByTestId('reply-button');
        expect(replyButton).toHaveClass('leftReply');
    });

    it ('should render deleted argument', () => {  
        const { queryByText } = render(
            <BrowserRouter>
                <ConfigProvider routes={{ ...routes }} config={{ translation: { enable: false } }}>
                    <DataProviderContext.Provider value={{ dataProvider: data }}>
                        <AuthContext.Provider value={{ currentUser: currentUser, isLoggedIn: true }}>
                            <ResponsiveProvider>
                                <ModalProvider>
                                    <ListProvider>
                                        <ToastProvider>
                                            <VoteProvider>
                                                <IdProvider>
                                                    <InputProvider>
                                                        <IconProvider library={regularIcons}>
                                                            <IntlProvider locale="en">
                                                                <Argument
                                                                    argument={argumentDeleted}
                                                                    debatePositions={debatePositions}
                                                                    debateName={debateName}
                                                                    replies={false}
                                                                    nestingLevel={0}
                                                                    debateIsActive
                                                                />
                                                            </IntlProvider>
                                                        </IconProvider>
                                                    </InputProvider>
                                                </IdProvider>
                                            </VoteProvider>
                                        </ToastProvider>
                                    </ListProvider>
                                </ModalProvider>
                            </ResponsiveProvider>
                        </AuthContext.Provider>
                    </DataProviderContext.Provider>
                </ConfigProvider>
            </BrowserRouter>
        );

        expect(queryByText(argument.author.full_name)).not.toBeInTheDocument();
        expect(queryByText("Deleted")).toBeInTheDocument();
        expect(queryByText("Content deleted by the user")).toBeInTheDocument();
    });

    it ('should render dropdown', async () => {  
        const { getByText, getByTestId } = render(
            <BrowserRouter>
                <ConfigProvider routes={{ ...routes }} config={{ translation: { enable: false } }}>
                    <DataProviderContext.Provider value={{ dataProvider: data }}>
                        <AuthContext.Provider value={{ currentUser: currentUser, isLoggedIn: true }}>
                            <ResponsiveProvider>
                                <ModalProvider>
                                    <ListProvider>
                                        <ToastProvider>
                                            <VoteProvider>
                                                <IdProvider>
                                                    <InputProvider>
                                                        <IconProvider library={regularIcons}>
                                                            <IntlProvider locale="en">
                                                                <Argument
                                                                    argument={argument}
                                                                    debatePositions={debatePositions}
                                                                    debateName={debateName}
                                                                    nestingLevel={0}
                                                                    debateIsActive
                                                                />
                                                            </IntlProvider>
                                                        </IconProvider>
                                                    </InputProvider>
                                                </IdProvider>
                                            </VoteProvider>
                                        </ToastProvider>
                                    </ListProvider>
                                </ModalProvider>
                            </ResponsiveProvider>
                        </AuthContext.Provider>
                    </DataProviderContext.Provider>
                </ConfigProvider>
            </BrowserRouter>
        );

        const dropdown = getByTestId("dropdown");
        await act(async () => { await userEvent.click(dropdown) });
        
        expect(getByText("Report")).toBeInTheDocument();
    });

    it ('should add vote', async () => {  
        const { getByText, getByTestId, queryByText } = render(
            <BrowserRouter>
                <ConfigProvider routes={{ ...routes }} config={{ translation: { enable: false } }}>
                    <DataProviderContext.Provider value={{ dataProvider: data }}>
                        <AuthContext.Provider value={{ currentUser: currentUser, isLoggedIn: true }}>
                            <ResponsiveProvider>
                                <ModalProvider>
                                    <ListProvider>
                                        <ToastProvider>
                                            <VoteProvider>
                                                <IdProvider>
                                                    <InputProvider>
                                                        <IconProvider library={regularIcons}>
                                                            <IntlProvider locale="en">
                                                                <Argument
                                                                    argument={argument}
                                                                    debatePositions={debatePositions}
                                                                    debateName={debateName}
                                                                    nestingLevel={0}
                                                                    debateIsActive
                                                                />
                                                            </IntlProvider>
                                                        </IconProvider>
                                                    </InputProvider>
                                                </IdProvider>
                                            </VoteProvider>
                                        </ToastProvider>
                                    </ListProvider>
                                </ModalProvider>
                            </ResponsiveProvider>
                        </AuthContext.Provider>
                    </DataProviderContext.Provider>
                </ConfigProvider>
            </BrowserRouter>
        );

        expect(getByText("0")).toBeInTheDocument();
        expect(queryByText("1")).not.toBeInTheDocument();
        const voteButton = getByTestId("vote-button");
        await act(async () => { await userEvent.click(voteButton) });
        
        expect(getByText("1")).toBeInTheDocument();
        expect(queryByText("0")).not.toBeInTheDocument();
    });

    it ('should render argument input', async () => {  
        const { getByText, getByTestId } = render(
            <BrowserRouter>
                <ConfigProvider routes={{ ...routes }} config={{ translation: { enable: false } }}>
                    <DataProviderContext.Provider value={{ dataProvider: data }}>
                        <AuthContext.Provider value={{ currentUser: currentUser, isLoggedIn: true }}>
                            <ResponsiveProvider>
                                <ModalProvider>
                                    <ListProvider>
                                        <ToastProvider>
                                            <VoteProvider>
                                                <IdProvider>
                                                    <InputProvider>
                                                        <IconProvider library={regularIcons}>
                                                            <IntlProvider locale="en">
                                                                <Argument
                                                                    argument={argument}
                                                                    debatePositions={debatePositions}
                                                                    debateName={debateName}
                                                                    nestingLevel={0}
                                                                    debateIsActive
                                                                />
                                                            </IntlProvider>
                                                        </IconProvider>
                                                    </InputProvider>
                                                </IdProvider>
                                            </VoteProvider>
                                        </ToastProvider>
                                    </ListProvider>
                                </ModalProvider>
                            </ResponsiveProvider>
                        </AuthContext.Provider>
                    </DataProviderContext.Provider>
                </ConfigProvider>
            </BrowserRouter>
        );

        const replyButton = getByTestId("action-reply-button");
        await act(async () => { await userEvent.click(replyButton) });
        
        expect(getByText("Your position")).toBeInTheDocument();
        expect(getByText("Your answer")).toBeInTheDocument();
        expect(getByText(debatePositions[1].name)).toBeInTheDocument();
    });
});