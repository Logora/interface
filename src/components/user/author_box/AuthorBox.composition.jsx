import React from 'react';
import { ConfigProvider } from '@logora/debate.data.config_provider';
import { IntlProvider } from 'react-intl';
import { AuthorBox } from './AuthorBox';
import { Location } from '@logora/debate.util.location';
import { BrowserRouter } from 'react-router-dom';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';
import { faker } from '@faker-js/faker';

const author = {
  image_url: faker.image.avatar(),
  full_name: faker.name.fullName(),
  hash_id: faker.lorem.slug(),
  points: 52,
  role: "contibutor",
  eloquence_title: faker.science.chemicalElement().symbol,
  occupation: faker.vehicle.bicycle(),
  last_activity: faker.date.recent(),
  description: faker.name.jobTitle(),
};

const authorJournalist = {
  image_url: faker.image.avatar(),
  full_name: faker.name.fullName(),
  hash_id: faker.lorem.slug(),
  points: 52,
  role: "editor",
  eloquence_title: faker.science.chemicalElement().symbol,
  occupation: faker.vehicle.bicycle(),
  last_activity: faker.date.recent(),
  description: faker.name.jobTitle(),
};

const routes = {
  userShowLocation: new Location('espace-debat/user/:userSlug', { userSlug: '' })
};

export const DefaultAuthorBox = () => {
  return (
    <BrowserRouter>
      <ConfigProvider routes={{ ...routes }}>
        <IntlProvider locale="en">
          <IconProvider library={regularIcons}>
            <AuthorBox
              fullName={author.full_name}
              avatarUrl={author.image_url}
              slug={author.hash_id}
              points={author.points}
              showBadge={author.role}
            />
          </IconProvider>
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
          <IconProvider library={regularIcons}>
            <AuthorBox
              fullName={author.full_name}
              avatarUrl={author.image_url}
              slug={author.hash_id}
              points={author.points}
              showBadge={author.role}
              disableLinks
            />
          </IconProvider>
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
            <IconProvider library={regularIcons}>
              <AuthorBox 
                fullName={author.full_name}
                avatarUrl={author.image_url}
                slug={author.hash_id}
                points={author.points}
                eloquenceTitle={author.eloquence_title}
              />
            </IconProvider>
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
            <IconProvider library={regularIcons}>
              <AuthorBox 
                fullName={author.full_name}
                avatarUrl={author.image_url}
                slug={author.hash_id}
                points={author.points}
                occupation={author.occupation}
              />
            </IconProvider>
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
          <IconProvider library={regularIcons}>
            <AuthorBox 
              fullName={authorJournalist.full_name}
              avatarUrl={authorJournalist.image_url}
              slug={authorJournalist.hash_id}
              points={authorJournalist.points}
              showBadge={authorJournalist.role}
            />
          </IconProvider>
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
          <IconProvider library={regularIcons}>
            <AuthorBox 
              fullName={author.full_name}
              avatarUrl={author.image_url}
              slug={author.hash_id}
              points={author.points}
              isDeleted={true}
            />
          </IconProvider>
        </IntlProvider>
      </ConfigProvider>
    </BrowserRouter>
  );
};