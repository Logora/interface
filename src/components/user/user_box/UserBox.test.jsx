import React from "react";
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { UserBox  } from "./UserBox";
import { render } from '@testing-library/react';
import { faker } from '@faker-js/faker';
import { Location } from '@logora/debate.util.location';
import { ConfigProvider } from '@logora/debate.data.config_provider';

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
                        <UserBox user={contributorUser} />
                    </ConfigProvider>
                </IntlProvider>
            </BrowserRouter>
        );

        const avatarImg = getByAltText(contributorUser.full_name + "'s profile picture");
        expect(avatarImg).toBeInTheDocument();
        expect(avatarImg).toHaveAttribute('src', contributorUser.image_url);

        expect(getByText(contributorUser.full_name)).toBeInTheDocument();
        expect(getByText(contributorUser.points + " points")).toBeInTheDocument();
        expect(getByText(contributorUser.messages_count + " arguments")).toBeInTheDocument();
        expect(getByText(contributorUser.upvotes + " votes")).toBeInTheDocument();
    });


    it ('renders component correctly when user has no contributor role', () => {
        const { getByText, getByAltText, queryByText } = render(
            <BrowserRouter>
                <IntlProvider locale="en">
                    <ConfigProvider routes={{...routes}}>
                        <UserBox user={defaultUser} />
                    </ConfigProvider>
                </IntlProvider>
            </BrowserRouter>
        );

        const avatarImg = getByAltText(defaultUser.full_name + "'s profile picture");
        expect(avatarImg).toBeInTheDocument();
        expect(avatarImg).toHaveAttribute('src', defaultUser.image_url);

        expect(getByText(defaultUser.full_name)).toBeInTheDocument();
        expect(getByText(defaultUser.messages_count + " arguments")).toBeInTheDocument();
        expect(getByText(defaultUser.upvotes + " votes")).toBeInTheDocument();
        expect(queryByText(defaultUser.points + " points")).not.toBeInTheDocument();
    });
});