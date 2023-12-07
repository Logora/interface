import React from 'react';
import { TextEditor } from './TextEditor';
import { ModalProvider } from '@logora/debate.dialog.modal';
import { IntlProvider } from 'react-intl';
import { dataProvider, DataProviderContext } from '@logora/debate.data.data_provider';
import { InputProvider } from '@logora/debate.input.input_provider';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';
import { IdProvider } from "react-use-id-hook";

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
                        <IdProvider>
                            <InputProvider>
                                <TextEditor 
                                    placeholder={"Add an argument"}
                                    onSubmit={handleSubmit}
                                    onActivation={() => null}
                                    shortBar={true}
                                />
                            </InputProvider>
                        </IdProvider>
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
                        <IdProvider>
                            <InputProvider>
                                <TextEditor 
                                    placeholder={"Add an argument"}
                                    onSubmit={handleSubmit}
                                    onActivation={() => null}
                                    shortBar={true}
                                    sources={[{publisher: "test.com", source_url: "http://test.com", title: "Source Test"}]}
                                />
                            </InputProvider>
                        </IdProvider>
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
                        <IdProvider>
                            <InputProvider>
                                <TextEditor 
                                    placeholder={"Add an argument"}
                                    onSubmit={handleSubmit}
                                    onActivation={() => null}
                                    shortBar={true}
                                    maxLength={500}
                                />
                            </InputProvider>
                        </IdProvider>
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
                        <IdProvider>
                            <InputProvider>
                                <TextEditor 
                                    placeholder={"Add an argument"}
                                    onSubmit={handleSubmit}
                                    onActivation={() => null}
                                    shortBar={true}
                                    hideSourceAction
                                />
                            </InputProvider>
                        </IdProvider>
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
                        <IdProvider>
                            <InputProvider>
                                <TextEditor 
                                    placeholder={"Add an argument"}
                                    onSubmit={handleSubmit}
                                    onActivation={() => null}
                                    shortBar={true}
                                    hideSubmit
                                />
                            </InputProvider>
                        </IdProvider>
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
                        <IdProvider>
                            <InputProvider>
                                <TextEditor 
                                    placeholder={"Add an argument"}
                                    onSubmit={handleSubmit}
                                    onActivation={() => null}
                                    shortBar={true}
                                    disableRichText
                                />
                            </InputProvider>
                        </IdProvider>
                    </IconProvider>
                </ModalProvider>
            </DataProviderContext.Provider>
        </IntlProvider>
    );
};

export const ActiveTextEditor = () => {
    return (
        <IntlProvider locale="en">
            <DataProviderContext.Provider value={{ dataProvider: data }}>
                <ModalProvider>
                    <IconProvider library={regularIcons}>
                        <IdProvider>
                            <InputProvider>
                                <TextEditor 
                                    placeholder={"Add an argument"}
                                    onSubmit={handleSubmit}
                                    onActivation={() => null}
                                    shortBar={true}
                                    active
                                />
                            </InputProvider>
                        </IdProvider> 
                    </IconProvider>
                </ModalProvider>
            </DataProviderContext.Provider>
        </IntlProvider>
    );
};