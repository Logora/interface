import React from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router';
import { ConfigProvider } from '@logora/debate.data.config_provider';
import { Location } from '@logora/debate.util.location';
import { SummaryContentBox } from './SummaryContentBox';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';
import { faker } from '@faker-js/faker';

const author = {
  image_url: faker.image.avatar(),
  full_name: faker.name.fullName(),
  hash_id: faker.lorem.slug(),
  slug: faker.lorem.slug(),
  points: 52,
  role:"contributor",
  last_activity: new Date(),
  description: faker.name.jobTitle()
}

const argument = {
  id: 43,
  author: author,
  created_at: faker.date.recent(),
  content: faker.lorem.sentences(8),
  position: {
    name: faker.lorem.word()
  }
}

const debateUrl = faker.internet.url();

const routes = {
  userShowLocation: new Location('espace-debat/user/:userSlug', { userSlug: '' })
};

export const DefaultSummaryContentBox = () => {
  return (
    <BrowserRouter>
      <ConfigProvider routes={{ ...routes }}>
        <IconProvider library={regularIcons}>
          <IntlProvider locale="en">
            <SummaryContentBox
              author={author} 
              tag={argument.position?.name}
              date={argument.created_at}
              content={argument.content}
              link={debateUrl}
            />
          </IntlProvider>
        </IconProvider>
      </ConfigProvider>
    </BrowserRouter>
  );
};


export const SummaryContentBoxWithTitle = () => {
  return (
    <BrowserRouter>
      <ConfigProvider routes={{ ...routes }}>
        <IconProvider library={regularIcons}>
          <IntlProvider locale="en">
            <SummaryContentBox
              author={author} 
              tag={argument.position?.name}
              title={"My argument title"}
              date={argument.created_at}
              content={argument.content}
              link={debateUrl}
              showFooter
            />
          </IntlProvider>
        </IconProvider>
      </ConfigProvider>
    </BrowserRouter>
  );
};


export const SummaryContentBoxWithFooter = () => {
  return (
    <BrowserRouter>
      <ConfigProvider routes={{ ...routes }}>
        <IconProvider library={regularIcons}>
          <IntlProvider locale="en">
            <SummaryContentBox
              author={author} 
              tag={argument.position?.name}
              date={argument.created_at}
              content={argument.content}
              link={debateUrl}
              showFooter
            />
          </IntlProvider>
        </IconProvider>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export const SummaryContentBoxHeaderOneLine = () => {
  return (
    <BrowserRouter>
      <ConfigProvider routes={{ ...routes }}>
        <IconProvider library={regularIcons}>
          <IntlProvider locale="en">
            <SummaryContentBox
              author={author} 
              tag={argument.position?.name}
              date={argument.created_at}
              content={argument.content}
              link={debateUrl}
              headerOneLine={true}
            />
          </IntlProvider>
        </IconProvider>
      </ConfigProvider>
    </BrowserRouter>
  );
};
