import React from 'react';
import { IntlProvider } from 'react-intl';
import { ConfigProvider } from '@logora/debate/data/config_provider';
import { MemoryRouter } from 'react-router-dom';
import { Location } from '@logora/debate/util/location';
import { TopArguments } from './TopArguments';
import { IconProvider } from '@logora/debate/icons/icon_provider';
import { ResponsiveProvider } from '@logora/debate/hooks/use_responsive';
import * as regularIcons from '@logora/debate/icons/regular_icons';
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
        image_url: faker.image.avatarGitHub(),
        full_name: faker.person.fullName(),
        hash_id: faker.lorem.slug(),
        slug: faker.lorem.slug(),
        points: 1320,
        last_activity: new Date(),
        description: faker.person.jobTitle()
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
        image_url: faker.image.avatarGitHub(),
        full_name: faker.person.fullName(),
        hash_id: faker.lorem.slug(),
        slug: faker.lorem.slug(),
        points: 5672,
        last_activity: new Date(),
        description: faker.person.jobTitle()
    },
    position: {
        id: 397,
        name: "Against"
    }
};

const meta = {
    title: 'Argument/Top Arguments',
    component: TopArguments,
    args: {
        newDesign: false,
        showArgumentFor: true,
        showArgumentAgainst: true,
        argumentCount: [5, 3],
        debate,
        debateUrl
    },
    argTypes: {
        newDesign: {
            control: 'boolean'
        },
        showArgumentFor: {
            control: 'boolean'
        },
        showArgumentAgainst: {
            control: 'boolean'
        },
        argumentCount: {
            control: 'object'
        },
        debate: {
            control: 'object'
        },
        debateUrl: {
            control: 'text'
        }
    },
    render: ({ newDesign, showArgumentFor, showArgumentAgainst, ...args }) => (
        <MemoryRouter>
            <ConfigProvider routes={{ ...routes }} config={{ synthesis: { newDesign } }}>
                <ResponsiveProvider>
                    <IconProvider library={regularIcons}>
                        <IntlProvider locale="en">
                            <TopArguments
                                {...args}
                                argumentFor={showArgumentFor ? argumentFor : undefined}
                                argumentAgainst={showArgumentAgainst ? argumentAgainst : undefined}
                            />
                        </IntlProvider>
                    </IconProvider>
                </ResponsiveProvider>
            </ConfigProvider>
        </MemoryRouter>
    )
};

export default meta;

const renderStory = (overrides = {}) => meta.render({ ...meta.args, ...overrides });

export const DefaultTopArguments = (props) => renderStory(props);

export const TopArgumentsWithEmptyArgument = (props) => renderStory({
    showArgumentFor: false,
    argumentCount: [0, 3],
    ...props
});

export const TopArgumentsNewDesign = (props) => renderStory({
    newDesign: true,
    showArgumentFor: false,
    argumentCount: [0, 3],
    ...props
});

export const TopArgumentsNewDesignWithEmptyArgument = (props) => renderStory({
    newDesign: true,
    showArgumentFor: false,
    showArgumentAgainst: false,
    argumentCount: [0, 0],
    ...props
});
