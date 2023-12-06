import React from 'react';
import { TextEditor } from './TextEditor';
import { ModalProvider } from '@logora/debate.dialog.modal';
import { IntlProvider } from 'react-intl';
import { dataProvider, DataProviderContext } from '@logora/debate.data.data_provider';
import { InputProvider } from '@logora/debate.input.input_provider';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';

const httpClient = {
    get: () => null,
    post: () => null,
    patch: () => null
};

export const DefaultTextEditor = () => {
    const data = dataProvider(httpClient, "https://mock.example.api");

    const handleSubmit = (textContent, richContent, sources) => {
        console.log(textContent)
        console.log(richContent)
    }

    return (
        <IntlProvider locale="en">
            <DataProviderContext.Provider value={{ dataProvider: data }}>
                <ModalProvider>
                    <IconProvider library={regularIcons}>
                        <InputProvider>
                            <TextEditor 
                                placeholder={"Add an argument"}
                                onSubmit={handleSubmit}
                                onActivation={() => null}
                                shortBar={true}
                                uid={"6756"}
                                sources={[{publisher: "test.com", source_url: "http://test.com", title: "Source Test"}]}
                            />
                        </InputProvider>
                    </IconProvider>
                </ModalProvider>
            </DataProviderContext.Provider>
        </IntlProvider>
    );
};

export const TextEditorWithMaxLength = () => {
    const data = dataProvider(httpClient, "https://mock.example.api");

    const handleSubmit = (textContent, richContent, sources) => {
        console.log(textContent)
        console.log(richContent)
    }

    return (
        <IntlProvider locale="en">
            <DataProviderContext.Provider value={{ dataProvider: data }}>
                <ModalProvider>
                    <IconProvider library={regularIcons}>
                        <InputProvider>
                            <TextEditor 
                                placeholder={"Add an argument"}
                                onSubmit={handleSubmit}
                                onActivation={() => null}
                                shortBar={true}
                                uid={"6756"}
                                maxLength={500}
                            />
                        </InputProvider>
                    </IconProvider>
                </ModalProvider>
            </DataProviderContext.Provider>
        </IntlProvider>
    );
};