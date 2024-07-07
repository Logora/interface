import React, { act } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useDeleteContent } from './useDeleteContent';
import { IntlProvider } from 'react-intl';
import { ToastProvider } from '@logora/debate.dialog.toast_provider';
import { AuthContext } from '@logora/debate.auth.use_auth';
import { dataProvider, DataProviderContext } from '@logora/debate.data.data_provider';
import { ModalProvider } from '@logora/debate.dialog.modal';
import { ConfigProvider } from '@logora/debate.data.config_provider';
import { ListProvider } from '@logora/debate.list.list_provider';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';
import { faker } from '@faker-js/faker';

const httpClient = {
    get: jest.fn(() =>  Promise.resolve(null)),
    post: jest.fn(() => Promise.resolve(null)),
    patch: jest.fn(() => Promise.resolve(null)),
    delete: jest.fn(() => Promise.resolve(null))
};

const currentUser = {
    id: faker.datatype.number(),
}

const ComponentWithDelete = () => {
    const { deleteContent } = useDeleteContent();

    return (
        <button data-testid={"delete-button"} onClick={deleteContent}>
            <span>Delete</span>
        </button>
    );
}

const data = dataProvider(httpClient, "https://mock.example.api");

describe('useDeleteContent', () => {
    it('should show ConfirmModal when useDeleteContent is called', async () => {
        render(
            <IntlProvider locale="en">
                <ConfigProvider config={{}}>
                    <DataProviderContext.Provider value={{ dataProvider: data }}>
                        <AuthContext.Provider value={{ currentUser: currentUser, isLoggedIn: true }}>
                            <ToastProvider>
                                <IconProvider library={regularIcons}>
                                    <ListProvider>
                                        <ModalProvider>
                                            <ComponentWithDelete />
                                        </ModalProvider>
                                    </ListProvider>
                                </IconProvider>
                            </ToastProvider>
                        </AuthContext.Provider>
                    </DataProviderContext.Provider>
                </ConfigProvider>
            </IntlProvider>
        )

        const deleteButton = screen.getByTestId("delete-button");
        await act(async () => { await userEvent.click(deleteButton) });

        expect(screen.getByText("Delete content")).toBeTruthy();
        expect(screen.getByText("Delete contribution")).toBeTruthy();
        expect(screen.getByText("Yes")).toBeTruthy();
        expect(screen.getByText("No")).toBeTruthy();
    });
});