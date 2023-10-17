import React from 'react';
import { ConfigProvider } from '@logora/debate.data.config_provider';
import { UserBoxSmall } from './UserBoxSmall';
import { IntlProvider } from 'react-intl';
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

export const DefaultUserBoxSmall = () => {
    return (
        <BrowserRouter>
            <ConfigProvider routes={{...routes}}>
                <IntlProvider locale='en'>
                    <UserBoxSmall userName={user.full_name} userSlug={user.slug} avatarUrl={user.image_url} />
                </IntlProvider>
            </ConfigProvider>
        </BrowserRouter>
    )
};