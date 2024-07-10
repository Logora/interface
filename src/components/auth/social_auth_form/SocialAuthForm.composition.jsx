import React from 'react';
import { MemoryRouter } from "react-router";
import { IntlProvider } from 'react-intl';
import { SocialAuthForm } from './SocialAuthForm';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';

export const DefaultSocialAuthForm = () => {
    return (
        <MemoryRouter>
            <IconProvider library={regularIcons}>
                <IntlProvider locale="en">
                    <SocialAuthForm 
                        onSubmit={(data, authType, lastStep, consent) => false } 
                        facebookClientId={"facebook-client-id"}
                        googleClientId={"google-client-id"}
                        oAuthRedirectUri={"https://redirect-uri.com"} 
                        logoUrl={"https://picsum.photos/200"}
                        providerName={"My company"}
                        termsUrl={"https://example.com/terms"}
                        privacyUrl={"https://example.com/privacy"}
                        forgotPasswordUrl={"http://example.com/forgot_password"} 
                    />
                </IntlProvider>
            </IconProvider>
        </MemoryRouter>
    );
};

export const SocialAuthFormWithoutLogo = () => {
    return (
        <MemoryRouter>
            <IconProvider library={regularIcons}>
                <IntlProvider locale="en">
                    <SocialAuthForm 
                        onSubmit={(data, authType, lastStep, consent) => false } 
                        facebookClientId={"facebook-client-id"}
                        googleClientId={"google-client-id"}
                        oAuthRedirectUri={"https://redirect-uri.com"} 
                        providerName={"My company"}
                        termsUrl={"https://example.com/terms"}
                        privacyUrl={"https://example.com/privacy"}
                        forgotPasswordUrl={"http://example.com/forgot_password"} 
                    />
                </IntlProvider>
            </IconProvider>
        </MemoryRouter>
    );
};

export const SocialAuthFormLoginForm = () => {
    return (
        <MemoryRouter>
            <IconProvider library={regularIcons}>
                <IntlProvider locale="en">
                    <SocialAuthForm 
                            onSubmit={(data, authType, lastStep, consent) => false } 
                            lastStep={"LOGIN"}
                            facebookClientId={"facebook-client-id"}
                        googleClientId={"google-client-id"}
                        oAuthRedirectUri={"https://redirect-uri.com"} 
                        logoUrl={"https://picsum.photos/200"}
                        providerName={"My company"}
                        termsUrl={"https://example.com/terms"}
                        privacyUrl={"https://example.com/privacy"}
                        forgotPasswordUrl={"http://example.com/forgot_password"} 
                    />
                </IntlProvider>
            </IconProvider>
        </MemoryRouter>
    );
};

export const SocialAuthFormSignupForm = () => {
    return (
        <MemoryRouter>
            <IconProvider library={regularIcons}>
                <IntlProvider locale="en">
                    <SocialAuthForm 
                        onSubmit={(data, authType, lastStep, consent) => false } 
                        lastStep={"SIGNUP"}
                        facebookClientId={"facebook-client-id"}
                        googleClientId={"google-client-id"}
                        oAuthRedirectUri={"https://redirect-uri.com"} 
                        logoUrl={"https://picsum.photos/200"}
                        providerName={"My company"}
                        termsUrl={"https://example.com/terms"}
                        privacyUrl={"https://example.com/privacy"}
                        forgotPasswordUrl={"http://example.com/forgot_password"} 
                    />
                </IntlProvider>
            </IconProvider>
        </MemoryRouter>
    );
};