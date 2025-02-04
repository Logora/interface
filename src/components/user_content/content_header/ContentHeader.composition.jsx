import React from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from '@logora/debate.data.config_provider';
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
    role:"contributor",
    last_activity: new Date(),
    description: faker.name.jobTitle(),
    hash_id: faker.lorem.slug(),
    occupation: faker.name.jobTitle(),
}

const expertAuthor = {...author, role: "editor"}

const date = faker.date.recent();

const routes = {
  userShowLocation: new Location('espace-debat/user/:userSlug', { userSlug: '' })
};

const tag = faker.word.noun(5);

export const DefaultContentHeader = (props) => {
    return (
        <BrowserRouter>
            <ConfigProvider routes={{ ...routes }}>
                <IconProvider library={regularIcons}>
                    <IntlProvider locale="en">
                        <ContentHeader
                            author={props.author || author}
                            tag={props.tag || tag}
                            date={props.date || date}
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

export const ContentHeaderWithoutTag = (props) => {
    return (
        <BrowserRouter>
            <ConfigProvider routes={{ ...routes }}>
                <IconProvider library={regularIcons}>
                    <IntlProvider locale="en">
                        <ContentHeader
                            author={props.author || author}
                            date={props.date || date}
                            positionIndex={1}
                            oneLine={false}
                        />
                    </IntlProvider>
                </IconProvider>
            </ConfigProvider>
        </BrowserRouter>
    );
};

export const ContentHeaderWithoutDate = (props) => {
    return (
        <BrowserRouter>
            <ConfigProvider routes={{ ...routes }}>
                <IconProvider library={regularIcons}>
                    <IntlProvider locale="en">
                        <ContentHeader
                            author={props.author || author}
                            tag={props.tag || tag}
                            positionIndex={1}
                            oneLine={false}
                        />
                    </IntlProvider>
                </IconProvider>
            </ConfigProvider>
        </BrowserRouter>
    );
  };
  
export const ContentHeaderWithOneLine = (props) => {
    return (
        <BrowserRouter>
            <ConfigProvider routes={{ ...routes }}>
                <IconProvider library={regularIcons}>
                    <IntlProvider locale="en">
                        <ContentHeader
                            author={props.author || author}
                            tag={props.tag || tag}
                            positionIndex={1}
                            date={props.date || date}
                            oneLine={true}
                            disableLinks={false}
                        />
                    </IntlProvider>
                </IconProvider>
            </ConfigProvider>
        </BrowserRouter>
    );
};

export const ContentHeaderWithoutLinks = (props) => {
    return (
        <BrowserRouter>
            <ConfigProvider routes={{ ...routes }}>
                <IconProvider library={regularIcons}>
                    <IntlProvider locale="en">
                        <ContentHeader
                            author={props.author || author}
                            tag={props.tag || tag}
                            date={props.date || date}
                            oneLine={false}
                            disableLinks={true}
                        />
                    </IntlProvider>
                </IconProvider>
            </ConfigProvider>
        </BrowserRouter>
    );
};
  
export const ContentHeaderSelected = (props) => {
    return (
        <BrowserRouter>
            <ConfigProvider routes={{ ...routes }}>
                <IconProvider library={regularIcons}>
                    <IntlProvider locale="en">
                        <ContentHeader
                            author={props.author || author}
                            tag={props.tag || tag}
                            date={props.date || date}
                            selectedContent
                        />
                    </IntlProvider>
                </IconProvider>
            </ConfigProvider>
        </BrowserRouter>
    );
};

export const ContentHeaderWithBadge = (props) => {
    return (
        <BrowserRouter>
            <ConfigProvider routes={{ ...routes }}>
                <IconProvider library={regularIcons}>
                    <IntlProvider locale="en">
                        <ContentHeader
                            author={props.author || expertAuthor}
                            tag={props.tag || tag}
                            date={props.date || date}
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
