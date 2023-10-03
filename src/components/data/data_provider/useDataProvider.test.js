import React, { useEffect, useState } from 'react';
import { render, screen } from '@testing-library/react';
import { dataProvider } from './DataProvider';
import { DataProviderContext } from './DataProviderContext';
import { useDataProvider } from './useDataProvider';

describe('useDataProvider hook', () => {
    const httpClient = {
        get: jest.fn(() =>  Promise.resolve({ data: "my custom data" })),
        post: jest.fn(() => Promise.resolve(null)),
        patch: jest.fn(() => Promise.resolve(null)),
        delete: jest.fn(() => Promise.resolve(null))
    };

    const DataComponent = (props) => {
        const [data, setData] = useState(null);
        const dataProvider = useDataProvider();

        useEffect(() => {
            dataProvider.getOne("resource", "id", {}).then(response => {
                setData(response.data);
            })
        }, []);
    
        return <div>{ data }</div>;
    }

    it('should render with correct data', async () => {
        const component = render(
            <DataProviderContext.Provider value={{ dataProvider: dataProvider(httpClient, "http://example.com", "key", "storage") }}>
                <DataComponent />
            </DataProviderContext.Provider>
        )

        expect(await screen.findByText("my custom data")).toBeTruthy();
        expect(httpClient.get).toHaveBeenCalledTimes(1);
    });
});