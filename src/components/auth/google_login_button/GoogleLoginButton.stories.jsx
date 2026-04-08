import React from 'react';
import { MemoryRouter } from "react-router-dom";
import { GoogleLoginButton } from './GoogleLoginButton';
import { IconProvider } from '@logora/debate/icons/icon_provider';
import * as regularIcons from '@logora/debate/icons/regular_icons';

export default {
    title: 'Auth/Google Login Button',
    component: GoogleLoginButton,
    args: {
        text: 'Sign in with Google',
        googleClientId: 'client-id',
        redirectUri: 'https://auth.redirect/uri'
    },
    argTypes: {
        text: {
            control: 'text'
        },
        googleClientId: {
            control: 'text'
        },
        redirectUri: {
            control: 'text'
        }
    },
    render: (args) => (
        <MemoryRouter>
            <IconProvider library={regularIcons}>
                <GoogleLoginButton {...args} />
            </IconProvider>
        </MemoryRouter>
    )
};

export const DefaultGoogleLoginButton = {};
