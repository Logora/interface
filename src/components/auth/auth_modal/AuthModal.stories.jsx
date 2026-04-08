import React from 'react';
import { MemoryRouter } from "react-router-dom";
import { IntlProvider } from 'react-intl';
import { dataProvider, DataProviderContext } from '@logora/debate/data/data_provider';
import { ModalProvider } from '@logora/debate/dialog/modal';
import { ConfigProvider } from '@logora/debate/data/config_provider';
import { AuthProvider } from '@logora/debate/auth/use_auth';
import { AuthModal } from './AuthModal';
import { IconProvider } from '@logora/debate/icons/icon_provider';
import * as regularIcons from '@logora/debate/icons/regular_icons';

const httpClient = {
    get: () => null,
    post: () => null,
    patch: () => null
};

const config = {
    shortname: "myapp",
    auth: {
        type: "social"
    }
};

export default {
    title: 'Auth/Auth Modal',
    component: AuthModal,
    tags: ['!autodocs'],
    parameters: {
        docs: {
            disable: true
        }
    },
    args: {
        authType: 'social',
        hideBelowButton: false,
        onHideModal: null
    },
    argTypes: {
        authType: {
            control: 'select',
            options: ['social', 'sso']
        },
        hideBelowButton: {
            control: 'boolean'
        },
        onHideModal: {
            control: false
        }
    },
    render: ({ authType, hideBelowButton, ...args }) => {
        const data = dataProvider(httpClient, 'https://mock.example.api');
        const currentConfig = {
            ...config,
            auth: {
                type: authType,
                hideBelowButton
            }
        };

        return (
            <div style={{ width: '400px', height: '300px' }}>
                <MemoryRouter>
                    <ConfigProvider config={currentConfig}>
                        <IconProvider library={regularIcons}>
                            <IntlProvider locale="en">
                                <DataProviderContext.Provider value={{ dataProvider: data }}>
                                    <AuthProvider>
                                        <ModalProvider>
                                            <AuthModal {...args} />
                                        </ModalProvider>
                                    </AuthProvider>
                                </DataProviderContext.Provider>
                            </IntlProvider>
                        </IconProvider>
                    </ConfigProvider>
                </MemoryRouter>
            </div>
        );
    }
};

export const DefaultAuthModal = {};

export const AuthModalSSO = {
    args: {
        authType: 'sso'
    }
};

export const AuthModalSSOHideBelowButton = {
    args: {
        authType: 'sso',
        hideBelowButton: true
    }
};
