import React from 'react';
import { ConfigProvider } from '@logora/debate.data.config_provider';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
import { Location } from '@logora/debate.util.location';
import { ContentHeader } from './ContentHeader';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';
import { faker } from '@faker-js/faker';

const author = {
    image_url: faker.image.avatar(),
    full_name: faker.name.fullName(),
    slug: faker.lorem.slug(),
    points: 52,
    last_activity: new Date(),
    description: faker.name.jobTitle(),
    hash_id: faker.lorem.slug(),
    occupation: faker.name.jobTitle(),
}

const date = faker.date.recent();

const routes = {
  userShowLocation: new Location('espace-debat/user/:userSlug', { userSlug: '' })
};

const tag = faker.word.noun(5);

export const DefaultContentHeader = () => {
    return (
        <BrowserRouter>
            <ConfigProvider routes={{ ...routes }}>
                <IconProvider library={regularIcons}>
                    <IntlProvider locale="en">
                        <ContentHeader
                            author={author}
                            tag={tag}
                            date={date}
                            positionIndex={1}
                            oneLine={false}
                            disableLinks={false}
                        />
                    </IntlProvider>
                </IconProvider>
            </ConfigProvider>
        </BrowserRouter>
    );
};

export const ContentHeaderWithoutTag = () => {
    return (
        <BrowserRouter>
            <ConfigProvider routes={{ ...routes }}>
                <IconProvider library={regularIcons}>
                    <IntlProvider locale="en">
                        <ContentHeader
                            author={author}
                            date={date}
                            positionIndex={1}
                            oneLine={false}
                        />
                    </IntlProvider>
                </IconProvider>
            </ConfigProvider>
        </BrowserRouter>
    );
};

export const ContentHeaderWithoutDate = () => {
    return (
        <BrowserRouter>
            <ConfigProvider routes={{ ...routes }}>
                <IconProvider library={regularIcons}>
                    <IntlProvider locale="en">
                        <ContentHeader
                            author={author}
                            tag={tag}
                            positionIndex={1}
                            oneLine={false}
                        />
                    </IntlProvider>
                </IconProvider>
            </ConfigProvider>
        </BrowserRouter>
    );
  };
  
export const ContentHeaderWithOneLine = () => {
    return (
        <BrowserRouter>
            <ConfigProvider routes={{ ...routes }}>
                <IconProvider library={regularIcons}>
                    <IntlProvider locale="en">
                        <ContentHeader
                            author={author}
                            tag={tag}
                            positionIndex={1}
                            date={date}
                            oneLine={true}
                            disableLinks={false}
                        />
                    </IntlProvider>
                </IconProvider>
            </ConfigProvider>
        </BrowserRouter>
    );
};

export const ContentHeaderWithoutLinks = () => {
    return (
        <BrowserRouter>
            <ConfigProvider routes={{ ...routes }}>
                <IconProvider library={regularIcons}>
                    <IntlProvider locale="en">
                        <ContentHeader
                            author={author}
                            tag={tag}
                            date={date}
                            oneLine={false}
                            disableLinks={true}
                        />
                    </IntlProvider>
                </IconProvider>
            </ConfigProvider>
        </BrowserRouter>
    );
};
  
export const ContentHeaderSelected = () => {
    return (
        <BrowserRouter>
            <ConfigProvider routes={{ ...routes }}>
                <IconProvider library={regularIcons}>
                    <IntlProvider locale="en">
                        <ContentHeader
                            author={author}
                            tag={tag}
                            date={date}
                            selectedContent
                        />
                    </IntlProvider>
                </IconProvider>
            </ConfigProvider>
        </BrowserRouter>
    );
};