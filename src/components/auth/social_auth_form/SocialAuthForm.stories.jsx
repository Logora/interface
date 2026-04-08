import React from 'react';
import { MemoryRouter } from "react-router-dom";
import { IntlProvider } from 'react-intl';
import { SocialAuthForm } from './SocialAuthForm';
import { IconProvider } from '@logora/debate/icons/icon_provider';
import * as regularIcons from '@logora/debate/icons/regular_icons';

const noop = () => false;

const meta = {
    title: 'Auth/Social Auth Form',
    component: SocialAuthForm,
    args: {
        onSubmit: noop,
        lastStep: null,
        facebookClientId: 'facebook-client-id',
        googleClientId: 'google-client-id',
        oAuthRedirectUri: 'https://redirect-uri.com',
        logoUrl: 'https://picsum.photos/200',
        providerName: 'My company',
        termsUrl: 'https://example.com/terms',
        privacyUrl: 'https://example.com/privacy',
        forgotPasswordUrl: 'http://example.com/forgot_password'
    },
    argTypes: {
        onSubmit: {
            control: false
        },
        lastStep: {
            control: 'select',
            options: [null, 'LOGIN', 'SIGNUP']
        },
        facebookClientId: {
            control: 'text'
        },
        googleClientId: {
            control: 'text'
        },
        oAuthRedirectUri: {
            control: 'text'
        },
        logoUrl: {
            control: 'text'
        },
        providerName: {
            control: 'text'
        },
        termsUrl: {
            control: 'text'
        },
        privacyUrl: {
            control: 'text'
        },
        forgotPasswordUrl: {
            control: 'text'
        }
    },
    render: (args) => (
        <MemoryRouter>
            <IconProvider library={regularIcons}>
                <IntlProvider locale="en">
                    <SocialAuthForm {...args} />
                </IntlProvider>
            </IconProvider>
        </MemoryRouter>
    )
};

export default meta;

const renderStory = (overrides = {}) => meta.render({ ...meta.args, ...overrides });

export const DefaultSocialAuthForm = (props) => renderStory(props);

export const SocialAuthFormWithoutLogo = (props) => renderStory({
    logoUrl: null,
    ...props
});

export const SocialAuthFormLoginForm = (props) => renderStory({ lastStep: 'LOGIN', ...props });

export const SocialAuthFormSignupForm = (props) => renderStory({ lastStep: 'SIGNUP', ...props });
