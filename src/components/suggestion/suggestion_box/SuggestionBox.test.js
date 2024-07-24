// SuggestionBox.test.js
import React from 'react';
import { screen, render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SuggestionBox } from './SuggestionBox';
import { IntlProvider } from 'react-intl';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import { ConfigProvider } from '@logora/debate.data.config_provider';
import { dataProvider, DataProviderContext } from '@logora/debate.data.data_provider';
import { MemoryRouter } from 'react-router';
import { AuthContext } from '@logora/debate.auth.use_auth';
import { ModalProvider } from '@logora/debate.dialog.modal';
import { ListProvider } from '@logora/debate.list.list_provider';
import { ResponsiveProvider } from '@logora/debate.hooks.use_responsive';
import { ToastProvider } from '@logora/debate.dialog.toast_provider';
import { VoteProvider } from '@logora/debate.vote.vote_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';
import { faker } from '@faker-js/faker';
import { waitFor } from '@testing-library/react';

const generateSuggestion = (overrides) => ({
  id: faker.datatype.number(),
  created_at: faker.date.recent().toISOString(),
  expires_at: faker.date.future().toISOString(),
  total_upvotes: faker.datatype.number({ min: 0, max: 100 }),
  total_downvotes: faker.datatype.number({ min: 0, max: 100 }),
  is_accepted: faker.datatype.boolean(),
  is_expired: faker.datatype.boolean(),
  is_published: faker.datatype.boolean(),
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
  ...overrides
});

const suggestion = generateSuggestion();

const config = {
  modules: {
    suggestions: {
      vote_goal: 30
    }
  }
};

const httpClient = {
  post: () => Promise.resolve({ data: { success: true, data: {} } }),
};

const currentUser = {};
const data = dataProvider(httpClient, "https://mock.example.api");

describe('SuggestionBox', () => {
  it('renders suggestion box with default props', async () => {
    render(
      <MemoryRouter>
        <ConfigProvider config={config}>
          <DataProviderContext.Provider value={{ dataProvider: data }}>
            <AuthContext.Provider value={{ currentUser, isLoggedIn: true }}>
              <ResponsiveProvider>
                <ModalProvider>
                  <ListProvider>
                    <ToastProvider>
                      <VoteProvider>
                        <IntlProvider locale="en">
                          <IconProvider library={regularIcons}>
                            <SuggestionBox suggestion={suggestion} disabled={false} />
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

    expect(screen.getByText(suggestion.name)).toBeTruthy();
    await waitFor(() => {
        expect(screen.getByText((content, element) => {
            return content.includes(`Votes: ${suggestion.total_upvotes}`);
        })).toBeTruthy();
      });
  });


});