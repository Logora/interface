// NotificationMenu.test.js
import React from 'react';
import { screen, render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NotificationMenu } from './NotificationMenu';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import { ListProvider } from '@logora/debate.list.list_provider';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import { ConfigProvider } from '@logora/debate.data.config_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';
import { dataProvider, DataProviderContext } from '@logora/debate.data.data_provider';
import { faker } from '@faker-js/faker';

const createNotification = () => {
  return {
    id: faker.datatype.number(10000000),
    created_at: faker.date.recent(),
    notify_type: "new_comment",
    is_opened: faker.datatype.boolean()
  };
};

const notificationDefinitions = {
  new_comment: {
    getRedirectUrl: () => '/comments/1',
    getImage: () => <img src={faker.image.abstract()} alt="notification-image" />,
    getContent: () => faker.commerce.productDescription()
  },
}

const httpClient = {
  post: () => Promise.resolve({ data: { success: true, data: {} } }),
  get: () => Promise.resolve({ data: { success: true, data: Array.from({ length: 5 }, createNotification) } }),
};

const data = dataProvider(httpClient, "https://mock.example.api");

describe('NotificationMenu', () => {
  let mock;

  beforeEach(() => {
    mock = jest.spyOn(httpClient, 'post');
  });

  afterEach(() => {
    mock.mockRestore();
    mock.mockClear();
  });

  it('renders notifications, title, and "Mark all as read" button', async () => {
    const container = act(() => render(
      <MemoryRouter>
        <ConfigProvider config={{}}>
          <DataProviderContext.Provider value={{ dataProvider: data }}>
            <ListProvider>
              <IntlProvider locale="en">
                <IconProvider library={regularIcons}>
                  <NotificationMenu notificationDefinitions={notificationDefinitions} />
                </IconProvider>
              </IntlProvider>
            </ListProvider>
          </DataProviderContext.Provider>
        </ConfigProvider>
      </MemoryRouter>
    ));

    expect(screen.getByText('Alerts')).toBeTruthy();
    expect(screen.getByText('Mark all as read')).toBeTruthy();

    const notifications = await screen.findAllByAltText('notification-image');
    expect(notifications.length).toEqual(5);
  });

  it('renders title, button, and empty list message when no notifications', async () => {
    const httpClientEmpty = {
      post: () => Promise.resolve({ data: { success: true, data: {} } }),
      get: () => Promise.resolve({ data: { success: true, data: [] } }),
    };
    
    const dataEmpty = dataProvider(httpClientEmpty, "https://mock.example.api");

    render(
      <MemoryRouter>
        <ConfigProvider config={{}}>
          <DataProviderContext.Provider value={{ dataProvider: dataEmpty }}>
            <ListProvider>
              <IntlProvider locale="en">
                <IconProvider library={regularIcons}>
                  <NotificationMenu notificationDefinitions={notificationDefinitions} />
                </IconProvider>
              </IntlProvider>
            </ListProvider>
          </DataProviderContext.Provider>
        </ConfigProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('Alerts')).toBeTruthy();
    expect(screen.getByText('Mark all as read')).toBeTruthy();
    expect(await screen.findByText('No items for now.')).toBeTruthy();

    const notifications = screen.queryAllByAltText('notification-image');
    expect(notifications.length).toEqual(0);
  });

  it('calls api when clicking on read all button', async () => {
    render(
      <MemoryRouter>
        <ConfigProvider config={{}}>
          <DataProviderContext.Provider value={{ dataProvider: data }}>
            <ListProvider>
              <IntlProvider locale="en">
                <IconProvider library={regularIcons}>
                  <NotificationMenu notificationDefinitions={notificationDefinitions} />
                </IconProvider>
              </IntlProvider>
            </ListProvider>
          </DataProviderContext.Provider>
        </ConfigProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('Alerts')).toBeTruthy();
    const readAllButton = screen.getByText('Mark all as read')

    await userEvent.click(readAllButton);

    expect(mock).toHaveBeenCalledTimes(1);
  });
});
