import React from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from '@logora/debate/data/config_provider';
import { dataProvider, DataProviderContext } from '@logora/debate/data/data_provider';
import { AuthContext } from '@logora/debate/auth/use_auth';
import { ModalProvider } from '@logora/debate/dialog/modal';
import { ListProvider } from '@logora/debate/list/list_provider';
import { ToastProvider } from '@logora/debate/dialog/toast_provider';
import { VoteProvider } from '@logora/debate/vote/vote_provider';
import { InputProvider } from '@logora/debate/input/input_provider';
import { IconProvider } from '@logora/debate/icons/icon_provider';
import { ResponsiveProvider } from '@logora/debate/hooks/use_responsive';
import { faker } from '@faker-js/faker';
import * as regularIcons from '@logora/debate/icons/regular_icons';
import ReportBox from './ReportBox';

const vote = {
  id: faker.number.int(),
  voteable_type: faker.lorem.word(),
  voteable_id: faker.number.int(),
  user_id: faker.number.int()
};

const currentUser = { id: vote.user_id };

const httpClient = {
  get: () => Promise.resolve({ data: { success: true, data: [] } }),
  post: () => Promise.resolve({ data: { success: true, data: { resource: vote } } }),
  patch: () => null,
  delete: () => Promise.resolve({ data: { success: true, data: {} } })
};

const data = dataProvider(httpClient, 'https://mock.example.api');

const config = {
  modules: {
    suggestions: {
      vote_goal: 30
    }
  }
};

const reportArgumentPending = {
  id: 1,
  classification: 'INCOHERENT',
  description: faker.lorem.sentence(),
  is_processed: false,
  reportable_type: 'Message',
  created_at: faker.date.recent().toISOString(),
  reportable: {
    id: 84,
    content: faker.lorem.sentence(),
    author: { full_name: faker.person.fullName() },
    created_at: faker.date.recent().toISOString(),
    upvotes: 10,
    language: 'en',
    status: 'pending'
  },
  author: {
    full_name: faker.person.fullName()
  },
  position: {
    id: 1,
    name: 'Yes',
    language: 'en',
    translation_entries: []
  }
};

const reportArgumentAccepted = {
  ...reportArgumentPending,
  is_processed: true,
  reportable: {
    ...reportArgumentPending.reportable,
    status: 'rejected',
    moderation_entry: {
      status: 'rejected'
    }
  }
};

const reportArgumentRejected = {
  ...reportArgumentPending,
  is_processed: true,
  reportable: {
    ...reportArgumentPending.reportable,
    author: { full_name: 'Jean Dupont' },
    status: 'accepted',
    moderation_entry: {
      status: 'accepted'
    }
  }
};

const reportProposal = {
  ...reportArgumentPending,
  is_processed: true,
  reportable_type: 'Proposal',
  reportable: {
    ...reportArgumentPending.reportable,
    status: 'accepted'
  }
};

const reportSuggestion = {
  ...reportArgumentPending,
  is_processed: true,
  reportable_type: 'Group',
  reportable: {
    ...reportArgumentPending.reportable,
    status: 'accepted',
    name: faker.lorem.words(),
    slug: faker.lorem.slug(),
    score: faker.number.int(),
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
      name: faker.lorem.words()
    }
  }
};

const reportWithPositions = {
  id: 999,
  classification: 'INCOHERENT',
  description: faker.lorem.sentence(),
  is_processed: true,
  reportable_type: 'Message',
  created_at: new Date().toISOString(),
  reportable: {
    id: 123,
    content: faker.lorem.sentence(),
    author: { full_name: 'Jean Jean' },
    created_at: new Date().toISOString(),
    upvotes: 5,
    language: 'fr',
    status: 'accepted',
    position: {
      id: 919,
      name: 'Oui',
      language: 'fr',
      translation_entries: []
    },
    group: {
      group_context: {
        positions: [
          { id: 919, name: 'Oui', language: 'fr', translation_entries: [] },
          { id: 920, name: 'Non', language: 'fr', translation_entries: [] }
        ]
      }
    }
  }
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
                        <IntlProvider locale='en'>{children}</IntlProvider>
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

export default {
  title: 'Report/Report Box',
  component: ReportBox,
  argTypes: {
    report: { control: 'object' }
  },
  render: (args) => (
    <div style={{ width: '400px', height: '240px' }}>
      <Providers>
        <ReportBox {...args} />
      </Providers>
    </div>
  )
};

export const ReportArgumentPending = {
  args: {
    report: reportArgumentPending
  }
};

export const ReportArgumentRejected = {
  args: {
    report: reportArgumentRejected
  }
};

export const ReportArgumentAccepted = {
  args: {
    report: reportArgumentAccepted
  }
};

export const ReportProposal = {
  args: {
    report: reportProposal
  }
};

export const ReportSuggestion = {
  args: {
    report: reportSuggestion
  }
};

export const ReportWithPositions = {
  args: {
    report: reportWithPositions
  }
};
