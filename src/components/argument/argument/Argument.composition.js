import React from 'react';
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

export const DefaultArgument = () => {
    return (
        <div style={{ width: "400px", height: "240px" }}>
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
        </div>
    );
};

export const ArgumentIsComment = () => {
    return (
        <div style={{ width: "400px", height: "230px" }}>
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
                                                                    replies={false}
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
        </div>
    );
};

export const ArgumentReply = () => {
    return (
        <div style={{ width: "400px", height: "230px" }}>
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
                                                                    replies={false}
                                                                    nestingLevel={1}
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
        </div>
    );
};

export const DeletedArgument = () => {
    return (
        <div style={{ width: "400px" }}>
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
        </div>
    );
};

export const ArgumentWithReplies = () => {
    return (
        <div style={{ width: "400px", height: "260px" }}>
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
        </div>
    );
};