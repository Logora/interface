import React from 'react';
import { IntlProvider } from 'react-intl';
import { ConfigProvider } from '@logora/debate.data.config_provider';
import { UserBox } from './UserBox';
import { Location } from '@logora/debate.util.location';
import { BrowserRouter } from 'react-router-dom';
import { faker } from '@faker-js/faker';

export const user = {
    id: 82,
    uid: "296deae0-15e3-46dd-bd85-498456809453",
    hash_id: "296deae0-15e3-46dd",
    image_url: faker.image.avatar(),
    full_name: faker.name.fullName(),
    slug: faker.lorem.slug(),
    score: 0,
    points: 1539,
    description: null,
    last_activity: "2023-02-10T12:22:18.192Z",
    groups_count: 5,
    upvotes: 13,
    messages_count: 20,
    eloquence_title: null
}

let UserShowLocation = new Location('espace-debat/user/:userSlug', { userSlug: "" })

const routes = {
    userShowLocation: UserShowLocation,
}

export const DefaultUserBox = () => {
    return (
        <BrowserRouter>
            <IntlProvider locale="en">
                <ConfigProvider routes={{...routes}}>
                    <UserBox user={user} />
                </ConfigProvider>
            </IntlProvider>
        </BrowserRouter>
    )
};