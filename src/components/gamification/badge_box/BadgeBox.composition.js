import React from 'react';
import { BadgeBox } from './BadgeBox';
import { faker } from '@faker-js/faker';
import { IntlProvider } from 'react-intl';

const badge = {
    icon_url: faker.image.avatar(),
    level: 2,
    name: faker.name.jobTitle(),
    next_title_level: 3,
    steps: 20,
    title: faker.name.jobTitle(),
    progress: 6,
}

const badgeCompleted = {
    icon_url: faker.image.avatar(),
    level: 3,
    name: faker.name.jobTitle(),
    next_title_level: 3,
    steps: 13,
    title: faker.name.jobTitle(),
    progress: 13,
}

export const DefaultBadgeBox = () => {
    return (
        <IntlProvider locale="en">
            <BadgeBox 
                eloquenceTitle="" 
                icon_url={badge.icon_url}
                level={badge.level}
                name={badge.name}
                next_title_level={badge.next_title_level}
                steps={badge.steps}
                title={badge.title}
                progress={badge.progress}
            />
        </IntlProvider>
    )
};

export const TitleShownBadgeBox = () => {
    return (
        <IntlProvider locale="en">
            <BadgeBox 
                eloquenceTitle={badgeCompleted.name}
                icon_url={badgeCompleted.icon_url}
                level={badgeCompleted.level}
                name={badgeCompleted.name}
                next_title_level={badgeCompleted.next_title_level}
                steps={badgeCompleted.steps}
                title={badgeCompleted.title}
                progress={badgeCompleted.progress}
            />
        </IntlProvider>
    )
};

export const TitleObtainedBadgeBox = () => {
    return (
        <IntlProvider locale="en">
            <BadgeBox 
                eloquenceTitle=""
                icon_url={badgeCompleted.icon_url}
                level={badgeCompleted.level}
                name={badgeCompleted.name}
                next_title_level={badgeCompleted.next_title_level}
                steps={badgeCompleted.steps}
                title={badgeCompleted.title}
                progress={badgeCompleted.progress}
            />
        </IntlProvider>
    )
};