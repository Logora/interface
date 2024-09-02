import React from 'react';
import { SourceModal } from './SourceModal';
import { ModalProvider } from '@logora/debate.dialog.modal';
import { dataProvider, DataProviderContext } from '@logora/debate.data.data_provider';
import { IntlProvider } from 'react-intl';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';
import { faker } from '@faker-js/faker';

const allowedDomains = Array.from({ length: 3}, () => faker.internet.domainName());

const source = { 
    title: faker.music.songName(),
    description: faker.lorem.sentence(),
    source_url: faker.internet.url(),
    origin_image_url: faker.image.nature(),
    publisher: faker.vehicle.manufacturer()
};



const httpClient = {
    get: () => null,
    post: (url, data, config) => {
        return new Promise(function(resolve, reject) {
            resolve({ data: { success: true, data: { resource: source } }});
        });
    },
    patch: () => null
};

export const DefaultSourceModal = () => {
    const data = dataProvider(httpClient, "https://mock.example.api");

    return (
        <div style={{width: "250px", height: "100px"}}>
            <ModalProvider>
                <IntlProvider locale="en">
                    <IconProvider library={regularIcons}>
                        <DataProviderContext.Provider value={{ dataProvider: data }}>
                            <SourceModal 
                                onAddSource={() => console.log("Add source")} 
                                onHideModal={() => console.log("Hide modal")} 
                            />
                        </DataProviderContext.Provider>
                    </IconProvider>
                </IntlProvider>
            </ModalProvider>
        </div>
    )
};

export const SourceModalWithError = () => {
    const data = dataProvider(httpClient, "https://mock.example.api");

    return (
        <div style={{width: "250px", height: "100px"}}>
            <ModalProvider>
                <IntlProvider locale="en">
                    <IconProvider library={regularIcons}>
                        <DataProviderContext.Provider value={{ dataProvider: data }}>
                            <SourceModal 
                                onAddSource={() => console.log("Add source")} 
                                onHideModal={() => console.log("Hide modal")} 
                                allowedSources={allowedDomains}
                            />
                        </DataProviderContext.Provider>
                    </IconProvider>
                </IntlProvider>
            </ModalProvider>
        </div>
    )
};
