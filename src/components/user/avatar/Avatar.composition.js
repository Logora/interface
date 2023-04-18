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

export const AvatarOnline = () => {
    return (
        <IntlProvider>
            <Avatar avatarUrl={avatarUrl} userName={userName} isOnline />
        </IntlProvider>
    );
};