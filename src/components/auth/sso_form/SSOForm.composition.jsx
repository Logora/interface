import React from 'react';
import { MemoryRouter } from "react-router";
import { IntlProvider } from 'react-intl';
import { SSOForm } from './SSOForm';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';
import { faker } from '@faker-js/faker';

export const DefaultSSOForm = () => {
    return (
        <MemoryRouter>
            <IconProvider library={regularIcons}>
                <IntlProvider locale="en">
                    <SSOForm 
                        authType={"oauth2_server"}
                        clientId={"client-id"}
                        scope={"email"}
                        oAuthRedirectUri={"https://redirect-uri.com"} 
                        loginUrl={"https://example.com/login"}
                        signupUrl={"https://example.com/signup"}
                        redirectParameter={"customRedirect"}
                        trackingParameters={{ test: "OK" }}
                        termsUrl={"https://example.com/terms"}
                    />
                </IntlProvider>
            </IconProvider>
        </MemoryRouter>
    );
};


export const SSOFormWithRedirect = () => {
    return (
        <MemoryRouter>
            <IconProvider library={regularIcons}>
                <IntlProvider locale="en">
                    <SSOForm 
                        authType={"other"}
                        loginUrl={"https://example.com/login"}
                        signupUrl={"https://example.com/signup"}
                        termsUrl={"https://example.com/terms"}
                    />
                </IntlProvider>
            </IconProvider>
        </MemoryRouter>
    );
};

export const SSOFormWithLogoUrl = () => {
    return (
        <MemoryRouter>
            <IconProvider library={regularIcons}>
                <IntlProvider locale="en">
                    <SSOForm 
                        clientId={"client-id"}
                        scope={"email"}
                        oAuthRedirectUri={"https://redirect-uri.com"} 
                        showEmailConsent={true}
                        logoUrl={faker.image.abstract()}
                        providerName={"FSociety Inc."}
                        termsUrl={"https://example.com/terms"}
                        error={true}
                    />
                </IntlProvider>
            </IconProvider>
        </MemoryRouter>
    );
};

export const SSOFormWithEmailConsent = () => {
    return (
        <MemoryRouter>
            <IconProvider library={regularIcons}>
                <IntlProvider locale="en">
                    <SSOForm 
                        clientId={"client-id"}
                        scope={"email"}
                        oAuthRedirectUri={"https://redirect-uri.com"} 
                        showEmailConsent={true}
                        providerName={"FSociety Inc."}
                        termsUrl={"https://example.com/terms"}
                    />
                </IntlProvider>
            </IconProvider>
        </MemoryRouter>
    );
};

export const SSOFormWithTerms = () => {
    return (
        <MemoryRouter>
            <IconProvider library={regularIcons}>
                <IntlProvider locale="en">
                    <SSOForm 
                        clientId={"client-id"}
                        scope={"email"}
                        oAuthRedirectUri={"https://redirect-uri.com"} 
                        showEmailConsent={true}
                        showTerms={true}
                        providerName={"FSociety Inc."}
                        termsUrl={"https://example.com/terms"}
                    />
                </IntlProvider>
            </IconProvider>
        </MemoryRouter>
    );
};

export const SSOFormWithError = () => {
    return (
        <MemoryRouter>
            <IconProvider library={regularIcons}>
                <IntlProvider locale="en">
                    <SSOForm 
                        clientId={"client-id"}
                        scope={"email"}
                        oAuthRedirectUri={"https://redirect-uri.com"} 
                        showEmailConsent={true}
                        providerName={"FSociety Inc."}
                        termsUrl={"https://example.com/terms"}
                        error={true}
                    />
                </IntlProvider>
            </IconProvider>
        </MemoryRouter>
    );
};

export const SSOFormWithoutActions = () => {
    return (
        <MemoryRouter>
            <IconProvider library={regularIcons}>
                <IntlProvider locale="en">
                    <SSOForm 
                        subtitle={"My awesome subtitle to give more info"}
                        clientId={"client-id"}
                        scope={"email"}
                        oAuthRedirectUri={"https://redirect-uri.com"} 
                        showEmailConsent={true}
                        providerName={"FSociety Inc."}
                        termsUrl={"https://example.com/terms"}
                        hideActions={true}
                    />
                </IntlProvider>
            </IconProvider>
        </MemoryRouter>
    );
};