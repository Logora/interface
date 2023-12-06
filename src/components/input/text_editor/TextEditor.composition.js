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

const data = dataProvider(httpClient, "https://mock.example.api");

const handleSubmit = (textContent, richContent, sources) => {
    console.log(textContent)
    console.log(richContent)
}

export const DefaultTextEditor = () => {
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
                            />
                        </InputProvider>
                    </IconProvider>
                </ModalProvider>
            </DataProviderContext.Provider>
        </IntlProvider>
    );
};

export const TextEditorWithSource = () => {
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

export const TextEditorHideSourceAction = () => {
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
                                hideSourceAction
                            />
                        </InputProvider>
                    </IconProvider>
                </ModalProvider>
            </DataProviderContext.Provider>
        </IntlProvider>
    );
};

export const TextEditorHideSubmit = () => {
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
                                hideSubmit
                            />
                        </InputProvider>
                    </IconProvider>
                </ModalProvider>
            </DataProviderContext.Provider>
        </IntlProvider>
    );
};

export const TextEditorDisableRichText = () => {
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
                                disableRichText
                            />
                        </InputProvider>
                    </IconProvider>
                </ModalProvider>
            </DataProviderContext.Provider>
        </IntlProvider>
    );
};

export const TextEditorShowStylesControls = () => {
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
                                showStylesControls
                            />
                        </InputProvider>
                    </IconProvider>
                </ModalProvider>
            </DataProviderContext.Provider>
        </IntlProvider>
    );
};