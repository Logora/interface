import React from 'react';
import { act } from 'react';
import { render, waitFor } from '@testing-library/react';
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
import { IdProvider } from "react-use-id-hook";
import { Argument } from './Argument';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import { ResponsiveProvider } from '@logora/debate.hooks.use_responsive';
import * as regularIcons from '@logora/debate.icons.regular_icons';
import { InputProvider, useInput } from '@logora/debate.input.input_provider';
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
    get: () => Promise.resolve({ data: { success: true, data: [argumentReply] } }),
    post: (url, data, config) => {
        return new Promise((resolve, reject) => {
            let response;
            if (url.includes('vote')) {
                response = { data: { success: true, data: { resource: vote } } };
            } else if (url.includes('messages')) {
                response = { data: { success: true, data: { resource: argumentReply } } };
            } else {
                reject(new Error("Unknown endpoint"));
                return;
            }
            resolve(response);
        })
    },
    patch: () => null,
    delete: (url, data, config) => new Promise((resolve) => resolve({ data: { success: true, data: {} } }))
};

const currentUser = { id: vote.user_id };
const data = dataProvider(httpClient, "https://mock.example.api");

const createArgument = overrides => ({
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
    },
    ...overrides
});

const argument = createArgument();
const argumentWithReplies = createArgument({
    content: faker.lorem.sentences(2),
    number_replies: 3,
    replies_authors: [
        { image_url: faker.image.avatar(), full_name: faker.name.fullName() },
        { image_url: faker.image.avatar(), full_name: faker.name.fullName() },
        { image_url: faker.image.avatar(), full_name: faker.name.fullName() }
    ]
});
const argumentReply = createArgument({
    id: 415,
    is_reply: true,
    upvotes: 12,
    reply_to_id: argument.id,
    position: { id: 2, name: "No", language: "en" }
});
const argumentDeleted = createArgument({
    id: 416,
    is_deleted: true,
    content: faker.lorem.sentences(1),
    upvotes: 12
});
const debatePositions = [
    { id: 1, name: "Yes", language: "en", translation_entries: [] },
    { id: 2, name: "No", language: "en", translation_entries: [] }
];
const debateName = faker.lorem.sentence(5);

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

const Providers = ({ children }) => (
    <BrowserRouter>
        <ConfigProvider routes={{ ...routes }} config={{ translation: { enable: false } }}>
            <DataProviderContext.Provider value={{ dataProvider: data }}>
                <AuthContext.Provider value={{ currentUser, isLoggedIn: true }}>
                    <ResponsiveProvider>
                        <ModalProvider>
                            <ListProvider>
                                <ToastProvider>
                                    <VoteProvider>
                                        <IdProvider>
                                            <InputProvider>
                                                <IconProvider library={regularIcons}>
                                                    <IntlProvider locale="en">
                                                        <AddContentComponent />
                                                        {children}
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

const renderArgument = (props) => render(
    <Providers>
        <Argument {...props} />
    </Providers>
);

describe('Argument', () => {
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

    it('should render argument correctly', () => {
        const { getByText } = renderArgument({
            argument,
            debatePositions,
            debateName,
            nestingLevel: 0,
        });

        expect(getByText(argument.author.full_name)).toBeInTheDocument();
        expect(getByText(argument.position.name)).toBeInTheDocument();
        expect(getByText("Reply")).toBeInTheDocument();
        expect(getByText("Share")).toBeInTheDocument();
    });

    it('should render argument with replies', () => {
        const { getByText, getByAltText } = renderArgument({
            argument: argumentWithReplies,
            debatePositions,
            debateName,
            nestingLevel: 0,
        });

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

    it('should render argument as a reply', () => {
        const { container } = renderArgument({
            argument: argumentReply,
            debatePositions,
            debateName,
            nestingLevel: 0,
        });

        const argumentContainer = container.querySelector(`#argument_${argumentReply.id}`);
        expect(argumentContainer).toHaveClass('argumentReply');
    });

    it('should render comment argument', () => {
        const { queryByText, getByTestId } = renderArgument({
            argument,
            debatePositions,
            debateName,
            nestingLevel: 0,
            isComment: true
        });

        expect(queryByText("Share")).not.toBeInTheDocument();
        const replyButton = getByTestId('reply-button');
        expect(replyButton).toHaveClass('leftReply');
    });

    it('should render deleted argument', () => {
        const { queryByText } = renderArgument({
            argument: argumentDeleted,
            debatePositions,
            debateName,
            replies: false,
            nestingLevel: 0,
        });

        expect(queryByText(argumentDeleted.author.full_name)).not.toBeInTheDocument();
        expect(queryByText("Deleted")).toBeInTheDocument();
        expect(queryByText("Content deleted by the user")).toBeInTheDocument();
    });

    it('should render dropdown', async () => {
        const { getByText, getByTestId } = renderArgument({
            argument,
            debatePositions,
            debateName,
            nestingLevel: 0,
        });

        const dropdown = getByTestId("dropdown");
        await act(async () => { await userEvent.click(dropdown) });
        expect(getByText("Report")).toBeInTheDocument();
    });

    it('should add vote', async () => {
        const { getByText, getByTestId, queryByText } = renderArgument({
            argument,
            debatePositions,
            debateName,
            nestingLevel: 0,
        });

        expect(getByText("0")).toBeInTheDocument();
        expect(queryByText("1")).not.toBeInTheDocument();
        const voteButton = getByTestId("vote-button");
        await act(async () => { await userEvent.click(voteButton) });
        expect(getByText("1")).toBeInTheDocument();
        expect(queryByText("0")).not.toBeInTheDocument();
    });

    it('should render argument input', async () => {
        const { getByText, getByTestId } = renderArgument({
            argument,
            debatePositions,
            debateName,
            nestingLevel: 0,
        });

        const replyButton = getByTestId("action-reply-button");
        await act(async () => { await userEvent.click(replyButton) });
        expect(getByText("Your position")).toBeInTheDocument();
        expect(getByText("Your answer")).toBeInTheDocument();
        expect(getByText(debatePositions[1].name)).toBeInTheDocument();
    });

    it('should allow the user to add a reply to an argument', async () => {
        const { getByTestId, getByText } = renderArgument({
            argument,
            debatePositions: [
                { id: 1, name: 'Yes', language: 'en', translation_entries: [] },
                { id: 2, name: 'No', language: 'en', translation_entries: [] },
            ],
            debateName: 'Test Debate',
            nestingLevel: 0,
        });

        const replyButton = getByText('Reply');
        await act(async () => {
            await userEvent.click(replyButton);
        });

        const positionButton = getByText(debatePositions[1].name);
        await act(async () => {
            await userEvent.click(positionButton);
        });

        const setContentButton = getByText("Click to set content");
        await act(async () => { await userEvent.click(setContentButton) });
        expect(getByText("I write an argument")).toBeInTheDocument();

        const submitButton = getByTestId('submit-button');
        await act(async () => {
            await userEvent.click(submitButton);
        });

        expect(getByText("Your contribution has been sent !")).toBeInTheDocument();
    });
    
});