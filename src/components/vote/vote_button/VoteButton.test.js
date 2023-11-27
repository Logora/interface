import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from 'react-intl';
import { VoteButton } from './VoteButton';
import { VoteProvider } from '@logora/debate.vote.vote_provider';
import { dataProvider, DataProviderContext } from '@logora/debate.data.data_provider';
import { AuthContext } from '@logora/debate.auth.use_auth';
import { ConfigProvider } from '@logora/debate.data.config_provider';
import { ModalProvider } from '@logora/debate.dialog.modal';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';
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

const currentUser = {
    id: vote.user_id,
}

const data = dataProvider(httpClient, "https://mock.example.api");

describe('VoteButton', () => {
    it('should render correct upvotes', () => {
        const { queryByText } = render(
            <ConfigProvider config={{}}>
                <IntlProvider locale='en'>
                    <DataProviderContext.Provider value={{ dataProvider: data }}>
                        <IconProvider library={regularIcons}>
                            <AuthContext.Provider value={{ currentUser: currentUser, isLoggedIn: true }}>
                                <ModalProvider>
                                    <VoteProvider>
                                        <VoteButton
                                            voteableType={vote.voteable_type}
                                            voteableId={vote.voteable_id}
                                            totalUpvote={10}
                                            totalDownvote={0}
                                        />
                                    </VoteProvider>
                                </ModalProvider>
                            </AuthContext.Provider>
                        </IconProvider>
                    </DataProviderContext.Provider>
                </IntlProvider>
            </ConfigProvider>
        );

        expect(queryByText(10)).toBeInTheDocument();
    });

    it('should add user upvote', async () => {
        const container = render(
            <ConfigProvider config={{}}>
                <IntlProvider locale='en'>
                    <DataProviderContext.Provider value={{ dataProvider: data }}>
                        <IconProvider library={regularIcons}>
                            <AuthContext.Provider value={{ currentUser: currentUser, isLoggedIn: true }}>
                                <ModalProvider>
                                    <VoteProvider>
                                        <VoteButton
                                            voteableType={vote.voteable_type}
                                            voteableId={vote.voteable_id}
                                            totalUpvote={10}
                                            totalDownvote={0}
                                        />
                                    </VoteProvider>
                                </ModalProvider>
                            </AuthContext.Provider>
                        </IconProvider>
                    </DataProviderContext.Provider>
                </IntlProvider>
            </ConfigProvider>
        );

        expect(container.queryByText(10)).toBeInTheDocument();
        const voteButton = container.getByTestId("vote-button");
        await userEvent.click(voteButton);

        expect(container.queryByText(11)).toBeInTheDocument();
    });

    it('should add user upvote and delete it when clicking again', async () => {
        const container = render(
            <ConfigProvider config={{}}>
                <IntlProvider locale='en'>
                    <DataProviderContext.Provider value={{ dataProvider: data }}>
                        <IconProvider library={regularIcons}>
                            <AuthContext.Provider value={{ currentUser: currentUser, isLoggedIn: true }}>
                                <ModalProvider>
                                    <VoteProvider>
                                        <VoteButton
                                            voteableType={vote.voteable_type}
                                            voteableId={vote.voteable_id}
                                            totalUpvote={5}
                                            totalDownvote={0}
                                        />
                                    </VoteProvider>
                                </ModalProvider>
                            </AuthContext.Provider>
                        </IconProvider>
                    </DataProviderContext.Provider>
                </IntlProvider>
            </ConfigProvider>
        );

        expect(container.getByText(5)).toBeInTheDocument();

        const voteButton = container.getByTestId("vote-button");
        await userEvent.click(voteButton);
        expect(container.getByText(6)).toBeInTheDocument();

        await userEvent.click(voteButton);
        expect(container.getByText(5)).toBeInTheDocument();
    });

    it('should do nothing if disabled', async () => {
        const container = render(
            <ConfigProvider config={{}}>
                <IntlProvider locale='en'>
                    <DataProviderContext.Provider value={{ dataProvider: data }}>
                        <IconProvider library={regularIcons}>
                            <AuthContext.Provider value={{ currentUser: currentUser, isLoggedIn: true }}>
                                <ModalProvider>
                                    <VoteProvider>
                                        <VoteButton
                                            voteableType={vote.voteable_type}
                                            voteableId={vote.voteable_id}
                                            totalUpvote={50}
                                            totalDownvote={0}
                                            disabled
                                        />
                                    </VoteProvider>
                                </ModalProvider>
                            </AuthContext.Provider>
                        </IconProvider>
                    </DataProviderContext.Provider>
                </IntlProvider>
            </ConfigProvider>
        );

        expect(container.getByText(50)).toBeInTheDocument();
        const voteButton = container.getByTestId("vote-button");
        await userEvent.click(voteButton);

        expect(container.getByText(50)).toBeInTheDocument();
    });
});
