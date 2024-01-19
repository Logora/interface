import React from 'react';
import { UpdateUserInfoModal } from './UpdateUserInfoModal';
import { IntlProvider } from 'react-intl';
import { dataProvider, DataProviderContext } from '@logora/debate.data.data_provider';
import { AuthProvider } from '@logora/debate.auth.use_auth';
import { ModalProvider } from "@logora/debate.dialog.modal";
import { ConfigProvider } from '@logora/debate.data.config_provider';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';

const httpClient = {
    get: () => null,
    post: () => null,
    patch: () => { return new Promise((resolve, reject) => {
            resolve(
                {
                    status: 200, 
                    data: {
                        success: true,
                        data: {
                            language: "fr",
                            first_name: "Test",
                            last_name: "Test"
                        }
                    }
                } 
            );
        });
    },
};

const data = dataProvider(httpClient, "https://mock.example.api");

export const DefaultUpdateUserInfoModal = () => {
    return (
        <div style={{ width: "850px", height: "300px" }}>
            <ModalProvider>
                <ConfigProvider config={{ translation: { translationMethods: [{fr: "en"}] }}}>
                    <IconProvider library={regularIcons}>
                        <IntlProvider locale="en">
                            <DataProviderContext.Provider value={{ dataProvider: data }}>
                                <AuthProvider>
                                    <UpdateUserInfoModal />
                                </AuthProvider>
                            </DataProviderContext.Provider>
                        </IntlProvider>
                    </IconProvider>
                </ConfigProvider>
            </ModalProvider> 
        </div>
    );
};

export const UpdateUserInfoModalWithTermsAndConsent = () => {
    return (
        <div style={{ width: "850px", height: "300px" }}>
            <ModalProvider>
                <ConfigProvider config={{ translation: { translationMethods: [{fr: "en"}] }}}>
                    <IconProvider library={regularIcons}>
                        <IntlProvider locale="en">
                            <DataProviderContext.Provider value={{ dataProvider: data }}>
                                <AuthProvider>
                                    <UpdateUserInfoModal 
                                        showEmailConsent={true}
                                        showTerms={true}
                                    />
                                </AuthProvider>
                            </DataProviderContext.Provider>
                        </IntlProvider>
                    </IconProvider>
                </ConfigProvider>
            </ModalProvider> 
        </div>
    );
};