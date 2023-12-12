import React from 'react';
import { render } from '@testing-library/react';
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
import { DefaultContentFooter } from './ContentFooter.composition';

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
    upvotes: 10,
    total_upvotes: 10,
    total_downvotes: 8,
}

const currentUser = {
    id: resource.author.id,
}

describe('ContentFooter', () => {
    it('should render correctly', () => {
        const { queryByText } = render(
            <DefaultContentFooter resource={resource} />
        );

        expect(queryByText(resource.upvotes)).toBeInTheDocument();
        expect(queryByText("Reply")).toBeInTheDocument();
        expect(queryByText("Share")).toBeInTheDocument();
    });
});
