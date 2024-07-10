import React from 'react';
import { IntlProvider } from 'react-intl';
import { FollowButton } from './FollowButton';
import { dataProvider, DataProviderContext } from '@logora/debate.data.data_provider';
import { AuthProvider } from '@logora/debate.auth.use_auth';
import { ConfigContext } from '@logora/debate.data.config_provider';
import { ModalProvider } from '@logora/debate.dialog.modal';
import { MemoryRouter } from "react-router";
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';

export const DefaultFollowButton = () => {
    const httpClient = {};
    const data = dataProvider(httpClient, "https://mock.example.api");
    const config = { auth: { disableLoginModal: false }};

    return (
        <MemoryRouter>
            <IntlProvider locale='en'>
                <IconProvider library={regularIcons}>
                    <DataProviderContext.Provider value={{ dataProvider: data }}>
                        <AuthProvider>
                            <ConfigContext.Provider value={{ config }}>
                                <ModalProvider>
                                    <FollowButton 
                                        followableType={"content"}
                                        followableId={12}
                                        tooltipText={"Tooltip content"}
                                        dataTid={"data-tid"}
                                    />
                                </ModalProvider>
                            </ConfigContext.Provider>
                        </AuthProvider>
                    </DataProviderContext.Provider>
                </IconProvider>
            </IntlProvider>
        </MemoryRouter>
    )
};

export const FollowButtonNoBorder = () => {
    const httpClient = {};
    const data = dataProvider(httpClient, "https://mock.example.api");
    const config = { auth: { disableLoginModal: false }};

    return (
        <MemoryRouter>
            <IntlProvider locale='en'>
                <IconProvider library={regularIcons}>
                    <DataProviderContext.Provider value={{ dataProvider: data }}>
                        <AuthProvider>
                            <ConfigContext.Provider value={{ config }}>
                                <ModalProvider>
                                    <FollowButton 
                                        followableType={"content"}
                                        followableId={12}
                                        tooltipText={"Tooltip content"}
                                        dataTid={"data-tid"}
                                        noBorder
                                    />
                                </ModalProvider>
                            </ConfigContext.Provider>
                        </AuthProvider>
                    </DataProviderContext.Provider>
                </IconProvider>
            </IntlProvider>
        </MemoryRouter>
    )
};