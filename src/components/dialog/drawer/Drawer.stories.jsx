import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from '@logora/debate/data/config_provider';
import { AuthContext } from '@logora/debate/auth/use_auth';
import { ResponsiveProvider } from '@logora/debate/hooks/use_responsive';
import { IconProvider } from '@logora/debate/icons/icon_provider';
import { ModalProvider } from '@logora/debate/dialog/modal';
import { IntlProvider } from 'react-intl';
import { ListProvider } from '@logora/debate/list/list_provider';
import { dataProvider, DataProviderContext } from '@logora/debate/data/data_provider';
import * as regularIcons from '@logora/debate/icons/regular_icons';
import { Location } from '@logora/debate/util/location';
import { faker } from '@faker-js/faker';
import { Drawer } from './Drawer';

const mockUser = {
  id: faker.number.int(),
  full_name: faker.person.fullName(),
  image_url: faker.image.avatarGitHub(),
  hash_id: faker.lorem.slug()
};

const baseConfig = {
  isDrawer: true,
  modules: {
    consultation: true,
    suggestions: { active: true }
  },
  actions: {
    hideLoginButton: false
  },
  layout: {
    showNavbarButtonInDrawer: true
  }
};

const createNotification = () => ({
  id: faker.number.int(10000000),
  created_at: faker.date.recent(),
  notify_type: 'new_comment',
  is_opened: faker.datatype.boolean()
});

const notificationDefinitions = {
  new_comment: {
    getRedirectUrl: () => '/comments/1',
    getImage: () => <img src={faker.image.url()} alt='notification-image' />,
    getContent: () => faker.commerce.productDescription()
  }
};

const routes = {
  indexLocation: new Location('espace-debat', {}),
  debateShowLocation: new Location('espace-debat/debat/:debateSlug', { debateSlug: '' }),
  rootLocation: new Location('/', {}),
  consultationIndexLocation: new Location('espace-debat/consultations', {}),
  consultationShowLocation: new Location('espace-debat/consultations/:consultationSlug', { consultationSlug: '' }),
  suggestionLocation: new Location('espace-debat/suggestions', {}),
  userShowLocation: new Location('espace-debat/user/:userSlug', { userSlug: '' }),
  userEditLocation: new Location('espace-debat/user/:userSlug/edit', { userSlug: '' })
};

const httpClient = {
  post: () => Promise.resolve({ data: { success: true, data: {} } }),
  get: () => Promise.resolve({ data: { success: true, data: Array.from({ length: 5 }, createNotification) } })
};

const data = dataProvider(httpClient, 'https://mock.example.api');

const defaultArgs = {
  title: '',
  enableOverlay: false,
  size: undefined,
  pathParameter: '',
  notificationDefinitions,
  startOpen: false,
  content: 'Drawer content'
};

const meta = {
  title: 'Dialog/Drawer',
  component: Drawer,
  args: defaultArgs,
  argTypes: {
    title: { control: 'text' },
    enableOverlay: { control: 'boolean' },
    size: { control: 'number' },
    pathParameter: { control: 'text' },
    startOpen: { control: 'boolean' },
    content: { control: 'text' },
    notificationDefinitions: { control: 'object' }
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(args.startOpen);
    const { startOpen, content, ...drawerProps } = args;

    const mergedConfig = {
      ...baseConfig
    };

    return (
      <BrowserRouter>
        <ConfigProvider routes={routes} config={mergedConfig}>
          <DataProviderContext.Provider value={{ dataProvider: data }}>
            <ListProvider>
              <AuthContext.Provider value={{ currentUser: mockUser, isLoggedIn: true }}>
                <ResponsiveProvider>
                  <IconProvider library={regularIcons}>
                    <IntlProvider locale='en'>
                      <ModalProvider>
                        <div onClick={() => setIsOpen((prev) => !prev)} data-testid='open-button'>
                          Click here to toggle drawer
                        </div>
                        <div
                          onClick={() => {
                            const event = new CustomEvent('logora:drawer:close');
                            window.dispatchEvent(event);
                          }}
                          data-testid='close-button'
                        >
                          Click here to close drawer
                        </div>
                        <Drawer {...drawerProps} isOpen={isOpen} onClose={() => setIsOpen(false)}>
                          <div>{content}</div>
                        </Drawer>
                      </ModalProvider>
                    </IntlProvider>
                  </IconProvider>
                </ResponsiveProvider>
              </AuthContext.Provider>
            </ListProvider>
          </DataProviderContext.Provider>
        </ConfigProvider>
      </BrowserRouter>
    );
  }
};

export default meta;

const renderStory = (overrides = {}) => meta.render({ ...meta.args, ...overrides });

export const DefaultDrawer = (props) => renderStory(props);

export const DrawerWithoutNavbarButton = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(args.startOpen);
    const { startOpen, content, ...drawerProps } = args;

    return (
      <BrowserRouter>
        <ConfigProvider
          routes={routes}
          config={{
            layout: {
              showNavbarButtonInDrawer: false,
              showProfileNotificationInDrawer: false
            }
          }}
        >
          <DataProviderContext.Provider value={{ dataProvider: data }}>
            <ListProvider>
              <AuthContext.Provider value={{ currentUser: mockUser, isLoggedIn: true }}>
                <ResponsiveProvider>
                  <IconProvider library={regularIcons}>
                    <IntlProvider locale='en'>
                      <ModalProvider>
                        <div onClick={() => setIsOpen((prev) => !prev)} data-testid='open-button'>
                          Click here to toggle drawer
                        </div>
                        <div
                          onClick={() => {
                            const event = new CustomEvent('logora:drawer:close');
                            window.dispatchEvent(event);
                          }}
                          data-testid='close-button'
                        >
                          Click here to close drawer
                        </div>
                        <Drawer {...drawerProps} isOpen={isOpen} onClose={() => setIsOpen(false)}>
                          <div>{content}</div>
                        </Drawer>
                      </ModalProvider>
                    </IntlProvider>
                  </IconProvider>
                </ResponsiveProvider>
              </AuthContext.Provider>
            </ListProvider>
          </DataProviderContext.Provider>
        </ConfigProvider>
      </BrowserRouter>
    );
  }
};
