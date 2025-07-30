import ReportBox from "./ReportBox";
import React from 'react';
import { IntlProvider } from 'react-intl';
import { ConfigProvider } from '@logora/debate.data.config_provider';
import { BrowserRouter } from 'react-router-dom';
import { dataProvider, DataProviderContext } from '@logora/debate.data.data_provider';

import { AuthContext } from '@logora/debate.auth.use_auth';
import { ModalProvider } from '@logora/debate.dialog.modal';
import { ListProvider } from '@logora/debate.list.list_provider';
import { ToastProvider } from '@logora/debate.dialog.toast_provider';
import { VoteProvider } from '@logora/debate.vote.vote_provider';
import { InputProvider } from '@logora/debate.input.input_provider';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import { ResponsiveProvider } from '@logora/debate.hooks.use_responsive';
import { faker } from '@faker-js/faker';

import * as regularIcons from '@logora/debate.icons.regular_icons';

const vote = {
  id: faker.datatype.number(),
  voteable_type: faker.lorem.word(),
  voteable_id: faker.datatype.number(),
  user_id: faker.datatype.number()
};
const currentUser = { id: vote.user_id };

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
  delete: () => Promise.resolve({ data: { success: true, data: {} } })
};
const data = dataProvider(httpClient, "https://mock.example.api");

const reportArgumentPending =
{
  id: 1,
  classification: "INCOHERENT",
  description: faker.lorem.sentence(),
  is_processed: false,
  reportable_type: "Message",
  created_at: faker.date.recent().toISOString(),
  reportable: {
    id: 84,
    content: faker.lorem.sentence(),
    author: { full_name: faker.name.fullName() },
    created_at: faker.date.recent().toISOString(),
    upvotes: 10,
    language: "en",
    status: "pending",
  },
  author: {
    full_name: faker.name.fullName(),
  },
  position: {
    id: 1,
    name: "Yes",
    language: "en",
    translation_entries: []
  },
};
const config = {
  modules: {
    suggestions: {
      vote_goal: 30
    },
  }
};

const reportProposal =
{
  id: 1,
  classification: "INCOHERENT",
  description: faker.lorem.sentence(),
  is_processed: true,
  reportable_type: "Proposal",
  created_at: faker.date.recent().toISOString(),
  reportable: {
    id: 84,
    content: faker.lorem.sentence(),
    author: { full_name: faker.name.fullName() },
    created_at: faker.date.recent().toISOString(),
    upvotes: 10,
    language: "en",
    status: "accepted",
  },
  author: {
    full_name: faker.name.fullName(),
  },
  position: {
    id: 1,
    name: "Yes",
    language: "en",
    translation_entries: []
  },
};

const reportSuggestion =
{
  id: 1,
  classification: "INCOHERENT",
  description: faker.lorem.sentence(),
  is_processed: true,
  reportable_type: "Group",
  created_at: faker.date.recent().toISOString(),
  reportable: {
    id: 84,
    content: faker.lorem.sentence(),
    author: { full_name: faker.name.fullName() },
    created_at: faker.date.recent().toISOString(),
    upvotes: 10,
    language: "en",
    status: "accepted",
    name: faker.lorem.words(),
    slug: faker.lorem.slug(),
    created_at: faker.date.recent().toISOString(),
    score: faker.datatype.number(),
    language: faker.random.locale(),
    is_active: true,
    messages_count: faker.datatype.number(),
    is_published: false,
    published_at: faker.date.recent().toISOString(),
    debate_suggestion: {
      id: faker.datatype.number(),
      created_at: faker.date.recent().toISOString(),
      expires_at: faker.date.future().toISOString(),
      total_upvotes: 20,
      total_downvotes: faker.datatype.number({ min: 0, max: 100 }),
      is_accepted: false,
      is_expired: false,
      author: {
        id: faker.datatype.number(),
        full_name: faker.name.fullName(),
        image_url: faker.image.avatar()
      },
      language: faker.random.locale(),
      translation_entries: [],
      name: faker.lorem.words(),
    },
  },
  author: {
    full_name: faker.name.fullName(),
  },
  position: {
    id: 1,
    name: "Yes",
    language: "en",
    translation_entries: []
  },
};


const reportArgumentAccepted =
{
  id: 1,
  classification: "INCOHERENT",
  description: faker.lorem.sentence(),
  is_processed: true,
  reportable_type: "Message",
  created_at: faker.date.recent().toISOString(),
  reportable: {
    id: 84,
    content: faker.lorem.sentence(),
    author: { full_name: faker.name.fullName() },
    created_at: faker.date.recent().toISOString(),
    upvotes: 10,
    language: "en",
    status: "rejected",
    moderation_entry: {
      status: "rejected"
    },
  },
  author: {
    full_name: faker.name.fullName(),
  },
  position: {
    id: 1,
    name: "Yes",
    language: "en",
    translation_entries: []
  },
};


const reportArgumentRejected =
{
  id: 1,
  classification: "INCOHERENT",
  description: faker.lorem.sentence(),
  is_processed: true,
  reportable_type: "Message",
  created_at: faker.date.recent().toISOString(),
  reportable: {
    id: 84,
    content: faker.lorem.sentence(),
    author: { full_name: "Jean Dupont" },
    created_at: faker.date.recent().toISOString(),
    upvotes: 10,
    language: "en",
    status: "accepted",
    moderation_entry: {
      status: "accepted"
    },
  },
  author: {
    full_name: faker.name.fullName(),
  },
  position: {
    id: 1,
    name: "Yes",
    language: "en",
    translation_entries: []
  },
};
const Providers = ({ children }) => (
  <BrowserRouter>
    <ConfigProvider config={config}>
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
export const ReportArgumentPending = () => (
  <div style={{ width: "400px", height: "240px" }}>
    <Providers>
      <ReportBox
        report={reportArgumentPending}
      />
    </Providers>
  </div>
);

export const ReportArgumentRejected = () => (
  <div style={{ width: "400px", height: "240px" }}>
    <Providers>
      <ReportBox
        report={reportArgumentRejected}
      />
    </Providers>
  </div>
);

export const ReportArgumentAccepted = () => (
  <div style={{ width: "400px", height: "240px" }}>
    <Providers>
      <ReportBox
        report={reportArgumentAccepted}
      />
    </Providers>
  </div>
);

export const ReportProposal = () => (
  <div style={{ width: "400px", height: "240px" }}>
    <Providers>
      <ReportBox
        report={reportProposal}
      />
    </Providers>
  </div>
);

export const ReportSuggestion = () => (

  <div style={{ width: "400px", height: "240px" }}>
    <Providers>
      <ReportBox
        report={reportSuggestion}
      />
    </Providers>
  </div>
);

export const ReportArgumentWithPositionStyles = () => {
  const reportWithStyledPosition = {
    id: 1,
    classification: "INCOHERENT",
    description: faker.lorem.sentence(),
    is_processed: false,
    reportable_type: "Message",
    created_at: faker.date.recent().toISOString(),
    reportable: {
      id: 101,
      content:faker.lorem.sentence(),
      author: { full_name: "Alice Durand" },
      created_at: faker.date.recent().toISOString(),
      upvotes: 42,
      language: "fr",
      status: "pending",
      position: {
        id: 1,
        name: "Yes",
        language: "fr"
      }
    },
    author: {
      full_name: "Modérateur",
    },
  };
  return (
      <Providers>
        <ReportBox report={reportWithStyledPosition} />
      </Providers>
  );
};
















