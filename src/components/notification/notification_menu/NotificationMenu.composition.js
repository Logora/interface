import React from 'react';
import { NotificationMenu } from './NotificationMenu';
import { IntlProvider } from 'react-intl';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import { ConfigProvider } from '@logora/debate.data.config_provider';
import { dataProvider, DataProviderContext } from '@logora/debate.data.data_provider';
import { MemoryRouter } from "react-router";
import { ListProvider } from '@logora/debate.list.list_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';
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
    getContent: (notification) => faker.commerce.productDescription()
  },
}

const httpClient = {
  post: () => {
    return new Promise(function (resolve) {
      resolve({ data: { success: true, data: {} } });
    });
  },
  get: () => {
    return new Promise(function (resolve) {
      resolve({ data: { success: true, data: Array.from({ length: 5 }, createNotification) } });
    });
  }
};

const data = dataProvider(httpClient, "https://mock.example.api");

export const DefaultNotificationMenu = () => {
  return (
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
};

export const NotificationMenuEmpty = () => {
  const httpClientEmpty = httpClient;
  httpClientEmpty.get = () => {
    return new Promise(function (resolve) {
      resolve({ data: { success: true, data: [] } });
    });
  }

  const dataEmpty = dataProvider(httpClientEmpty, "https://mock.example.api");

  return (
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
};