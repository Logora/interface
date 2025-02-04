// NotificationItem.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { NotificationItem } from './NotificationItem';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import { ConfigProvider } from '@logora/debate.data.config_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';
import { dataProvider, DataProviderContext } from '@logora/debate.data.data_provider';
import { faker } from '@faker-js/faker';

const mockNotification = {
  id: '1',
  notify_type: 'new_comment',
  created_at: faker.date.recent(),
  is_opened: false,
};

const notificationDefinitions = {
  new_comment: {
    getRedirectUrl: (notification) => `/comments/${notification.id}`,
    getImage: () => <img src="/path/to/image.png" alt="Notification" />,
    getContent: (notification, intl) => intl.formatMessage({ id: "notification.new_comment", defaultMessage: "New comment received !" }),
  },
};

const httpClient = {
  post: () => {
    return new Promise(function (resolve, reject) {
      resolve({ data: { success: true, data: {} } });
    });
  }
};

const data = dataProvider(httpClient, "https://mock.example.api");

describe('NotificationItem', () => {
  let mock;

  beforeEach(() => {
      mock = jest.spyOn(httpClient, 'post');
  });

  afterEach(() => {
      mock.mockRestore();
      mock.mockClear();
  });

  it('renders text and image correctly', () => {
    const { getByText, getByAltText } = render(
      <MemoryRouter>
        <ConfigProvider config={{}}>
          <DataProviderContext.Provider value={{ dataProvider: data }}>
            <IntlProvider locale="en">
              <IconProvider library={regularIcons}>
                <NotificationItem
                  notification={mockNotification}
                  notificationDefinitions={notificationDefinitions}
                  isRead={false}
                />
              </IconProvider>
            </IntlProvider>
          </DataProviderContext.Provider>
        </ConfigProvider>
      </MemoryRouter>
    );

    expect(getByText('New comment received !')).toBeInTheDocument();
    expect(getByAltText('Notification')).toBeInTheDocument();
  });

  it('calls api when clicking on notification', () => {
    const { getByText } = render(
      <MemoryRouter>
        <ConfigProvider config={{}}>
          <DataProviderContext.Provider value={{ dataProvider: data }}>
            <IntlProvider locale="en">
              <IconProvider library={regularIcons}>
                <NotificationItem
                  notification={mockNotification}
                  notificationDefinitions={notificationDefinitions}
                  isRead={false}
                />
              </IconProvider>
            </IntlProvider>
          </DataProviderContext.Provider>
        </ConfigProvider>
      </MemoryRouter>
    );

    const notificationElement = getByText('New comment received !');
    fireEvent.click(notificationElement);

    expect(mock).toHaveBeenCalledTimes(1);
  });
});
