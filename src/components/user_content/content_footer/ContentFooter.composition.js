import React from 'react';
import { ContentFooter } from './ContentFooter';
import { IntlProvider } from 'react-intl';
import { ConfigProvider } from '@logora/debate.data.config_provider';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';
import { ModalProvider } from '@logora/debate.dialog.modal';
import { AuthContext } from '@logora/debate.auth.use_auth';
import { ListProvider } from '@logora/debate.list.list_provider';
import { dataProvider, DataProviderContext } from '@logora/debate.data.data_provider';
import { ToastProvider } from '@logora/debate.dialog.toast_provider';
import { VoteProvider } from '@logora/debate.vote.vote_provider';
import { faker } from '@faker-js/faker';

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

const data = dataProvider(httpClient, "https://mock.example.api");

const resource = {
    id: faker.datatype.number(),
    author: {
        id: faker.datatype.number(),
    },
    created_at: faker.date.recent(),
    upvotes: 10,
    total_upvotes: 10,
    total_downvotes: 8,
}

const currentUser = {
    id: resource.author.id,
}

export const DefaultContentFooter = () => {
    return (
        <div style={{ width: "400px", height: "60px" }}>
            <IntlProvider locale="en">
                <ConfigProvider config={{ auth: { disableLoginModal: true } }}>
                    <DataProviderContext.Provider value={{ dataProvider: data }}>
                        <AuthContext.Provider value={{ currentUser: currentUser, isLoggedIn: true }}>
                            <ListProvider>
                                <IconProvider library={regularIcons}>
                                    <ModalProvider>
                                        <ToastProvider>
                                            <VoteProvider>
                                                <ContentFooter 
                                                    resource={resource || props.resource}
                                                    showActions
                                                    shareButton
                                                    enableReply
                                                    voteButton
                                                    shareUrl={"https://test.com"}
                                                    shareTitle={"Share title"}
                                                    shareText={"Share text"}
                                                    voteableType={vote.voteable_type}
                                                    showShareText
                                                    showShareCode
                                                    shareCode={"</>"}
                                                    positionIndex={1}
                                                />
                                            </VoteProvider>
                                        </ToastProvider>
                                    </ModalProvider>
                                </IconProvider>
                            </ListProvider>
                        </AuthContext.Provider>
                    </DataProviderContext.Provider>
                </ConfigProvider>
            </IntlProvider>
        </div>
    );
};

export const ContentFooterShareModal = () => {
    return (
        <div style={{ width: "400px", height: "60px" }}>
            <IntlProvider locale="en">
                <ConfigProvider config={{ auth: { disableLoginModal: true } }}>
                    <DataProviderContext.Provider value={{ dataProvider: data }}>
                        <AuthContext.Provider value={{ currentUser: currentUser, isLoggedIn: true }}>
                            <ListProvider>
                                <IconProvider library={regularIcons}>
                                    <ModalProvider>
                                        <ToastProvider>
                                            <VoteProvider>
                                                <ContentFooter 
                                                    resource={resource || props.resource}
                                                    showActions
                                                    shareModal
                                                    enableReply
                                                    voteButton
                                                    shareUrl={"https://test.com"}
                                                    shareTitle={"Share title"}
                                                    shareText={"Share text"}
                                                    voteableType={vote.voteable_type}
                                                    showShareText
                                                    showShareCode
                                                    shareCode={"</>"}
                                                    shareModalTitle={"Share content"}
                                                />
                                            </VoteProvider>
                                        </ToastProvider>
                                    </ModalProvider>
                                </IconProvider>
                            </ListProvider>
                        </AuthContext.Provider>
                    </DataProviderContext.Provider>
                </ConfigProvider>
            </IntlProvider>
        </div>
    );
};

export const ContentFooterUpDownVoteBox = () => {
    return (
        <div style={{ width: "400px", height: "60px" }}>
            <IntlProvider locale="en">
                <ConfigProvider config={{ auth: { disableLoginModal: true } }}>
                    <DataProviderContext.Provider value={{ dataProvider: data }}>
                        <AuthContext.Provider value={{ currentUser: currentUser, isLoggedIn: true }}>
                            <ListProvider>
                                <IconProvider library={regularIcons}>
                                    <ModalProvider>
                                        <ToastProvider>
                                            <VoteProvider>
                                                <ContentFooter 
                                                    resource={resource || props.resource}
                                                    showActions
                                                    shareModal
                                                    enableReply
                                                    upDownVoteBox
                                                    shareUrl={"https://test.com"}
                                                    shareTitle={"Share title"}
                                                    shareText={"Share text"}
                                                    voteableType={vote.voteable_type}
                                                    showShareText
                                                    showShareCode
                                                    shareCode={"</>"}
                                                    shareModalTitle={"Share content"}
                                                />
                                            </VoteProvider>
                                        </ToastProvider>
                                    </ModalProvider>
                                </IconProvider>
                            </ListProvider>
                        </AuthContext.Provider>
                    </DataProviderContext.Provider>
                </ConfigProvider>
            </IntlProvider>
        </div>
    );
};

