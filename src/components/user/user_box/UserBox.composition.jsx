import React from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router';
import { ConfigProvider } from '@logora/debate.data.config_provider';
import { UserBox } from './UserBox';
import { Location } from '@logora/debate.util.location';
import { faker } from '@faker-js/faker';

const defaultUser = {
    id: 83,
    uid: "396deae0-15e3-46dd-bd85-498456809453",
    hash_id: "396deae0-15e3-46dd",
    image_url: faker.image.avatar(),
    full_name: faker.name.fullName(),
    slug: faker.lorem.slug(),
    score: 0,
    points: 100,
    description: null,
    last_activity: faker.date.recent(),
    groups_count: 2,
    upvotes: 5,
    messages_count: 8,
    eloquence_title: null
};

const contributorUser = {
    id: 82,
    uid: "296deae0-15e3-46dd-bd85-498456809453",
    hash_id: "296deae0-15e3-46dd",
    image_url: faker.image.avatar(),
    full_name: faker.name.fullName(),
    slug: faker.lorem.slug(),
    score: 0,
    points: 1539,
    role: "contributor", 
    description: null,
    last_activity: faker.date.recent(),
    groups_count: 5,
    upvotes: 13,
    messages_count: 20,
    eloquence_title: null
};

let UserShowLocation = new Location('espace-debat/user/:userSlug', { userSlug: "" })

const routes = {
    userShowLocation: UserShowLocation,
}

export const DefaultUserBox = () => {
    return (
        <BrowserRouter>
            <IntlProvider locale="en">
                <ConfigProvider routes={{...routes}}>
                    <UserBox user={defaultUser} />
                </ConfigProvider>
            </IntlProvider>
        </BrowserRouter>
    )
};


export const UserBoxWithRoleContributor = () => {
    return (
        <BrowserRouter>
            <IntlProvider locale="en">
                <ConfigProvider routes={{...routes}}>
                    <UserBox user={contributorUser} />
                </ConfigProvider>
            </IntlProvider>
        </BrowserRouter>
    )
};

