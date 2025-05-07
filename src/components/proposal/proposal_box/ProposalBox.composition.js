import React from 'react';
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
import { InputProvider } from '@logora/debate.input.input_provider';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import { ResponsiveProvider } from '@logora/debate.hooks.use_responsive';
import * as regularIcons from '@logora/debate.icons.regular_icons';
import { faker } from '@faker-js/faker';
import { ProposalBox } from './ProposalBox';

// Mock data and constants
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
    get: () => Promise.resolve({ data: { success: true, data: [] } }),
    post: (url, data, config) => {
        return Promise.resolve({ 
            data: { 
                success: true, 
                data: { resource: vote } 
            } 
        });
    },
    patch: () => null,
    delete: () => Promise.resolve({ data: { success: true, data: {} }})
};

const currentUser = { id: vote.user_id };
const data = dataProvider(httpClient, "https://mock.example.api");

const generateProposal = (overrides) => ({
    id: faker.datatype.number(),
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(2),
    created_at: faker.date.recent(),
    edited_at: null,
    total_upvotes: faker.datatype.number(100),
    total_downvotes: faker.datatype.number(50),
    language: "en",
    translation_entries: [],
    author: {
        id: faker.datatype.number(),
        image_url: faker.image.avatar(),
        full_name: faker.name.fullName(),
        hash_id: faker.lorem.slug(),
        slug: faker.lorem.slug(),
        points: faker.datatype.number(5000),
        last_activity: new Date(),
        description: faker.name.jobTitle()
    },
    ...overrides
});

const proposal = generateProposal();
const longProposal = generateProposal({ 
    content: faker.lorem.paragraphs(5),
    title: faker.lorem.sentences(2)
});
const editedProposal = generateProposal({ edited_at: faker.date.recent() });

const Providers = ({ children }) => (
    <BrowserRouter>
        <ConfigProvider routes={{ ...routes }} config={{ translation: { enable: true } }}>
            <DataProviderContext.Provider value={{ dataProvider: data }}>
                <AuthContext.Provider value={{ currentUser, isLoggedIn: true }}>
                    <ResponsiveProvider>
                        <ModalProvider>
                            <ListProvider>
                                <ToastProvider>
                                    <VoteProvider>
                                        <InputProvider>
                                            <IconProvider library={regularIcons}>
                                                <IntlProvider locale="en">
                                                    {children}
                                                </IntlProvider>
                                            </IconProvider>
                                        </InputProvider>
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

// Component exports
export const DefaultProposal = () => (
    <div style={{ width: "400px", height: "240px" }}>
        <Providers>
            <ProposalBox 
                proposal={proposal}
            />
        </Providers>
    </div>
);

export const LongProposal = () => (
    <div style={{ width: "400px"}}>
        <Providers>
            <ProposalBox 
                proposal={longProposal}
            />
        </Providers>
    </div>
);

export const EditedProposal = () => (
    <div style={{ width: "400px", height: "240px" }}>
        <Providers>
            <ProposalBox 
                proposal={editedProposal}
            />
        </Providers>
    </div>
);

export const ProposalWithTag = () => {
    const taggedProposal = generateProposal({
        tag: {
            display_name: faker.lorem.word(),
            color: faker.internet.color()
        }
    });
    
    return (
        <div style={{ width: "400px", height: "240px" }}>
            <Providers>
                <ProposalBox 
                    proposal={taggedProposal}
                />
            </Providers>
        </div>
    );
};