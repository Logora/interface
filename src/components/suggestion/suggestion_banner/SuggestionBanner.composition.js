import React from 'react';
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

let SuggestionBannerShowLocation = new Location('espace-debat/suggestions');

const routes = {
    suggestionLocation: SuggestionBannerShowLocation
};

const vote = {
    id: faker.datatype.number(),
    voteable_type: faker.lorem.word(),
    voteable_id: faker.datatype.number(),
    user_id: faker.datatype.number()
};

const suggestion = [{
    id: faker.datatype.number(),
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
        full_name: faker.name.fullName(),
        image_url: faker.image.avatar()
    },
    language: faker.random.locale(),
    translation_entries: [],
    name: faker.lorem.words(),
}];

const httpClient = {
    get: () =>
        Promise.resolve({
            data: {
                success: true,
                data:
                    suggestion

            }
        }),
    post: () => {
        return new Promise(function (resolve) {
            resolve({ data: { success: true, data: { resource: vote } } });
        });
    }

};

const currentUser = {
    id: faker.datatype.number(),
    full_name: faker.name.fullName(),
    image_url: faker.image.avatar(),
    points: faker.datatype.number()
}

const data = dataProvider(httpClient, "https://mock.example.api");

export const DefaultSuggestionBanner = () => {
    return (
        <MemoryRouter>
            <ConfigProvider config={{}} routes={{ ...routes }}>
                <DataProviderContext.Provider value={{ dataProvider: data }}>
                    <AuthContext.Provider value={{ currentUser, isLoggedIn: true }}>
                        <ResponsiveProvider>
                            <ModalProvider>
                                <ListProvider>
                                    <ToastProvider>
                                        <VoteProvider>
                                            <IntlProvider locale="en">
                                                <IconProvider library={regularIcons}>
                                                    <SuggestionBanner />
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

export const EmptySuggestionBanner = () => {
    const httpClient = {
        get: () => Promise.resolve({ data: { success: true, data: [] } }),
        post: () => Promise.resolve({ data: { success: true, data: { resource: {} } } })
    };
    const data = dataProvider(httpClient, "https://mock.example.api");

    return (
        <MemoryRouter>
            <ConfigProvider config={{}} routes={{ ...routes }}>
                <DataProviderContext.Provider value={{ dataProvider: data }}>
                    <AuthContext.Provider value={{ currentUser, isLoggedIn: true }}>
                        <ResponsiveProvider>
                            <ModalProvider>
                                <ListProvider>
                                    <ToastProvider>
                                        <VoteProvider>
                                            <IntlProvider locale="en">
                                                <IconProvider library={regularIcons}>
                                                    <SuggestionBanner />
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
