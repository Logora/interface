import React from 'react';
import { render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
import { DefaultContentFooter, ContentFooterShareModal, ContentFooterUpDownVoteBox, ContentFooterDisabled, ContentFooterWithoutReply, ContentFooterLeftReply, ContentFooterProgressBar, ContentFooterWithoutEdition, ContentFooterWithoutDeletion } from './ContentFooter.composition';
import { VoteButton } from '@logora/debate.vote.vote_button';

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
}

describe('ContentFooter', () => {
    it('should render correctly', async () => {
        const { queryByText, queryByTestId } = render(
            <DefaultContentFooter />
        );

        expect(queryByText(10)).toBeInTheDocument();
        expect(queryByText("Reply")).toBeInTheDocument();
        expect(queryByText("Share")).toBeInTheDocument();
        expect(queryByTestId("reply-button")).not.toHaveClass("leftReply");

        const dropdown = queryByTestId("dropdown");
        await userEvent.click(dropdown)

        expect(queryByText("Update")).toBeInTheDocument();
        expect(queryByText("Delete")).toBeInTheDocument();
        expect(queryByText("Report")).toBeInTheDocument();

        const deleteModal = queryByText("Delete");
        await userEvent.click(deleteModal)

        expect(queryByText("Delete content")).toBeInTheDocument();
    });

    it('should render correctly with a disconnected user', async () => {
        const { queryByText, queryByTestId } = render(
            <IntlProvider locale="en">
                <ConfigProvider config={{ auth: { disableLoginModal: true } }}>
                    <DataProviderContext.Provider value={{ dataProvider: data }}>
                        <AuthContext.Provider value={{currentUser: { id: 1 }, isLoggedIn: false}}>
                            <ListProvider>
                                <IconProvider library={regularIcons}>
                                    <ModalProvider>
                                        <ToastProvider>
                                            <VoteProvider>
                                                <ContentFooter 
                                                    resource={resource}
                                                    showActions
                                                    shareButton
                                                    enableReply
                                                    shareUrl={"https://test.com"}
                                                    shareTitle={"Share title"}
                                                    shareText={"Share text"}
                                                    showShareText
                                                    showShareCode
                                                    shareCode={"</>"}
                                                >
                                                    <VoteButton
                                                        voteableType={"Message"}
                                                        voteableId={45}
                                                        totalUpvote={10}
                                                        totalDownvote={0}
                                                        disabled={false}
                                                    />
                                                </ContentFooter>
                                            </VoteProvider>
                                        </ToastProvider>
                                    </ModalProvider>
                                </IconProvider>
                            </ListProvider>
                        </AuthContext.Provider>
                    </DataProviderContext.Provider>
                </ConfigProvider>
            </IntlProvider>
        );

        expect(queryByText(10)).toBeInTheDocument();
        expect(queryByText("Reply")).toBeInTheDocument();
        expect(queryByText("Share")).toBeInTheDocument();
        expect(queryByTestId("reply-button")).not.toHaveClass("leftReply");

        const dropdown = queryByTestId("dropdown");
        await userEvent.click(dropdown)

        expect(queryByText("Update")).toBeNull();
        expect(queryByText("Delete")).toBeNull();
        expect(queryByText("Report")).toBeInTheDocument();
    });

    it('should render without edition', async () => {
        const { queryByText, queryByTestId } = render(
            <ContentFooterWithoutEdition />
        );

        expect(queryByText(10)).toBeInTheDocument();
        expect(queryByText("Reply")).toBeInTheDocument();
        expect(queryByText("Share")).toBeInTheDocument();
        expect(queryByTestId("reply-button")).not.toHaveClass("leftReply");

        const dropdown = queryByTestId("dropdown");
        await userEvent.click(dropdown)

        expect(queryByText("Update")).toBeNull();
        expect(queryByText("Delete")).toBeInTheDocument();
        expect(queryByText("Report")).toBeInTheDocument();
    });

    it('should render without edition', async () => {
        const { queryByText, queryByTestId } = render(
            <ContentFooterWithoutDeletion />
        );

        expect(queryByText(10)).toBeInTheDocument();
        expect(queryByText("Reply")).toBeInTheDocument();
        expect(queryByText("Share")).toBeInTheDocument();
        expect(queryByTestId("reply-button")).not.toHaveClass("leftReply");

        const dropdown = queryByTestId("dropdown");
        await userEvent.click(dropdown)

        expect(queryByText("Update")).toBeInTheDocument();
        expect(queryByText("Delete")).toBeNull();
        expect(queryByText("Report")).toBeInTheDocument();
    });

    it('should render with share modal', async () => {
        const { queryByText, queryByTestId } = render(
            <ContentFooterShareModal />
        );

        expect(queryByText(10)).toBeInTheDocument();
        expect(queryByText("Reply")).toBeInTheDocument();
        expect(queryByText("Share")).toBeNull();
        expect(queryByTestId("reply-button")).not.toHaveClass("leftReply");

        const dropdown = queryByTestId("dropdown");
        await act(async () => { await userEvent.click(dropdown) });

        expect(queryByText("Update")).toBeInTheDocument();
        expect(queryByText("Delete")).toBeInTheDocument();
        expect(queryByText("Report")).toBeInTheDocument();
        expect(queryByText("Share")).toBeInTheDocument();

        const shareModal = queryByText("Share");
        await act(async () => { await userEvent.click(shareModal) });

        expect(queryByText("Share content")).toBeInTheDocument();
    });

    it('should render with up down vote box', async () => {
        const { queryByText } = render(
            <ContentFooterUpDownVoteBox />
        );

        expect(queryByText('10 supporters')).toBeInTheDocument();
        expect(queryByText('5 opponents')).toBeInTheDocument();
        expect(queryByText("Reply")).toBeNull();
        expect(queryByText("Share")).toBeNull();
    });

    it('should be disabled', async () => {
        const { queryByText } = render(
            <ContentFooterDisabled />
        );

        expect(queryByText(10)).toBeInTheDocument();
        expect(queryByText("Reply")).toBeNull();
        expect(queryByText("Share")).toBeNull();

        const voteButton = queryByText(10);
        await userEvent.click(voteButton);

        expect(queryByText(10)).toBeInTheDocument();
    });

    it('should render without reply', async () => {
        const { queryByText } = render(
            <ContentFooterWithoutReply />
        );

        expect(queryByText(10)).toBeInTheDocument();
        expect(queryByText("Reply")).toBeNull();
        expect(queryByText("Share")).toBeInTheDocument();
    });

    it('should render with left reply', async () => {
        const { queryByText, queryByTestId } = render(
            <ContentFooterLeftReply />
        );

        expect(queryByText(10)).toBeInTheDocument();
        expect(queryByText("Reply")).toBeInTheDocument();
        expect(queryByTestId("reply-button")).toHaveClass("leftReply");
        expect(queryByText("Share")).toBeNull();
    });

    it('should render with progress bar', async () => {
        const { queryByText, queryByTestId } = render(
            <ContentFooterProgressBar />
        );

        expect(queryByText(10)).toBeNull();
        expect(queryByText("Reply")).toBeNull();
        expect(queryByTestId("reply-button")).toBeNull();
        expect(queryByText("Share")).toBeNull();
        expect(queryByText("Nice progress !")).toBeInTheDocument();
        expect(queryByText("25/30 supports")).toBeInTheDocument();
    });
});