export const ContentFooterDisabled = () => {
    return (
        <div style={{ width: "400px", height: "60px" }}>
            <IntlProvider locale="en">
                <ConfigProvider config={{ auth: { disableLoginModal: true } }}>
                    <DataProviderContext.Provider value={{ dataProvider: data }}>
                        <AuthContext.Provider value={{ currentUser: currentUser, isLoggedIn: true }}>
                            <ListProvider>
                                <IconProvider library={regularIcons}>
                                    <ModalProvider>
                                        <ToastProvider>
                                            <VoteProvider>
                                                <ContentFooter 
                                                    resource={resource || props.resource}
                                                    disabled
                                                    showActions
                                                    shareModal
                                                    enableReply
                                                    voteButton
                                                    shareUrl={"https://test.com"}
                                                    shareTitle={"Share title"}
                                                    shareText={"Share text"}
                                                    voteableType={vote.voteable_type}
                                                    showShareText
                                                    showShareCode
                                                    shareCode={"</>"}
                                                    shareModalTitle={"Share content"}
                                                />
                                            </VoteProvider>
                                        </ToastProvider>
                                    </ModalProvider>
                                </IconProvider>
                            </ListProvider>
                        </AuthContext.Provider>
                    </DataProviderContext.Provider>
                </ConfigProvider>
            </IntlProvider>
        </div>
    );
};

export const ContentFooterWithoutReply = () => {
    return (
        <div style={{ width: "400px", height: "60px" }}>
            <IntlProvider locale="en">
                <ConfigProvider config={{ auth: { disableLoginModal: true } }}>
                    <DataProviderContext.Provider value={{ dataProvider: data }}>
                        <AuthContext.Provider value={{ currentUser: currentUser, isLoggedIn: true }}>
                            <ListProvider>
                                <IconProvider library={regularIcons}>
                                    <ModalProvider>
                                        <ToastProvider>
                                            <VoteProvider>
                                                <ContentFooter 
                                                    resource={resource || props.resource}
                                                    showActions
                                                    shareButton
                                                    voteButton
                                                    shareUrl={"https://test.com"}
                                                    shareTitle={"Share title"}
                                                    shareText={"Share text"}
                                                    voteableType={vote.voteable_type}
                                                    showShareText
                                                    showShareCode
                                                    shareCode={"</>"}
                                                />
                                            </VoteProvider>
                                        </ToastProvider>
                                    </ModalProvider>
                                </IconProvider>
                            </ListProvider>
                        </AuthContext.Provider>
                    </DataProviderContext.Provider>
                </ConfigProvider>
            </IntlProvider>
        </div>
    );
};

export const ContentFooterLeftReply = () => {
    return (
        <div style={{ width: "400px", height: "60px" }}>
            <IntlProvider locale="en">
                <ConfigProvider config={{ auth: { disableLoginModal: true } }}>
                    <DataProviderContext.Provider value={{ dataProvider: data }}>
                        <AuthContext.Provider value={{ currentUser: currentUser, isLoggedIn: true }}>
                            <ListProvider>
                                <IconProvider library={regularIcons}>
                                    <ModalProvider>
                                        <ToastProvider>
                                            <VoteProvider>
                                                <ContentFooter 
                                                    resource={resource || props.resource}
                                                    showActions
                                                    shareModal
                                                    voteButton
                                                    shareUrl={"https://test.com"}
                                                    shareTitle={"Share title"}
                                                    shareText={"Share text"}
                                                    voteableType={vote.voteable_type}
                                                    showShareText
                                                    showShareCode
                                                    shareCode={"</>"}
                                                    shareModalTitle={"Share content"}
                                                    enableReply
                                                    leftReply
                                                />
                                            </VoteProvider>
                                        </ToastProvider>
                                    </ModalProvider>
                                </IconProvider>
                            </ListProvider>
                        </AuthContext.Provider>
                    </DataProviderContext.Provider>
                </ConfigProvider>
            </IntlProvider>
        </div>
    );
};