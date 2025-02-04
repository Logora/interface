import React from 'react';
import { IntlProvider } from 'react-intl';
import { ConfigProvider } from '@logora/debate.data.config_provider';
import { MemoryRouter } from 'react-router-dom';
import { Location } from '@logora/debate.util.location';
import { TopArguments } from './TopArguments';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import { ResponsiveProvider } from '@logora/debate.hooks.use_responsive';
import * as regularIcons from '@logora/debate.icons.regular_icons';
import { faker } from '@faker-js/faker';

const debateUrl = faker.internet.url();

const routes = {
    userShowLocation: new Location('espace-debat/user/:userSlug', { userSlug: '' })
};

const debate = {
    group_context: {
        positions: [
            {
              updated_at: "2021-04-20T12:19:15.855Z",
              id: 1,
              name: "Oui"
            },
            {
              updated_at: "2021-04-20T12:19:15.878Z",
              id: 2,
              name: "Non"
            }
        ]
    }
};

const argumentFor = {
    id: 414,
    content: "An argument to support the 'For' position",
    upvotes: 0,
    group_id: 417,
    is_reply: false,
    created_at: faker.date.recent(),
    score: 50,
    author: {
        image_url: faker.image.avatar(),
        full_name: faker.name.fullName(),
        hash_id: faker.lorem.slug(),
        slug: faker.lorem.slug(),
        points: 1320,
        last_activity: new Date(),
        description: faker.name.jobTitle()
    },
    position: {
        id: 397,
        name: "For"
    }
};

const argumentAgainst = {
    id: 414,
    content: "An argument to support the 'Against' position",
    upvotes: 0,
    group_id: 417,
    is_reply: false,
    created_at: faker.date.recent(),
    score: 58,
    author: {
        image_url: faker.image.avatar(),
        full_name: faker.name.fullName(),
        hash_id: faker.lorem.slug(),
        slug: faker.lorem.slug(),
        points: 5672,
        last_activity: new Date(),
        description: faker.name.jobTitle()
    },
    position: {
        id: 397,
        name: "Against"
    }
};

export const DefaultTopArguments = () => {
    return (
        <MemoryRouter>
            <ConfigProvider routes={{ ...routes }} config={{synthesis: {newDesign: false}}}>
                <ResponsiveProvider>
                    <IconProvider library={regularIcons}>
                        <IntlProvider locale="en">
                            <TopArguments
                                argumentFor={argumentFor}
                                argumentAgainst={argumentAgainst} 
                                argumentCount={[5, 3]}
                                debate={debate}
                                debateUrl={debateUrl} 
                            />
                        </IntlProvider>
                    </IconProvider>
                </ResponsiveProvider>
            </ConfigProvider>
        </MemoryRouter>
    );
};

export const TopArgumentsNewDesign = () => {
    return (
        <MemoryRouter>
            <ConfigProvider routes={{ ...routes }} config={{synthesis: {newDesign: true}}}>
                <ResponsiveProvider>
                    <IconProvider library={regularIcons}>
                        <IntlProvider locale="en">
                            <TopArguments
                                argumentAgainst={argumentAgainst} 
                                argumentCount={[0, 3]}
                                debate={debate}
                                debateUrl={debateUrl} 
                            />
                        </IntlProvider>
                    </IconProvider>
                </ResponsiveProvider>
            </ConfigProvider>
        </MemoryRouter>
    );
};

export const TopArgumentsWithEmptyArgument = () => {
    return (
        <MemoryRouter>
            <ConfigProvider routes={{ ...routes }} config={{synthesis: {newDesign: false}}}>
                <ResponsiveProvider>
                    <IconProvider library={regularIcons}>
                        <IntlProvider locale="en">
                            <TopArguments
                                argumentAgainst={argumentAgainst}
                                argumentCount={[0, 3]}
                                debate={debate}
                                debateUrl={debateUrl} 
                            />
                        </IntlProvider>
                    </IconProvider>
                </ResponsiveProvider>
            </ConfigProvider>
        </MemoryRouter>
    );
};

export const TopArgumentsNewDesignWithEmptyArgument = () => {
    return (
        <MemoryRouter>
            <ConfigProvider routes={{ ...routes }} config={{synthesis: {newDesign: true}}}>
                <ResponsiveProvider>
                    <IconProvider library={regularIcons}>
                        <IntlProvider locale="en">
                            <TopArguments
                                argumentCount={[0, 0]}
                                debate={debate}
                                debateUrl={debateUrl} 
                            />
                        </IntlProvider>
                    </IconProvider>
                </ResponsiveProvider>
            </ConfigProvider>
        </MemoryRouter>
    );
};