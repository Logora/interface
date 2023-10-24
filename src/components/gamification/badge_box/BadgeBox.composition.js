import React from 'react';
import { BadgeBox } from './BadgeBox';
import { faker } from '@faker-js/faker';
import { IntlProvider } from 'react-intl';

const badge = {
    badge: {
        icon_url: faker.image.avatar(),
        level: 2,
        name: faker.name.jobTitle(),
        next_title_level: 3,
        steps: 20,
        title: faker.name.jobTitle(),
    },
    progress: 6,
}

const badgeCompleted = {
    badge: {
        icon_url: faker.image.avatar(),
        level: 3,
        name: faker.name.jobTitle(),
        next_title_level: 3,
        steps: 13,
        title: faker.name.jobTitle(),
    },
    progress: 13,
}

export const DefaultBadgeBox = () => {
    return (
        <IntlProvider locale="en">
            <BadgeBox eloquenceTitle="" badge={badge} />
        </IntlProvider>
    )
};

export const TitleShownBadgeBox = () => {
    return (
        <IntlProvider locale="en">
            <BadgeBox eloquenceTitle={badgeCompleted.badge.name} badge={badgeCompleted} />
        </IntlProvider>
    )
};

export const TitleObtainedBadgeBox = () => {
    return (
        <IntlProvider locale="en">
            <BadgeBox eloquenceTitle="" badge={badgeCompleted} />
        </IntlProvider>
    )
};