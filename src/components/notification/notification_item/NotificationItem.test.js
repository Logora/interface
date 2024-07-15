// NotificationItem.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { NotificationItem } from './NotificationItem';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import { ConfigProvider } from '@logora/debate.data.config_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';
import { faker } from '@faker-js/faker';

const mockNotification = {
  id: '1',
  notify_type: 'new_comment',
  created_at: new Date().toISOString(),
  is_opened: false,
};

const notificationDefinitions = {
  new_comment: {
    getRedirectUrl: (notification) => `/comments/${notification.id}`,
    getImage: () => <img src="/path/to/image.png" alt="Notification" />,
    getContent: (notification, intl) => intl.formatMessage({ id: "notification.new_comment", defaultMessage: "Nouveau commentaire reçu !" }),
  },
};

describe('NotificationItem', () => {
  it('renders text and image correctly', () => {
    const { getByText, getByAltText } = render(
      <MemoryRouter>
        <ConfigProvider config={{}}>
          <IntlProvider locale="en">
            <IconProvider library={regularIcons}>
              <NotificationItem
                notification={mockNotification}
                notificationDefinitions={notificationDefinitions}
                isRead={false}
              />
            </IconProvider>
          </IntlProvider>
        </ConfigProvider>
      </MemoryRouter>
    );

    expect(getByText('New comment received!')).toBeInTheDocument();
    expect(getByAltText('Notification')).toBeInTheDocument();
  });

  it('calls getRedirectUrl when clicked', () => {
    const getRedirectUrlSpy = jest.spyOn(notificationDefinitions.new_comment, 'getRedirectUrl');
    const { getByText } = render(
      <MemoryRouter>
        <ConfigProvider config={{}}>
          <IntlProvider locale="en">
            <IconProvider library={regularIcons}>
              <NotificationItem
                notification={mockNotification}
                notificationDefinitions={notificationDefinitions}
                isRead={false}
              />
            </IconProvider>
          </IntlProvider>
        </ConfigProvider>
      </MemoryRouter>
    );

    const notificationElement = getByText('New comment received!');
    fireEvent.click(notificationElement);
    expect(getRedirectUrlSpy).toHaveBeenCalledTimes(1);
  });
});
