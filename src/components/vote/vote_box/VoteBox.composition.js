import React from 'react';
import { IntlProvider } from 'react-intl';
import { VoteBox } from './VoteBox';
import { ConfigProvider } from '@logora/debate.data.config_provider';
import { BrowserRouter } from 'react-router-dom';
import { Location } from '@logora/debate.util.location';
import { ModalProvider } from '@logora/debate.dialog.modal';
import { dataProvider, DataProviderContext } from '@logora/debate.data.data_provider';
import { AuthContext } from '@logora/debate.auth.use_auth';
import { VoteProvider } from '@logora/debate.vote.vote_provider';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';
import { ToastProvider } from '@logora/debate.dialog.toast_provider';
import { faker } from '@faker-js/faker';

const routes = {
    debateShowLocation: new Location('espace-debat/debate/:debateSlug', { debateSlug: '' })
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

const votePositions = [
    { id: 1, name: 'Yes' },
    { id: 2, name: 'No' },
];

const threeVotePositions = [
    { id: 1, name: 'Yes' },
    { id: 2, name: 'No' },
    { id: 3, name: 'No Opinion' },
];

const debate = {
    id: faker.datatype.number(),
    votes_count: {
        total: 15,
        1: 10,
        2: 5,
    }
};

const debateThreeVotePositions = {
    id: 1,
    votes_count: {
        1: "10",
        2: "8",
        3: "6",
        total: "24"
    }
};

const data = dataProvider(httpClient, "https://mock.example.api");

export const DefaultVoteBox = () => {
    return (
        <div style={{ width: "400px" }}>
            <BrowserRouter>
                <IntlProvider locale="en">
                    <DataProviderContext.Provider value={{ dataProvider: data }}>
                        <AuthContext.Provider value={{ currentUser: currentUser, isLoggedIn: true }}>
                            <IconProvider library={regularIcons}>
                                <ToastProvider>
                                    <ConfigProvider config={{}} routes={{ ...routes }}>
                                        <ModalProvider>
                                            <VoteProvider>
                                                <VoteBox 
                                                    voteableId={debate.id}
                                                    numberVotes={debate.votes_count}
                                                    voteableType={"Group"}
                                                    votePositions={votePositions}
                                                    displayColumn
                                                />
                                            </VoteProvider>
                                        </ModalProvider>
                                    </ConfigProvider>
                                </ToastProvider>
                            </IconProvider>
                        </AuthContext.Provider>
                    </DataProviderContext.Provider>
                </IntlProvider>
            </BrowserRouter>
        </div>
    );
};

export const VoteBoxRow = () => {
    return (
        <div style={{ width: "400px" }}>
            <BrowserRouter>
                <IntlProvider locale="en">
                    <DataProviderContext.Provider value={{ dataProvider: data }}>
                        <AuthContext.Provider value={{ currentUser: currentUser, isLoggedIn: true }}>
                            <IconProvider library={regularIcons}>
                                <ToastProvider>
                                    <ConfigProvider config={{}} routes={{ ...routes }}>
                                        <ModalProvider>
                                            <VoteProvider>
                                                <VoteBox 
                                                    voteableId={debate.id}
                                                    numberVotes={debate.votes_count}
                                                    voteableType={"Group"}
                                                    votePositions={votePositions}
                                                />
                                            </VoteProvider>
                                        </ModalProvider>
                                    </ConfigProvider>
                                </ToastProvider>
                            </IconProvider>
                        </AuthContext.Provider>
                    </DataProviderContext.Provider>
                </IntlProvider>
            </BrowserRouter>
        </div>
    );
};

export const VoteBoxFullWidth = () => {
    return (
        <div style={{ width: "400px" }}>
            <BrowserRouter>
                <IntlProvider locale="en">
                    <DataProviderContext.Provider value={{ dataProvider: data }}>
                        <AuthContext.Provider value={{ currentUser: currentUser, isLoggedIn: true }}>
                            <IconProvider library={regularIcons}>
                                <ToastProvider>
                                    <ConfigProvider config={{}} routes={{ ...routes }}>
                                        <ModalProvider>
                                            <VoteProvider>
                                                <VoteBox 
                                                    voteableId={debate.id}
                                                    numberVotes={debate.votes_count}
                                                    voteableType={"Group"}
                                                    votePositions={votePositions}
                                                    displayColumn
                                                    textAlignLeft
                                                />
                                            </VoteProvider>
                                        </ModalProvider>
                                    </ConfigProvider>
                                </ToastProvider>
                            </IconProvider>
                        </AuthContext.Provider>
                    </DataProviderContext.Provider>
                </IntlProvider>
            </BrowserRouter>
        </div>
    );
};

export const VoteBoxNeutralPosition = () => {
    return (
        <div style={{ width: "400px" }}>
            <BrowserRouter>
                <IntlProvider locale="en">
                    <DataProviderContext.Provider value={{ dataProvider: data }}>
                        <AuthContext.Provider value={{ currentUser: currentUser, isLoggedIn: true }}>
                            <IconProvider library={regularIcons}>
                                <ToastProvider>
                                    <ConfigProvider config={{}} routes={{ ...routes }}>
                                        <ModalProvider>
                                            <VoteProvider>
                                                <VoteBox 
                                                    voteableId={debateThreeVotePositions.id}
                                                    numberVotes={debateThreeVotePositions.votes_count}
                                                    voteableType={"Group"}
                                                    votePositions={threeVotePositions}
                                                    displayColumn
                                                />
                                            </VoteProvider>
                                        </ModalProvider>
                                    </ConfigProvider>
                                </ToastProvider>
                            </IconProvider>
                        </AuthContext.Provider>
                    </DataProviderContext.Provider>
                </IntlProvider>
            </BrowserRouter>
        </div>
    );
};

export const VoteBoxDisabled = () => {
    return (
        <div style={{ width: "400px" }}>
            <BrowserRouter>
                <IntlProvider locale="en">
                    <DataProviderContext.Provider value={{ dataProvider: data }}>
                        <AuthContext.Provider value={{ currentUser: currentUser, isLoggedIn: true }}>
                            <IconProvider library={regularIcons}>
                                <ToastProvider>
                                    <ConfigProvider config={{}} routes={{ ...routes }}>
                                        <ModalProvider>
                                            <VoteProvider>
                                                <VoteBox 
                                                    voteableId={debateThreeVotePositions.id}
                                                    numberVotes={debateThreeVotePositions.votes_count}
                                                    voteableType={"Group"}
                                                    votePositions={threeVotePositions}
                                                    displayColumn
                                                    disabled
                                                />
                                            </VoteProvider>
                                        </ModalProvider>
                                    </ConfigProvider>
                                </ToastProvider>
                            </IconProvider>
                        </AuthContext.Provider>
                    </DataProviderContext.Provider>
                </IntlProvider>
            </BrowserRouter>
        </div>
    );
};

export const VoteBoxRedirect = () => {
    return (
        <div style={{ width: "400px" }}>
            <BrowserRouter>
                <IntlProvider locale="en">
                    <DataProviderContext.Provider value={{ dataProvider: data }}>
                        <AuthContext.Provider value={{ currentUser: currentUser, isLoggedIn: true }}>
                            <IconProvider library={regularIcons}>
                                <ToastProvider>
                                    <ConfigProvider config={{}} routes={{ ...routes }}>
                                        <ModalProvider>
                                            <VoteProvider>
                                                <VoteBox 
                                                    voteableId={debateThreeVotePositions.id}
                                                    numberVotes={debateThreeVotePositions.votes_count}
                                                    voteableType={"Group"}
                                                    votePositions={threeVotePositions}
                                                    displayColumn
                                                    redirectUrl={"myUrl"}
                                                />
                                            </VoteProvider>
                                        </ModalProvider>
                                    </ConfigProvider>
                                </ToastProvider>
                            </IconProvider>
                        </AuthContext.Provider>
                    </DataProviderContext.Provider>
                </IntlProvider>
            </BrowserRouter>
        </div>
    );
};