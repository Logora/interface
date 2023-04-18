import React from 'react';
import { Avatar } from './Avatar';
import { IntlProvider } from 'react-intl';
import { faker } from '@faker-js/faker';

const avatarUrl = faker.image.avatar();
const userName = faker.name.fullName();

export const DefaultAvatar = () => {
    return (
        <IntlProvider>
            <Avatar avatarUrl={avatarUrl} userName={userName} />
        </IntlProvider>
    );
};

export const AvatarSmall = () => {
    return (
        <IntlProvider>
            <Avatar avatarUrl={avatarUrl} userName={userName} size={"small"} />
        </IntlProvider>
    );
};

export const AvatarLarge = () => {
    return (
        <IntlProvider>
            <Avatar avatarUrl={avatarUrl} userName={userName} size={"large"} />
        </IntlProvider>
    );
};

export const AvatarOnline = () => {
    return (
        <IntlProvider>
            <Avatar avatarUrl={avatarUrl} userName={userName} isOnline />
        </IntlProvider>
    );
};


export const AvatarSmallOnline = () => {
    return (
        <IntlProvider>
            <Avatar avatarUrl={avatarUrl} userName={userName} size={"small"} isOnline />
        </IntlProvider>
    );
};

export const AvatarLargeOnline = () => {
    return (
        <IntlProvider>
            <Avatar avatarUrl={avatarUrl} userName={userName} size={"large"} isOnline />
        </IntlProvider>
    );
};