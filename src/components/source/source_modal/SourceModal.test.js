import React from 'react';
import { render, screen } from '@testing-library/react';
import { SourceModal } from './SourceModal';
import { ModalProvider } from '@logora/debate.dialog.modal';
import { dataProvider, DataProviderContext } from '@logora/debate.data.data_provider';
import { IntlProvider } from 'react-intl';
import userEvent from '@testing-library/user-event';
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
    post: (url, data, config) => {
        return new Promise(function(resolve, reject) {
            resolve({ data: { success: true, data: { resource: source } }});
        });
    },
    patch: () => null
};

describe('SourceModal', () => {
    it('should render modal with content and title', () => {
        const data = dataProvider(httpClient, "https://mock.example.api");

        const modal = render(
            <ModalProvider>
                <IntlProvider locale="en">
                    <DataProviderContext.Provider value={{ dataProvider: data }}>
                        <SourceModal 
                            onAddSource={addSourceCallback} 
                            onHideModal={hideModalCallback} 
                        />
                    </DataProviderContext.Provider>
                </IntlProvider>
            </ModalProvider>
        );

        expect(screen.getByText("Ajouter une source")).toBeTruthy();
        expect(screen.getByRole("input")).toBeTruthy();
        expect(document.body.style.overflowY).toEqual("hidden");
    });

    it('should trigger addSourceCallback when adding source', async () => {
        const data = dataProvider(httpClient, "https://mock.example.api");

        const modal = render(
            <ModalProvider>
                <IntlProvider locale="en">
                    <DataProviderContext.Provider value={{ dataProvider: data }}>
                        <SourceModal 
                            onAddSource={addSourceCallback} 
                            onHideModal={hideModalCallback} 
                        />
                    </DataProviderContext.Provider>
                </IntlProvider>
            </ModalProvider>
        );

        const input = screen.getByRole("input");
        await userEvent.type(input, "https://lemonde.fr[Enter]");
        expect(input.value).toBe("https://lemonde.fr");

        expect(screen.getByText(source.title)).toBeTruthy();
        expect(screen.getByText(source.publisher)).toBeTruthy();

        const addSourceButton = screen.getByText("Ajouter");
        expect(addSourceButton).toBeTruthy();
        await userEvent.click(addSourceButton);

        expect(addSourceCallback).toHaveBeenCalledTimes(1);
    });
});