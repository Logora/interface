import React from 'react';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Avatar } from './Avatar';
import { faker } from '@faker-js/faker';

const messages = {
    'user.avatar.alt': "{name}'s avatar picture",
    'user.avatar.online': '{name} is here',
};

const defaultUrls = {
    avatarUrl: faker.image.avatar(),
    defaultAvatarUrl: faker.image.avatar(),
}

describe('Avatar', () => {
    const defaultProps = {
        avatarUrl: defaultUrls.avatarUrl,
        defaultAvatarUrl: defaultUrls.defaultAvatarUrl,
        userName: 'John',
        isOnline: true,
        className: 'custom-class',
    };

    it('renders user profile picture with alt text and default size', () => {
        render(
            <IntlProvider locale="en" messages={messages}>
                <Avatar {...defaultProps} />
            </IntlProvider>
        );
        const avatarImg = screen.getByTitle("John's avatar picture");
        const defaultAvatarImg = screen.getByAltText("John's avatar picture");
        expect(avatarImg).toBeInTheDocument();
        expect(avatarImg).toHaveAttribute('src', defaultUrls.avatarUrl);
        expect(defaultAvatarImg).toHaveAttribute('src', defaultUrls.defaultAvatarUrl);
        expect(avatarImg).toHaveAttribute('height', '40');
        expect(avatarImg).toHaveAttribute('width', '40');
        expect(avatarImg).toHaveStyle('height: 40px');
        expect(avatarImg).toHaveStyle('width: 40px');
        expect(avatarImg).toHaveClass('custom-class');
    });

    it('renders default avatar picture if avatarUrl is empty', () => {
        const props = { userName: "John", className: "avatar-class", avatarUrl: defaultUrls.avatarUrl, defaultAvatarUrl: defaultUrls.defaultAvatarUrl };
        render(
          <IntlProvider locale="en" messages={messages}>
            <Avatar {...props} />
          </IntlProvider>
        );
        const defaultAvatarImg = screen.getByAltText("John's avatar picture");
        expect(defaultAvatarImg).toHaveAttribute('src', defaultUrls.defaultAvatarUrl);
        expect(defaultAvatarImg).toHaveAttribute('height', '40');
        expect(defaultAvatarImg).toHaveAttribute('width', '40');
        expect(defaultAvatarImg).toHaveStyle('height: 40px');
        expect(defaultAvatarImg).toHaveStyle('width: 40px');
        expect(defaultAvatarImg).toHaveClass('avatar-class');
    });

    it('renders user online status when isOnline prop is true', () => {
        render(
            <IntlProvider locale="en" messages={messages}>
                <Avatar {...defaultProps} />
            </IntlProvider>
        );
        const onlinePin = screen.getByTestId('online-pin');
        expect(onlinePin).toBeInTheDocument();
        expect(onlinePin).toHaveClass('onlinePin');
    });

    it('renders user offline status when isOnline prop is false', () => {
        const props = { ...defaultProps, isOnline: false };
        render(
            <IntlProvider locale="en" messages={messages}>
                <Avatar {...props} />
            </IntlProvider>
        );
        const onlinePin = screen.queryByTestId('online-pin');
        expect(onlinePin).not.toBeInTheDocument();
    });

    it('renders tooltip with online status message when isOnline prop is true', () => {
        render(
            <IntlProvider locale="en" messages={messages}>
                <Avatar {...defaultProps} />
            </IntlProvider>
        );
        const onlineTooltip = screen.getByText('John is here');
        expect(onlineTooltip).toBeInTheDocument();
        expect(onlineTooltip).toHaveClass('tooltipText');
    });

    it('does not render tooltip when isOnline prop is false', () => {
        const props = { ...defaultProps, isOnline: false };
        render(
            <IntlProvider locale="en" messages={messages}>
                <Avatar {...props} />
            </IntlProvider>
        );
        const onlineTooltip = screen.queryByText('John is here');
        expect(onlineTooltip).not.toBeInTheDocument();
    });

    it('renders user profile picture with alt text and custom size', () => {
        const props = { ...defaultProps, size: 25 };
        render(
          <IntlProvider locale="en" messages={messages}>
            <Avatar {...props} />
          </IntlProvider>
        );
        const avatarImg = screen.getByTitle("John's avatar picture");
        expect(avatarImg).toBeInTheDocument();
        expect(avatarImg).toHaveAttribute('src', defaultUrls.avatarUrl);
        expect(avatarImg).toHaveAttribute('height', '25');
        expect(avatarImg).toHaveAttribute('width', '25');
        expect(avatarImg).toHaveClass('custom-class');
    });
});
