import React from 'react';
import { MemoryRouter } from "react-router-dom";
import { FacebookLoginButton } from './FacebookLoginButton';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';

export const DefaultFacebookLoginButton = () => {
    return (
        <MemoryRouter>
            <IconProvider library={regularIcons}>
                <FacebookLoginButton 
                    text={"Sign in with Facebook"}
                    facebookClientId={"client-id"}
                    redirectUri={"https://auth.redirect/uri"}
                />
            </IconProvider>
        </MemoryRouter>
    );
};