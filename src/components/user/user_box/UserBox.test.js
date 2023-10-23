import React from "react";
import { UserBox  } from "./UserBox";
import { render } from '@testing-library/react';
import { faker } from '@faker-js/faker';
import { Location } from '@logora/debate.util.location';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { ConfigProvider } from '@logora/debate.data.config_provider';

const user = {
    id: 82,
    uid: "296deae0-15e3-46dd-bd85-498456809453",
    hash_id: "296deae0-15e3-46dd",
    image_url: faker.image.avatar(),
    full_name: faker.name.fullName(),
    slug: faker.lorem.slug(),
    score: 0,
    points: 1539,
    description: null,
    last_activity: faker.date.recent(),
    groups_count: 5,
    upvotes: 13,
    messages_count: 20,
    eloquence_title: null
}

let UserShowLocation = new Location('espace-debat/user/:userSlug', { userSlug: "" })

const routes = {
    userShowLocation: UserShowLocation,
}

describe('UserBox', () => {
    it ('renders component with correct data', () => {  
        const { getByText, getByAltText } = render(
            <BrowserRouter>
                <IntlProvider locale="en">
                    <ConfigProvider routes={{...routes}}>
                        <UserBox user={user} />
                    </ConfigProvider>
                </IntlProvider>
            </BrowserRouter>
        );

        const avatarImg = getByAltText(user.full_name + "'s profile picture");
        expect(avatarImg).toBeInTheDocument();
        expect(avatarImg).toHaveAttribute('src', user.image_url);

        expect(getByText(user.full_name)).toBeInTheDocument();
        expect(getByText(user.points + " points")).toBeInTheDocument();
        expect(getByText(user.messages_count + " arguments")).toBeInTheDocument();
        expect(getByText(user.upvotes + " votes")).toBeInTheDocument();
    });
});