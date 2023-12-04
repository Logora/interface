import React from 'react';
import { render, screen } from '@testing-library/react';
import { ConfigProvider } from '@logora/debate.data.config_provider';
import { IntlProvider } from 'react-intl';
import { UserBoxSmall } from './UserBoxSmall';
import { Location } from '@logora/debate.util.location';
import { BrowserRouter } from 'react-router-dom';
import { faker } from '@faker-js/faker';

const user = {
  image_url: faker.image.avatar(),
  full_name: faker.name.fullName(),
  slug: faker.lorem.slug(),
}

let UserShowLocation = new Location('espace-debat/user/:userSlug', { userSlug: "" })

const routes = {
  userShowLocation: UserShowLocation,
}

describe('UserBoxSmall', () => {
  it('renders author name, avatar and correct link', () => {
    render(
      <BrowserRouter>
        <ConfigProvider routes={{ ...routes }}>
          <IntlProvider locale='en'>
            <UserBoxSmall userName={user.full_name} avatarUrl={user.image_url} userSlug={user.slug} />
          </IntlProvider>
        </ConfigProvider>
      </BrowserRouter>
    );
    const userNameElement = screen.getByText(user.full_name);
    expect(userNameElement).toBeInTheDocument();

    const avatarImageElement = screen.getByTitle(user.full_name + "'s profile picture");
    expect(avatarImageElement).toHaveAttribute('height', '25');
    expect(avatarImageElement).toHaveAttribute('width', '25');
    expect(avatarImageElement).toBeInTheDocument();
    expect(avatarImageElement).toHaveAttribute('src', user.image_url);

    const userLink = screen.getAllByRole('link');
    expect(userLink.length).toBe(2);
    expect(userLink[0]).toHaveAttribute(
      'href',
      `/espace-debat/user/${user.slug}`
    );
  });
});