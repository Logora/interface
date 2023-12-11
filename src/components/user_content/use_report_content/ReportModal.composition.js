import React from 'react';
import { ModalProvider } from '@logora/debate.dialog.modal';
import { IntlProvider } from 'react-intl';
import { dataProvider, DataProviderContext } from '@logora/debate.data.data_provider';
import { ReportModal } from './ReportModal';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';

const httpClient = {
    get: () => null,
    post: () => null,
    patch: () => null
};

export const DefaultReportModal = () => {
    const data = dataProvider(httpClient, "https://mock.example.api");

    return (
        <div style={{width: "350px", height: "200px"}}>
            <IntlProvider locale="en">
                <IconProvider library={regularIcons}>
                    <ModalProvider>
                        <DataProviderContext.Provider value={{ dataProvider: data }}>
                            <ReportModal reportableId={1} reportableType={"argument"} title={"Report this argument"} />
                        </DataProviderContext.Provider>
                    </ModalProvider>
                </IconProvider>
            </IntlProvider>
        </div>
    )
};