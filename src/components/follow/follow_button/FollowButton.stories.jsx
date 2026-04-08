import React from 'react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from "react-router-dom";
import { FollowButton } from './FollowButton';
import { dataProvider, DataProviderContext } from '@logora/debate/data/data_provider';
import { AuthProvider } from '@logora/debate/auth/use_auth';
import { ConfigContext } from '@logora/debate/data/config_provider';
import { ModalProvider } from '@logora/debate/dialog/modal';
import { IconProvider } from '@logora/debate/icons/icon_provider';
import * as regularIcons from '@logora/debate/icons/regular_icons';

const httpClient = {};
const data = dataProvider(httpClient, 'https://mock.example.api');
const config = { auth: { disableLoginModal: false }};

export default {
    title: 'Follow/Follow Button',
    component: FollowButton,
    args: {
        followableType: 'content',
        followableId: 12,
        tooltipText: 'Tooltip content',
        dataTid: 'data-tid',
        noBorder: false
    },
    argTypes: {
        followableType: { control: 'text' },
        followableId: { control: 'number' },
        tooltipText: { control: 'text' },
        dataTid: { control: 'text' },
        noBorder: { control: 'boolean' }
    },
    render: (args) => (
        <MemoryRouter>
            <IntlProvider locale='en'>
                <IconProvider library={regularIcons}>
                    <DataProviderContext.Provider value={{ dataProvider: data }}>
                        <AuthProvider>
                            <ConfigContext.Provider value={{ config }}>
                                <ModalProvider>
                                    <FollowButton {...args} />
                                </ModalProvider>
                            </ConfigContext.Provider>
                        </AuthProvider>
                    </DataProviderContext.Provider>
                </IconProvider>
            </IntlProvider>
        </MemoryRouter>
    )
};

export const DefaultFollowButton = {};

export const FollowButtonNoBorder = {
    args: {
        noBorder: true
    }
};
