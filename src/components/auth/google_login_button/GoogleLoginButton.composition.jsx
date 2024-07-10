import React from 'react';
import { MemoryRouter } from "react-router";
import { GoogleLoginButton } from './GoogleLoginButton';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';

export const DefaultGoogleLoginButton = () => {
    return (
        <MemoryRouter>
            <IconProvider library={regularIcons}>
                <GoogleLoginButton 
                    text={"Sign in with Google"}
                    googleClientId={"client-id"}
                    redirectUri={"https://auth.redirect/uri"}
                />
            </IconProvider>
        </MemoryRouter>
    );
};