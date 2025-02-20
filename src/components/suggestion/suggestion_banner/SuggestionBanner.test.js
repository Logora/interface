import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SuggestionBanner } from './SuggestionBanner';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import { ConfigProvider } from '@logora/debate.data.config_provider';
import { ResponsiveProvider } from '@logora/debate.hooks.use_responsive';
import { ModalProvider } from '@logora/debate.dialog.modal';
import { Location } from '@logora/debate.util.location';
import { dataProvider, DataProviderContext } from '@logora/debate.data.data_provider';
import { AuthContext } from '@logora/debate.auth.use_auth';
import { ListProvider } from '@logora/debate.list.list_provider';
import { VoteProvider } from '@logora/debate.vote.vote_provider';
import { ToastProvider } from '@logora/debate.dialog.toast_provider';
import { faker } from '@faker-js/faker';
import * as regularIcons from '@logora/debate.icons.regular_icons';

const SuggestionBannerShowLocation = new Location('espace-debat/suggestions');

const routes = {
    suggestionLocation: SuggestionBannerShowLocation
};

const config = {
    modules: {
        suggestions: {
            vote_goal: 30
        }
    }
};

const createFakeSuggestion = (id, authorName, suggestionName) => ({
    id,
    created_at: faker.date.recent().toISOString(),
    expires_at: faker.date.future().toISOString(),
    total_upvotes: faker.datatype.number({ min: 0, max: 100 }),
    total_downvotes: faker.datatype.number({ min: 0, max: 100 }),
    is_accepted: false,
    is_expired: false,
    is_published: false,
    group: {
        slug: faker.lorem.slug()
    },
    author: {
        id: faker.datatype.number(),
        full_name: authorName,
        image_url: faker.image.avatar()
    },
    language: faker.random.locale(),
    translation_entries: [],
    name: suggestionName
});

const vote = {
    id: faker.datatype.number(),
    voteable_type: faker.lorem.word(),
    voteable_id: faker.datatype.number(),
    user_id: faker.datatype.number()
};

const suggestions = [
    createFakeSuggestion(1, "First Author", "First Suggestion"),
    createFakeSuggestion(2, "Second Author", "Second Suggestion")
];

const httpClient = {
    get: () => Promise.resolve({
        data: {
            success: true,
            data: [suggestions[0]]
        }
    }),
    post: () => Promise.resolve({
        data: { success: true, data: { resource: {} } }
    })
};

const currentUser = { id: vote.user_id };

const data = dataProvider(httpClient, "https://mock.example.api");

const Providers = ({ children }) => (
    <MemoryRouter>
        <ConfigProvider config={config} routes={routes}>
            <DataProviderContext.Provider value={{ dataProvider: data }}>
                <AuthContext.Provider value={{ currentUser, isLoggedIn: true }}>
                    <ResponsiveProvider>
                        <ModalProvider>
                            <ListProvider>
                                <ToastProvider>
                                    <VoteProvider>
                                        <IntlProvider locale="en">
                                            <IconProvider library={regularIcons}>
                                                {children}
                                            </IconProvider>
                                        </IntlProvider>
                                    </VoteProvider>
                                </ToastProvider>
                            </ListProvider>
                        </ModalProvider>
                    </ResponsiveProvider>
                </AuthContext.Provider>
            </DataProviderContext.Provider>
        </ConfigProvider>
    </MemoryRouter>
);

const renderSuggestionBanner = () => render(
    <Providers>
        <SuggestionBanner />
    </Providers>
);

describe('SuggestionBanner', () => {
    it('renders the title and description correctly', () => {
        const { getByText } = renderSuggestionBanner();

        expect(getByText('Suggest a debate question')).toBeInTheDocument();
        expect(getByText('Propose your own debate question and vote for your favourite. Questions that generate community interest are submitted to the editorial team.')).toBeInTheDocument();
    });

    it('should render SuggestionBox correctly', async () => {
        const { getByText } = renderSuggestionBanner();

        const button = getByText('Suggest');
        expect(button).toBeInTheDocument();
        const expectedHref = `/${routes.suggestionLocation.toUrl()}`;
        expect(button.closest('a')).toHaveAttribute('href', expectedHref);

        await waitFor(() => {
            expect(getByText(suggestions[0].name)).toBeInTheDocument();
            expect(getByText(suggestions[0].author.full_name)).toBeInTheDocument();
            expect(getByText(`${suggestions[0].total_upvotes} supports`)).toBeInTheDocument();
        });
    });

    it('renders empty state when there are no suggestions', async () => {
        const httpClient = {
            get: () => Promise.resolve({ data: { success: true, data: [] } }),
            post: () => Promise.resolve({ data: { success: true, data: { resource: {} } } })
        };

        const data = dataProvider(httpClient, "https://mock.example.api");

        const { getByText } = render(
            <Providers>
                <DataProviderContext.Provider value={{ dataProvider: data }}>
                    <SuggestionBanner />
                </DataProviderContext.Provider>
            </Providers>
        );

        await waitFor(() => {
            expect(getByText('Add suggestion')).toBeInTheDocument();
        });
    });

    /*
    it('loads next suggestion after downvoting', async () => {
        const testSuggestions = [
            createFakeSuggestion(1, "First Author", "First Suggestion"),
            createFakeSuggestion(2, "Second Author", "Second Suggestion")
        ];
        let currentPage = 1;
        const httpClient = {
            get: () => Promise.resolve({ 
                data: { success: true, data: [testSuggestions[currentPage - 1]] },
                headers: { total: testSuggestions.length }
            }),
            post: () => Promise.resolve({ data: { success: true, data: { resource: {} } } })
        };

        const { getByText, getByTestId } = render(
            <Providers>
                <DataProviderContext.Provider value={{ dataProvider: dataProvider(httpClient, "https://mock.example.api") }}>
                    <SuggestionBanner />
                </DataProviderContext.Provider>
            </Providers>
        );

        await waitFor(() => {
            expect(getByText("First Suggestion")).toBeInTheDocument();
            expect(getByText("First Author")).toBeInTheDocument();
        });

        currentPage = 2;
        await userEvent.click(getByTestId("downvote-button"));

        await waitFor(() => {
            expect(getByText("Second Suggestion")).toBeInTheDocument();
            expect(getByText("Second Author")).toBeInTheDocument();
        });
    });

    it('shows empty state after voting on last suggestion', async () => {
        const lastSuggestion = [createFakeSuggestion(1, "Last Author", "Last Suggestion")];
        let currentPage = 1;
        const httpClient = {
            get: () => Promise.resolve({ 
                data: { success: true, data: currentPage === 1 ? lastSuggestion : [] },
                headers: { total: 1 }
            }),
            post: () => Promise.resolve({ data: { success: true, data: { resource: {} } } })
        };

        const { getByText, getByTestId } = render(
            <Providers>
                <DataProviderContext.Provider value={{ dataProvider: dataProvider(httpClient, "https://mock.example.api") }}>
                    <SuggestionBanner />
                </DataProviderContext.Provider>
            </Providers>
        );

        await waitFor(() => {
            expect(getByText("Last Suggestion")).toBeInTheDocument();
            expect(getByText("Last Author")).toBeInTheDocument();
        });

        currentPage = 2;
        await userEvent.click(getByTestId("upvote-button"));

        await waitFor(() => {
            expect(getByText("Add suggestion")).toBeInTheDocument();
        });
    });
    */
});
