import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import { ConfigProvider } from '@logora/debate.data.config_provider';
import { dataProvider, DataProviderContext } from '@logora/debate.data.data_provider';
import { AuthContext } from '@logora/debate.auth.use_auth';
import { ModalProvider } from '@logora/debate.dialog.modal';
import { ListProvider } from '@logora/debate.list.list_provider';
import { ToastProvider } from '@logora/debate.dialog.toast_provider';
import { faker } from '@faker-js/faker';
import { InputProvider } from '@logora/debate.input.input_provider';
import { SuggestionInput } from './SuggestionInput';
import * as regularIcons from '@logora/debate.icons.regular_icons';

const currentUser = {
    id: faker.datatype.number(),
    full_name: faker.name.fullName(),
    image_url: faker.image.avatar(),
    points: faker.datatype.number()
};

const httpClient = {
    post: () => {
        return new Promise((resolve) => {
            resolve({ data: { success: true, data: {} } });
        });
    }
};

const data = dataProvider(httpClient, "https://mock.example.api");

const Providers = ({ children }) => (
    <BrowserRouter>
        <ConfigProvider >
            <IconProvider library={regularIcons} >
                <IntlProvider locale="en">
                    <DataProviderContext.Provider value={{ dataProvider: data }}>
                        <AuthContext.Provider value={{ currentUser: currentUser, isLoggedIn: true }}>
                            <ToastProvider>
                                <ModalProvider>
                                    <ListProvider>
                                        <InputProvider>
                                            {children}
                                        </InputProvider>
                                    </ListProvider>
                                </ModalProvider>
                            </ToastProvider>
                        </AuthContext.Provider>
                    </DataProviderContext.Provider>
                </IntlProvider>
            </IconProvider>
        </ConfigProvider>
    </BrowserRouter>
);

const renderSuggestionInput = () => render(
    <Providers>
        <SuggestionInput />
    </Providers>
);

describe('SuggestionInput', () => {
    it('renders the title and input correctly', () => {
        const { getByText, getByPlaceholderText } = renderSuggestionInput();

        expect(getByText('Your suggestion')).toBeInTheDocument();
        expect(getByPlaceholderText('Suggest a debate question')).toBeInTheDocument();
    });

    it('should render the submit button correctly', () => {
        const { getByText } = renderSuggestionInput();
        const button = getByText('Submit');
        expect(button).toBeInTheDocument();
    });
});