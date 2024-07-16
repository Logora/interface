import React from 'react';
import { NotificationMenu } from './NotificationMenu';
import { IntlProvider } from 'react-intl';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import { ConfigProvider } from '@logora/debate.data.config_provider';
import { dataProvider, DataProviderContext } from '@logora/debate.data.data_provider';
import { MemoryRouter } from "react-router";
import * as regularIcons from '@logora/debate.icons.regular_icons';
import { faker } from '@faker-js/faker';

const notificationDefinitions = {
  new_comment: {
    getRedirectUrl: () => '/comments/1',
    getImage: () => <img src={faker.image.abstract()} />,
    getContent: () => faker.commerce.productDescription()
  },
}

const httpClient = {
  post: () => {
    return new Promise(function (resolve) {
      resolve({ data: { success: true, data: {} } });
    });
  }
};

const data = dataProvider(httpClient, "https://mock.example.api");

export const DefaultNotificationMenu = () => {
  return (
    <MemoryRouter>
      <ConfigProvider config={{}}>
        <DataProviderContext.Provider value={{ dataProvider: data }}>
          <IntlProvider locale="en">
            <IconProvider library={regularIcons}>
              <NotificationMenu notificationDefinitions={notificationDefinitions} />
            </IconProvider>
          </IntlProvider>
        </DataProviderContext.Provider>
      </ConfigProvider>
    </MemoryRouter>
  );
};

export const NotificationMenuWithReadAll = () => {
  return (
    <MemoryRouter>
      <ConfigProvider config={{}}>
        <DataProviderContext.Provider value={{ dataProvider: data }}>
          <IntlProvider locale="en">
            <IconProvider library={regularIcons}>
              <NotificationMenu notificationDefinitions={notificationDefinitions} readAll={true} />
            </IconProvider>
          </IntlProvider>
        </DataProviderContext.Provider>
      </ConfigProvider>
    </MemoryRouter>
  );
};