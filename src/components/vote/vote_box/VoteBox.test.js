import React from 'react';
import { render, within, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VoteBox } from './VoteBox';
import { IntlProvider } from 'react-intl';
import { ConfigProvider } from '@logora/debate.data.config_provider';
import { BrowserRouter } from 'react-router-dom';
import { Location } from '@logora/debate.util.location';
import { ModalProvider } from '@logora/debate.dialog.modal';
import { dataProvider, DataProviderContext } from '@logora/debate.data.data_provider';
import { AuthContext } from '@logora/debate.auth.use_auth';
import { VoteProvider } from '@logora/debate.vote.vote_provider';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import { ToastProvider } from '@logora/debate.dialog.toast_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';
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

const debate = {
    id: faker.datatype.number(),
    votes_count: {
        total: 10,
        1: 5,
        2: 5,
        3: 0
    },
    debate_members: [
        {
          position: { id: 1 },
          user: { image_url: 'image_url_1', full_name: 'User 1' },
        },
        {
          position: { id: 2 },
          user: { image_url: 'image_url_2', full_name: 'User 2' },
        },
        {
          position: { id: 3 },
          user: { image_url: 'image_url_3', full_name: 'User 3' },
        },
    ],
};

const votePositions = [
    { id: 1, name: 'Position 1' },
    { id: 2, name: 'Position 2' },
    { id: 3, name: 'Position 3' },
];

const data = dataProvider(httpClient, "https://mock.example.api");

const VoteBoxWrapper = (props) => {
    return(
        <BrowserRouter>
            <IntlProvider locale="en">
                <DataProviderContext.Provider value={{ dataProvider: data }}>
                    <AuthContext.Provider value={{ currentUser: currentUser, isLoggedIn: true }}>
                        <IconProvider library={regularIcons}>
                            <ToastProvider>
                                <ConfigProvider config={{}} routes={{ ...routes }}>
                                    <ModalProvider>
                                        <VoteProvider>
                                            {props.children}
                                        </VoteProvider>
                                    </ModalProvider>
                                </ConfigProvider>
                            </ToastProvider>
                        </IconProvider>
                    </AuthContext.Provider>
                </DataProviderContext.Provider>
            </IntlProvider>
        </BrowserRouter>
    )
};

describe('VoteBox Component', () => {

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

    it('should render component correctly', () => {
        const { getByText, getAllByTestId } = render(
            <VoteBoxWrapper>
                <VoteBox 
                    voteableType={vote.voteable_type}
                    votePositions={votePositions}
                    debate={debate}
                />
            </VoteBoxWrapper>
        );

        const voteButtons = getAllByTestId('voteButton');
        expect(voteButtons).toHaveLength(3);
        expect(voteButtons[0].getAttribute('title')).toBe('Position 1');
        expect(voteButtons[1].getAttribute('title')).toBe('Position 2');
        expect(voteButtons[2].getAttribute('title')).toBe('Position 3');

        const voteCountText = getByText('10 votes -');
        expect(voteCountText).toBeInTheDocument();
    });

    it('should call callback', async () => {
        const onVote = jest.fn();
        const { getByTitle } = render(
            <VoteBoxWrapper>
                <VoteBox 
                    voteableType={vote.voteable_type}
                    votePositions={votePositions}
                    debate={debate}
                    onVote={onVote}
                />
            </VoteBoxWrapper>
        );

        const button = getByTitle('Position 1');
        await act(async () => { await userEvent.click(button) });
        expect(onVote).toHaveBeenCalled();
    });

    it('should show result when disabled', () => {
        const { getAllByText, queryByText } = render(
            <VoteBoxWrapper>
                <VoteBox 
                    voteableType={vote.voteable_type}
                    votePositions={votePositions}
                    debate={debate}
                    disabled={true}
                />
            </VoteBoxWrapper>
        );
        
        const resultPercentages = getAllByText(/\d+%$/i);
        expect(resultPercentages).toHaveLength(3);
        expect(within(resultPercentages[0]).getByText("50%")).toBeInTheDocument();
        expect(within(resultPercentages[1]).getByText("50%")).toBeInTheDocument();
        expect(within(resultPercentages[2]).getByText("0%")).toBeInTheDocument();

        const modify = queryByText('Modify');
        const backToVote = queryByText('Back to vote');
        expect(modify).toBeNull();
        expect(backToVote).toBeNull();
    });

    it('should display results', async () => {
        const { getByTestId, getByText, getAllByText } = render(
            <VoteBoxWrapper>
                <VoteBox 
                    voteableType={vote.voteable_type}
                    votePositions={votePositions}
                    debate={debate}
                />
            </VoteBoxWrapper>
        );

        const showResultLink = getByTestId('show-result');
        expect(showResultLink).toBeInTheDocument();
        await act(async () => { await userEvent.click(showResultLink) });

        const backToVote = getByText('Back to vote');
        const resultHeadings = getAllByText(/position \d/i);
        const resultPercentages = getAllByText(/\d+%$/i);
        expect(backToVote).toBeInTheDocument();
        expect(resultHeadings).toHaveLength(3);
        expect(resultPercentages).toHaveLength(3);
        expect(within(resultPercentages[0]).getByText("50%")).toBeInTheDocument();
        expect(within(resultPercentages[1]).getByText("50%")).toBeInTheDocument();
        expect(within(resultPercentages[2]).getByText("0%")).toBeInTheDocument();
    });

    it('should add vote', async () => {
        const { getByTitle, queryByText, getAllByText } = render(
            <VoteBoxWrapper>
                <VoteBox 
                    votePositions={votePositions}
                    debate={debate}
                />
            </VoteBoxWrapper>
        );

        const position1 = getByTitle('Position 1');
        expect(queryByText('Modify')).toBeNull();
        expect(queryByText('Show result')).toBeInTheDocument();

        await act(async () => { await userEvent.click(position1) });
        expect(queryByText('11 votes')).toBeInTheDocument();
        expect(queryByText('Modify')).toBeInTheDocument();
        expect(queryByText('Show result')).toBeNull();
        const resultPercentages = getAllByText(/\d+%$/i);
        expect(within(resultPercentages[0]).getByText("55%")).toBeInTheDocument();
        expect(within(resultPercentages[1]).getByText("45%")).toBeInTheDocument();
        expect(within(resultPercentages[2]).getByText("0%")).toBeInTheDocument();

        await act(async () => { await userEvent.click(queryByText('Modify')) });
        expect(queryByText('Show result')).toBeInTheDocument();
        expect(queryByText('Modify')).toBeNull();
    });
});