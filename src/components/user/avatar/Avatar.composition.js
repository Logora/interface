import React from 'react';
import { Avatar } from './Avatar';
import { IntlProvider } from 'react-intl';
import { faker } from '@faker-js/faker';

const avatarUrl = faker.image.avatar();
const defaultAvatarUrl = faker.image.avatar();
const userName = faker.name.fullName();

export const DefaultAvatar = () => {
    return (
        <IntlProvider locale="en">
            <Avatar avatarUrl={avatarUrl} userName={userName} />
        </IntlProvider>
    );
};

export const AvatarWithDefaultImage = () => {
    return (
        <IntlProvider locale="en">
            <Avatar userName={userName} />
        </IntlProvider>
    );
};

export const AvatarSmall = () => {
    return (
        <IntlProvider locale="en">
            <Avatar avatarUrl={avatarUrl} userName={userName} size={20} />
        </IntlProvider>
    );
};

export const AvatarLarge = () => {
    return (
        <IntlProvider locale="en">
            <Avatar avatarUrl={avatarUrl} userName={userName} size={60} />
        </IntlProvider>
    );
};

export const AvatarOnline = () => {
    return (
        <IntlProvider locale="en">
            <Avatar avatarUrl={avatarUrl} userName={userName} isOnline />
        </IntlProvider>
    );
};


export const AvatarSmallOnline = () => {
    return (
        <IntlProvider locale="en">
            <Avatar avatarUrl={avatarUrl} userName={userName} size={20} isOnline />
        </IntlProvider>
    );
};

export const AvatarLargeOnline = () => {
    return (
        <IntlProvider locale="en">
            <Avatar avatarUrl={avatarUrl} userName={userName} size={60} isOnline />
        </IntlProvider>
    );
};

export const FallbackAvatar = () => {
    return (
        <IntlProvider locale="en">
            <Avatar avatarUrl={"https://example.com/does-not-exist.png"} userName={userName} />
        </IntlProvider>
    );
};