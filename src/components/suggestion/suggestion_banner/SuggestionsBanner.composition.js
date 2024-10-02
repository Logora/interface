import React from 'react';
import { SuggestionsBanner } from './SuggestionsBanner';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import { IntlProvider } from 'react-intl';
import { ConfigProvider } from '@logora/debate.data.config_provider';
import { ResponsiveProvider } from '@logora/debate.hooks.use_responsive';
import { ModalProvider } from '@logora/debate.dialog.modal';
import { Location } from '@logora/debate.util.location';
import { dataProvider, DataProviderContext } from '@logora/debate.data.data_provider';
import { AuthContext } from '@logora/debate.auth.use_auth';
import { ListProvider } from '@logora/debate.list.list_provider';
import { VoteProvider } from '@logora/debate.vote.vote_provider';
import { MemoryRouter } from 'react-router';
import { IdProvider } from "react-use-id-hook";
import { ToastProvider } from '@logora/debate.dialog.toast_provider';
import { faker } from '@faker-js/faker';
import * as regularIcons from '@logora/debate.icons.regular_icons';



let SuggestionBannerShowLocation = new Location('espace-debat/suggestions');

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
         Promise.resolve( {
                data: {
                    success: true,
                    data: 
                         suggestion
                    
                }
    }),
    post: () => {
        Promise.resolve({
         data: { success: true, data: {  } } });
    }


};

const currentUser = {
    id: faker.datatype.number(),
    full_name: faker.name.fullName(),
    image_url: faker.image.avatar(),
    points: faker.datatype.number()
}
const data = dataProvider(httpClient, "https://mock.example.api");

export const DefaultSuggestionsBanner = () => {
    return (
        <MemoryRouter>
            <ConfigProvider config={config} routes={{ ...routes }}>
                <DataProviderContext.Provider value={{ currentUser: currentUser, dataProvider: data }}>
                    <AuthContext.Provider value={{ isLoggedIn: true }}>
                        <ResponsiveProvider>
                            <ModalProvider>
                                <ListProvider>
                                    <ToastProvider>
                                        <VoteProvider>
                                            <IdProvider>
                                                <IntlProvider locale="en">
                                                    <IconProvider library={regularIcons}>
                                                        <SuggestionsBanner />
                                                    </IconProvider>
                                                </IntlProvider>
                                            </IdProvider>
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

