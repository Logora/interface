import React from 'react';
import { ConfigProvider } from '@logora/debate.data.config_provider';
import { IntlProvider } from 'react-intl';
import { AuthorBox } from './AuthorBox';
import { Location } from '@logora/debate.util.location';
import { BrowserRouter } from 'react-router-dom';
import { faker } from '@faker-js/faker';

const author = {
  image_url: faker.image.avatar(),
  full_name: faker.name.fullName(),
  hash_id: faker.lorem.slug(),
  points: 52,
  eloquence_title: faker.science.chemicalElement().symbol,
  occupation: faker.vehicle.bicycle(),
  last_activity: faker.date.recent(),
  description: faker.name.jobTitle(),
  is_expert: false
};

const routes = {
  userShowLocation: new Location('espace-debat/user/:userSlug', { userSlug: '' })
};

export const DefaultAuthorBox = () => {
  return (
    <BrowserRouter>
      <ConfigProvider routes={{ ...routes }}>
        <IntlProvider locale="en">
          <AuthorBox
            fullName={author.full_name}
            avatarUrl={author.image_url}
            slug={author.hash_id}
            points={author.points}
            isExpert={author.is_expert}
          />
        </IntlProvider>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export const AuthorBoxWithoutLinks = () => {
  return (
    <BrowserRouter>
      <ConfigProvider routes={{ ...routes }}>
        <IntlProvider locale="en">
          <AuthorBox
            fullName={author.full_name}
            avatarUrl={author.image_url}
            slug={author.hash_id}
            points={author.points}
            isExpert={author.is_expert}
            disableLinks
          />
        </IntlProvider>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export const AuthorBoxWithTitle = () => {
    return (
      <BrowserRouter>
        <ConfigProvider routes={{ ...routes }}>
          <IntlProvider locale="en">
            <AuthorBox 
              fullName={author.full_name}
              avatarUrl={author.image_url}
              slug={author.hash_id}
              points={author.points}
              eloquenceTitle={author.eloquence_title}
            />
          </IntlProvider>
        </ConfigProvider>
      </BrowserRouter>
    );
};

export const AuthorBoxWithOccupation = () => {
    return (
      <BrowserRouter>
        <ConfigProvider routes={{ ...routes }}>
          <IntlProvider locale="en">
            <AuthorBox 
              fullName={author.full_name}
              avatarUrl={author.image_url}
              slug={author.hash_id}
              points={author.points}
              occupation={author.occupation}
            />
          </IntlProvider>
        </ConfigProvider>
      </BrowserRouter>
    );
};

export const AuthorBoxExpert = () => {
  return (
    <BrowserRouter>
      <ConfigProvider routes={{ ...routes }}>
        <IntlProvider locale="en">
          <AuthorBox 
            fullName={author.full_name}
            avatarUrl={author.image_url}
            slug={author.hash_id}
            points={author.points}
            isExpert={true}
          />
        </IntlProvider>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export const AuthorBoxDeletedUser = () => {
  return (
    <BrowserRouter>
      <ConfigProvider routes={{ ...routes }}>
        <IntlProvider locale="en">
          <AuthorBox 
            fullName={author.full_name}
            avatarUrl={author.image_url}
            slug={author.hash_id}
            points={author.points}
            isDeleted={true}
          />
        </IntlProvider>
      </ConfigProvider>
    </BrowserRouter>
  );
};