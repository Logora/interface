import React from 'react';
import { SuggestionBox } from './SuggestionBox';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import { IconProvider } from '@logora/debate/icons/icon_provider';
import { ConfigProvider } from '@logora/debate/data/config_provider';
import { dataProvider, DataProviderContext } from '@logora/debate/data/data_provider';
import { AuthContext } from '@logora/debate/auth/use_auth';
import { ModalProvider } from '@logora/debate/dialog/modal';
import { ListProvider } from '@logora/debate/list/list_provider';
import { ResponsiveProvider } from '@logora/debate/hooks/use_responsive';
import { ToastProvider } from '@logora/debate/dialog/toast_provider';
import { VoteProvider } from '@logora/debate/vote/vote_provider';
import { Location } from '@logora/debate/util/location';
import * as regularIcons from '@logora/debate/icons/regular_icons';
import { faker } from '@faker-js/faker';


let DebateShowLocation = new Location('espace-debat/group/:debateSlug', { debateSlug: "" })

const routes = {
    debateShowLocation: DebateShowLocation
}

const vote = {
    id: faker.number.int(),
    voteable_type: faker.lorem.word(),
    voteable_id: faker.number.int(),
    user_id: faker.number.int()
};

const currentUser = {
    id: faker.number.int(),
    full_name: faker.person.fullName(),
    image_url: faker.image.avatarGitHub(),
    points: faker.number.int()
}

const generateSuggestion = (groupOverrides, suggestionOverrides) => ({
    id: faker.number.int(),
    name: faker.lorem.words(),
    slug: faker.lorem.slug(),
    created_at: faker.date.recent().toISOString(),
    score: faker.number.int(),
    language: faker.helpers.arrayElement(['en', 'fr', 'es']),
    is_active: true,
    messages_count: faker.number.int(),
    is_published: false,
    published_at: faker.date.recent().toISOString(),
    debate_suggestion: {
        id: faker.number.int(),
        created_at: faker.date.recent().toISOString(),
        expires_at: faker.date.future().toISOString(),
        total_upvotes: 20,
        total_downvotes: faker.number.int({ min: 0, max: 100 }),
        is_accepted: false,
        is_expired: false,
        author: {
            id: faker.number.int(),
            full_name: faker.person.fullName(),
            image_url: faker.image.avatarGitHub()
        },
        language: faker.helpers.arrayElement(['en', 'fr', 'es']),
        translation_entries: [],
        name: faker.lorem.words(),
        ...suggestionOverrides
    },
    ...groupOverrides
});

const suggestion = generateSuggestion({ is_published: false }, { is_accepted: false, is_expired: false });

const publishedSuggestion = generateSuggestion({ is_published: true }, { is_accepted: true, is_expired: false });


const config = {
    modules: {
        suggestions: {
            vote_goal: 30
        }
    }
};

const httpClient = {
    post: () => {
        return new Promise((resolve) => {
            resolve({ data: { success: true, data: { resource: vote } } });
        });
    }
};


const data = dataProvider(httpClient, "https://mock.example.api");

// Composant SuggestionBox par défaut
export const DefaultSuggestionBox = () => {
    return (
        <MemoryRouter>
            <ConfigProvider routes={{ ...routes }} config={config}>
                <DataProviderContext.Provider value={{ dataProvider: data }}>
                    <AuthContext.Provider value={{ currentUser: currentUser, isLoggedIn: true }}>
                        <ResponsiveProvider>
                            <ModalProvider>
                                <ListProvider>
                                    <ToastProvider>
                                        <VoteProvider>
                                            <IntlProvider locale="en">
                                                <IconProvider library={regularIcons}>
                                                    <SuggestionBox
                                                        suggestion={suggestion}
                                                        disabled={false}
                                                    />
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
};

// Composant SuggestionBox désactivé
export const DisabledSuggestionBox = () => {
    return (
        <MemoryRouter>
            <ConfigProvider routes={{ ...routes }} config={config}>
                <DataProviderContext.Provider value={{ dataProvider: data }}>
                    <AuthContext.Provider value={{ currentUser: currentUser, isLoggedIn: true }}>
                        <ResponsiveProvider>
                            <ModalProvider>
                                <ListProvider>
                                    <ToastProvider>
                                        <VoteProvider>
                                            <IntlProvider locale="en">
                                                <IconProvider library={regularIcons}>
                                                    <SuggestionBox
                                                        suggestion={suggestion}
                                                        disabled={true}
                                                    />
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
};

// Composant SuggestionBox publié
export const PublishedSuggestionBox = () => {
    return (
        <MemoryRouter>
            <ConfigProvider routes={{ ...routes }} config={config}>
                <DataProviderContext.Provider value={{ dataProvider: data }}>
                    <AuthContext.Provider value={{ currentUser: currentUser, isLoggedIn: true }}>
                        <ResponsiveProvider>
                            <ModalProvider>
                                <ListProvider>
                                    <ToastProvider>
                                        <VoteProvider>
                                            <IntlProvider locale="en">
                                                <IconProvider library={regularIcons}>
                                                    <SuggestionBox
                                                        suggestion={publishedSuggestion}
                                                        disabled={false}
                                                    />
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
};