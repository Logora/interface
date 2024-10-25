import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { SourceModal } from './SourceModal';
import { ModalProvider } from '@logora/debate.dialog.modal';
import { dataProvider, DataProviderContext } from '@logora/debate.data.data_provider';
import { IntlProvider } from 'react-intl';
import userEvent from '@testing-library/user-event';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';
import { faker } from '@faker-js/faker';

const addSourceCallback = jest.fn();
const hideModalCallback = jest.fn();

const source = {
    title: faker.music.songName(),
    description: faker.lorem.sentence(),
    source_url: faker.internet.url(),
    origin_image_url: faker.image.nature(),
    publisher: faker.vehicle.manufacturer()
};


const httpClient = {
    get: () => null,
    post: (_url, _data, _config) => {
        return new Promise(function (resolve, _reject) {
            resolve({ data: { success: true, data: { resource: source } } });
        });
    },
    patch: () => null
};

const data = dataProvider(httpClient, "https://mock.example.api");

describe('SourceModal', () => {
    it('should render modal with content and title', () => {
        const modal = render(
            <ModalProvider>
                <IntlProvider locale="en">
                    <IconProvider library={regularIcons}>
                        <DataProviderContext.Provider value={{ dataProvider: data }}>
                            <SourceModal
                                onAddSource={addSourceCallback}
                                onHideModal={hideModalCallback}
                            />
                        </DataProviderContext.Provider>
                    </IconProvider>
                </IntlProvider>
            </ModalProvider>
        );

        expect(screen.getByText("Add a source")).toBeTruthy();
        expect(screen.getByRole("input")).toBeTruthy();
        expect(document.body.style.overflowY).toEqual("hidden");
    });

    it('should trigger addSourceCallback when adding source', async () => {
        const modal = render(
            <ModalProvider>
                <IntlProvider locale="en">
                    <IconProvider library={regularIcons}>
                        <DataProviderContext.Provider value={{ dataProvider: data }}>
                            <SourceModal
                                onAddSource={addSourceCallback}
                                onHideModal={hideModalCallback}
                            />
                        </DataProviderContext.Provider>
                    </IconProvider>
                </IntlProvider>
            </ModalProvider>
        );

        const input = screen.getByRole("input");
        await userEvent.type(input, "https://lemonde.fr[Enter]");
        expect(input.value).toBe("https://lemonde.fr");

        expect(screen.getByText(source.title)).toBeTruthy();
        expect(screen.getByText(source.publisher)).toBeTruthy();

        const addSourceButton = screen.getByText("Add");
        expect(addSourceButton).toBeTruthy();
        await userEvent.click(addSourceButton);

        expect(addSourceCallback).toHaveBeenCalledTimes(1);
    });

    it('should show error if input is not well formed', async () => {
        const allowedDomains = ["example.com"];
        const addSourceCallback = jest.fn();

        render(
            <ModalProvider>
                <IntlProvider locale="en">
                    <IconProvider library={regularIcons}>
                        <DataProviderContext.Provider value={{ dataProvider: data }}>
                            <SourceModal
                                onAddSource={addSourceCallback}
                                allowedSources={allowedDomains}
                            />
                        </DataProviderContext.Provider>
                    </IconProvider>
                </IntlProvider>
            </ModalProvider>
        );

        const input = screen.getByRole('input');
        await userEvent.type(input, "example/test{Enter}");
        expect(input.value).toBe("example/test");

        expect(screen.getByText("Error when fetching source")).toBeTruthy();
    });

    it('should display an error message when adding a source with a non-allowed domain', async () => {
        const allowedDomains = ["example.com"];
        const addSourceCallback = jest.fn();

        render(
            <ModalProvider>
                <IntlProvider locale="en">
                    <IconProvider library={regularIcons}>
                        <DataProviderContext.Provider value={{ dataProvider: data }}>
                            <SourceModal
                                onAddSource={addSourceCallback}
                                allowedSources={allowedDomains}
                            />
                        </DataProviderContext.Provider>
                    </IconProvider>
                </IntlProvider>
            </ModalProvider>
        );

        const input = screen.getByRole('input');
        await userEvent.type(input, "https://ggg.com{Enter}");
        expect(input.value).toBe("https://ggg.com");
        await waitFor(() => {
            expect(screen.getByText("Unauthorized source")).toBeInTheDocument();
        });
        expect(addSourceCallback).not.toHaveBeenCalled();
    });

    it('should add source if domain is in allowed domains', async () => {
        const allowedDomains = ["example.com"];
        const addSourceCallback = jest.fn();

        render(
            <ModalProvider>
                <IntlProvider locale="en">
                    <IconProvider library={regularIcons}>
                        <DataProviderContext.Provider value={{ dataProvider: data }}>
                            <SourceModal
                                onAddSource={addSourceCallback}
                                allowedSources={allowedDomains}
                            />
                        </DataProviderContext.Provider>
                    </IconProvider>
                </IntlProvider>
            </ModalProvider>
        );

        const input = screen.getByRole('input');
        await userEvent.type(input, "https://example.com/test{Enter}");
        expect(input.value).toBe("https://example.com/test");

        const addSourceButton = screen.getByText("Add");
        expect(addSourceButton).toBeTruthy();
        await userEvent.click(addSourceButton);
        
        expect(addSourceCallback).toHaveBeenCalledTimes(1);
    });
});

