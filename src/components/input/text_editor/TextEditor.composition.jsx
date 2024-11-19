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
                                sources={[{ publisher: "test.com", source_url: "http://test.com", title: "Source Test" }]}
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
                                disableRichText
                            />
                        </InputProvider>
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
                        <InputProvider>
                            <TextEditor
                                placeholder={"Add an argument"}
                                onSubmit={handleSubmit}
                                onActivation={() => null}
                                shortBar={true}
                                active
                            />
                        </InputProvider>
                    </IconProvider>
                </ModalProvider>
            </DataProviderContext.Provider>
        </IntlProvider>
    );
};

export const TextEditorWithSourceAndMaxLenght = () => {
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
                                sources={[{ publisher: "test.com", source_url: "http://test.com", title: "Source Test" }]}
                                maxLength={500}
                            />
                        </InputProvider>
                    </IconProvider>
                </ModalProvider>
            </DataProviderContext.Provider>
        </IntlProvider>
    );
};