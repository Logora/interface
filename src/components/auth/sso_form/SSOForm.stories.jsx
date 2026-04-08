import React from 'react';
import { MemoryRouter } from "react-router-dom";
import { IntlProvider } from 'react-intl';
import { SSOForm } from './SSOForm';
import { IconProvider } from '@logora/debate/icons/icon_provider';
import * as regularIcons from '@logora/debate/icons/regular_icons';
import { faker } from '@faker-js/faker';

const meta = {
    title: 'Auth/Sso Form',
    component: SSOForm,
    args: {
        authType: 'oauth2_server',
        clientId: 'client-id',
        scope: 'email',
        oAuthRedirectUri: 'https://redirect-uri.com',
        loginUrl: 'https://example.com/login',
        signupUrl: 'https://example.com/signup',
        redirectParameter: 'customRedirect',
        trackingParameters: { test: 'OK' },
        termsUrl: 'https://example.com/terms',
        showEmailConsent: false,
        showTerms: false,
        hideActions: false,
        hideBelowButton: false,
        subtitle: null,
        logoUrl: null,
        providerName: null,
        error: false
    },
    argTypes: {
        authType: { control: 'text' },
        clientId: { control: 'text' },
        scope: { control: 'text' },
        oAuthRedirectUri: { control: 'text' },
        loginUrl: { control: 'text' },
        signupUrl: { control: 'text' },
        redirectParameter: { control: 'text' },
        trackingParameters: { control: 'object' },
        termsUrl: { control: 'text' },
        showEmailConsent: { control: 'boolean' },
        showTerms: { control: 'boolean' },
        hideActions: { control: 'boolean' },
        hideBelowButton: { control: 'boolean' },
        subtitle: { control: 'text' },
        logoUrl: { control: 'text' },
        providerName: { control: 'text' },
        error: { control: 'boolean' }
    },
    render: (args) => (
        <MemoryRouter>
            <IconProvider library={regularIcons}>
                <IntlProvider locale="en">
                    <SSOForm {...args} />
                </IntlProvider>
            </IconProvider>
        </MemoryRouter>
    )
};

export default meta;

const renderStory = (overrides = {}) => meta.render({ ...meta.args, ...overrides });

export const DefaultSSOForm = (props) => renderStory(props);


export const SSOFormWithRedirect = (props) => renderStory({
    authType: 'other',
    redirectParameter: 'logora_redirect',
    trackingParameters: {},
    ...props
});

export const SSOFormWithLogoUrl = (props) => renderStory({
    showEmailConsent: true,
    logoUrl: faker.image.url(),
    providerName: 'FSociety Inc.',
    error: true,
    ...props
});

export const SSOFormWithEmailConsent = (props) => renderStory({
    showEmailConsent: true,
    providerName: 'FSociety Inc.',
    ...props
});

export const SSOFormWithTerms = (props) => renderStory({
    showEmailConsent: true,
    showTerms: true,
    providerName: 'FSociety Inc.',
    ...props
});

export const SSOFormWithError = (props) => renderStory({
    showEmailConsent: true,
    providerName: 'FSociety Inc.',
    error: true,
    ...props
});

export const SSOFormWithoutActions = (props) => renderStory({
    subtitle: 'My awesome subtitle to give more info',
    showEmailConsent: true,
    providerName: 'FSociety Inc.',
    hideActions: true,
    ...props
});

export const SSOFormHideBelowButton = (props) => renderStory({
    subtitle: 'My awesome subtitle to give more info',
    showEmailConsent: true,
    providerName: 'FSociety Inc.',
    hideBelowButton: true,
    ...props
});
