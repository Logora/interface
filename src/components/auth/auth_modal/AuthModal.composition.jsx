import React from 'react';
import { MemoryRouter } from "react-router-dom";
import { IntlProvider } from 'react-intl';
import { dataProvider, DataProviderContext } from '@logora/debate.data.data_provider';
import { ModalProvider } from '@logora/debate.dialog.modal';
import { ConfigProvider } from '@logora/debate.data.config_provider';
import { AuthProvider } from '@logora/debate.auth.use_auth';
import { AuthModal } from './AuthModal';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';

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

export const DefaultAuthModal = () => {
    const data = dataProvider(httpClient, "https://mock.example.api");

    return (
        <div style={{width: "400px", height: "300px"}}>
            <MemoryRouter>
                <ConfigProvider config={config}>
                    <IconProvider library={regularIcons}>
                        <IntlProvider locale="en">
                            <DataProviderContext.Provider value={{ dataProvider: data }}>
                                <AuthProvider>
                                    <ModalProvider>
                                        <AuthModal onHideModal={null} />
                                    </ModalProvider>
                                </AuthProvider>
                            </DataProviderContext.Provider>
                        </IntlProvider>
                    </IconProvider>
                </ConfigProvider>
            </MemoryRouter>
        </div>
    );
};

export const AuthModalSSO = () => {
    const data = dataProvider(httpClient, "https://mock.example.api");
    const newConfig = {
        shortname: "myapp",
        auth: {
            type: "sso"
        }
    };

    return (
        <div style={{width: "400px", height: "300px"}}>
            <MemoryRouter>
                <ConfigProvider config={newConfig}>
                    <IconProvider library={regularIcons}>
                        <IntlProvider locale="en">
                            <DataProviderContext.Provider value={{ dataProvider: data }}>
                                <AuthProvider>
                                    <ModalProvider>
                                        <AuthModal onHideModal={null} />
                                    </ModalProvider>
                                </AuthProvider>
                            </DataProviderContext.Provider>
                        </IntlProvider>
                    </IconProvider>
                </ConfigProvider>
            </MemoryRouter>
        </div>
    );
};