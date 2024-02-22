import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { IntlProvider } from 'react-intl';
import { dataProvider, DataProviderContext } from '@logora/debate.data.data_provider';
import { ResponsiveProvider } from '@logora/debate.hooks.use_responsive';
import { ListProvider, useList } from '@logora/debate.list.list_provider';
import { PaginatedList } from './PaginatedList';
import StandardErrorBoundary from "@logora/debate.error.standard_error_boundary";
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';

const httpClient = {
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn()
};

const ListItem = (props) => {
    return (
        <p>{props.item.name}</p>
    )
}

const DefaultList = () => {
    return (
        <BrowserRouter>
            <IntlProvider locale="en">
                <ListProvider>
                    <IconProvider library={regularIcons}>
                        <ResponsiveProvider>
                            <DataProviderContext.Provider value={{ dataProvider: data }}>
                                <PaginatedList
                                    currentListId={"itemList"}
                                    resource={'/items'}
                                    sort={"-created_at"}
                                    loadingComponent={null}
                                    resourcePropName={"item"}
                                    perPage={10}
                                    withPagination={false}
                                    countless={true}
                                    staticContext={null}
                                    staticResourceName={"getListItem"}
                                    display="column"
                                    perPageParam={"porut"}
                                >
                                    <ListItem />
                                </PaginatedList>
                            </DataProviderContext.Provider>
                        </ResponsiveProvider>
                    </IconProvider>
                </ListProvider>
            </IntlProvider>
        </BrowserRouter>
    )
}

const data = dataProvider(httpClient, "https://mock.example.api");

describe('PaginatedList', () => {
    beforeEach(() => {
        httpClient.get.mockClear();
        httpClient.post.mockClear();
        httpClient.patch.mockClear();
    })

    it('should render a basic list with correct content', async () => {
        httpClient.get.mockResolvedValue({
            status: 200,
            "data": {
                "success": true,
                "data": [
                    { id: 1, name: "First item" },
                    { id: 2, name: "Second item" },
                    { id: 3, name: "Third item" }
                ]
            }
        });

        await act(async () => {
            render(
                <DefaultList />
            );
        });

        expect(httpClient.get).toHaveBeenCalled();
        expect(screen.getByText("First item")).toBeTruthy();
        expect(screen.getByText("Second item")).toBeTruthy();
        expect(screen.getByText("Third item")).toBeTruthy();
    });

    it('should show the specific loader component passed as props ', async () => {
        render(
            <BrowserRouter>
                <IntlProvider locale="en">
                    <ListProvider>
                        <IconProvider library={regularIcons}>
                            <ResponsiveProvider>
                                <DataProviderContext.Provider value={{ dataProvider: data }}>
                                    <PaginatedList
                                        currentListId={"itemList"}
                                        resource={'/items'}
                                        sort={"-created_at"}
                                        resourcePropName={"item"}
                                        perPage={1}
                                        withPagination
                                        countless={false}
                                        staticContext={null}
                                        staticResourceName={"getListItem"}
                                        display="column"
                                        numberElements={3}
                                        loadingComponent={<p>Loading...</p>}
                                    >
                                        <ListItem />
                                    </PaginatedList>
                                </DataProviderContext.Provider>
                            </ResponsiveProvider>
                        </IconProvider>
                    </ListProvider>
                </IntlProvider>
            </BrowserRouter>
        );

        await act(async () => { expect(screen.getAllByText("Loading...")).toBeTruthy(); })
    });

    it('should trow an error when data loading fails ', async () => {
        httpClient.get.mockImplementation(() => {
            throw new Error('User not found');
        });

        jest.spyOn(console, 'error').mockImplementation(() => { });

        await act(async () => {
            render(
                <BrowserRouter>
                    <StandardErrorBoundary>
                        <IntlProvider locale="en">
                            <ListProvider>
                                <IconProvider library={regularIcons}>
                                    <ResponsiveProvider>
                                        <DataProviderContext.Provider value={{ dataProvider: data }}>
                                            <PaginatedList
                                                currentListId={"itemList"}
                                                resource={'/itemss'}
                                                sort={"-created_at"}
                                                resourcePropName={"item"}
                                                perPage={1}
                                                withPagination
                                                countless={false}
                                                staticContext={null}
                                                staticResourceName={"getListItem"}
                                                display="column"
                                                numberElements={3}
                                                loadingComponent={<p>Loading...</p>}
                                            >
                                                <ListItem />
                                            </PaginatedList>
                                        </DataProviderContext.Provider>
                                    </ResponsiveProvider>
                                </IconProvider>
                            </ListProvider>
                        </IntlProvider>
                    </StandardErrorBoundary>
                </BrowserRouter>
            );
        });

        expect(screen.getByText("Error when loading content.")).toBeTruthy();
    });

    it('should render a fallback message when no data is retrieved', async () => {
        httpClient.get.mockResolvedValue({
            status: 200,
            "data": {
                "success": true,
                "data": []
            }
        });

        await act(async () => {
            render(
                <DefaultList />
            );
        });

        expect(httpClient.get).toHaveBeenCalled();
        expect(screen.queryByText("First item")).toBeFalsy();
        expect(screen.queryByText("Second item")).toBeFalsy();
        expect(screen.queryByText("Third item")).toBeFalsy();
        expect(screen.queryByText("No items for now.")).toBeTruthy();
    });

    it('should render a list with a pagination button', async () => {
        httpClient.get.mockResolvedValue({
            status: 200,
            "data": {
                "success": true,
                "data": [
                    { id: 1, name: "First item" }
                ]
            }
        });

        await act(async () => {
            render(
                <BrowserRouter>
                    <IntlProvider locale="en">
                        <ListProvider>
                            <IconProvider library={regularIcons}>
                                <ResponsiveProvider>
                                    <DataProviderContext.Provider value={{ dataProvider: data }}>
                                        <PaginatedList
                                            currentListId={"itemList"}
                                            resource={'/items'}
                                            sort={"-created_at"}
                                            loadingComponent={null}
                                            resourcePropName={"item"}
                                            perPage={1}
                                            withPagination={true}
                                            countless={false}
                                            staticContext={null}
                                            staticResourceName={"getListItem"}
                                            display="column"
                                            numberElements={3}
                                        >
                                            <ListItem />
                                        </PaginatedList>
                                    </DataProviderContext.Provider>
                                </ResponsiveProvider>
                            </IconProvider>
                        </ListProvider>
                    </IntlProvider>
                </BrowserRouter>
            );
        });

        expect(httpClient.get).toHaveBeenCalled();
        expect(screen.getByText("First item")).toBeTruthy();
        expect(screen.queryByText("Second item")).toBeFalsy();
        expect(screen.queryByText("Third item")).toBeFalsy();
        expect(screen.getByText("See more")).toBeTruthy();
    });

    it('should render a list with a search bar', async () => {
        httpClient.get.mockResolvedValue({
            status: 200,
            "data": {
                "success": true,
                "data": [
                    { id: 1, name: "First item" },
                    { id: 2, name: "Second item" },
                    { id: 3, name: "Third item" }
                ]
            }
        });

        await act(async () => {
            render(
                <BrowserRouter>
                    <IntlProvider locale="en">
                        <ListProvider>
                            <IconProvider library={regularIcons}>
                                <ResponsiveProvider>
                                    <DataProviderContext.Provider value={{ dataProvider: data }}>
                                        <PaginatedList
                                            currentListId={"itemList"}
                                            resource={'/items'}
                                            sort={"-created_at"}
                                            loadingComponent={null}
                                            resourcePropName={"item"}
                                            perPage={1}
                                            withPagination
                                            countless={false}
                                            staticContext={null}
                                            staticResourceName={"getListItem"}
                                            display="column"
                                            numberElements={3}
                                            searchBar
                                        >
                                            <ListItem />
                                        </PaginatedList>
                                    </DataProviderContext.Provider>
                                </ResponsiveProvider>
                            </IconProvider>
                        </ListProvider>
                    </IntlProvider>
                </BrowserRouter>
            );
        });

        expect(httpClient.get).toHaveBeenCalled();
        expect(screen.getByText("First item")).toBeTruthy();
        expect(screen.getByText("Second item")).toBeTruthy();
        expect(screen.getByText("Third item")).toBeTruthy();
        expect(screen.getByText("Search")).toBeTruthy();
    });

    it('should render a list with a title', async () => {
        httpClient.get.mockResolvedValue({
            status: 200,
            "data": {
                "success": true,
                "data": [
                    { id: 1, name: "First item" },
                    { id: 2, name: "Second item" },
                    { id: 3, name: "Third item" }
                ]
            }
        });

        await act(async () => {
            render(
                <BrowserRouter>
                    <IntlProvider locale="en">
                        <ListProvider>
                            <IconProvider library={regularIcons}>
                                <ResponsiveProvider>
                                    <DataProviderContext.Provider value={{ dataProvider: data }}>
                                        <PaginatedList
                                            currentListId={"itemList"}
                                            resource={'/items'}
                                            sort={"-created_at"}
                                            loadingComponent={null}
                                            resourcePropName={"item"}
                                            perPage={1}
                                            withPagination
                                            countless={false}
                                            staticContext={null}
                                            staticResourceName={"getListItem"}
                                            display="column"
                                            numberElements={3}
                                            title={"My title"}
                                        >
                                            <ListItem />
                                        </PaginatedList>
                                    </DataProviderContext.Provider>
                                </ResponsiveProvider>
                            </IconProvider>
                        </ListProvider>
                    </IntlProvider>
                </BrowserRouter>
            );
        });

        expect(httpClient.get).toHaveBeenCalled();
        expect(screen.getByText("First item")).toBeTruthy();
        expect(screen.getByText("Second item")).toBeTruthy();
        expect(screen.getByText("Third item")).toBeTruthy();
        expect(screen.getByText("My title")).toBeTruthy();
    });

    it('should render a list with a sort select', async () => {
        httpClient.get.mockResolvedValue({
            status: 200,
            "data": {
                "success": true,
                "data": [
                    { id: 1, name: "First item" },
                    { id: 2, name: "Second item" },
                    { id: 3, name: "Third item" }
                ]
            }
        });

        await act(async () => {
            render(
                <BrowserRouter>
                    <IntlProvider locale="en">
                        <ListProvider>
                            <IconProvider library={regularIcons}>
                                <ResponsiveProvider>
                                    <DataProviderContext.Provider value={{ dataProvider: data }}>
                                        <PaginatedList
                                            currentListId={"itemList"}
                                            resource={'/items'}
                                            sort={"-created_at"}
                                            loadingComponent={null}
                                            resourcePropName={"item"}
                                            perPage={1}
                                            withPagination
                                            countless={false}
                                            staticContext={null}
                                            staticResourceName={"getListItem"}
                                            display="column"
                                            numberElements={3}
                                            sortOptions={[
                                                {
                                                    name: "recent",
                                                    value: "-created_at",
                                                    type: "sort",
                                                    text: "recent",
                                                },
                                                {
                                                    name: "old",
                                                    type: "sort",
                                                    value: "+created_at",
                                                    text: "oldest",
                                                },
                                            ]}
                                        >
                                            <ListItem />
                                        </PaginatedList>
                                    </DataProviderContext.Provider>
                                </ResponsiveProvider>
                            </IconProvider>
                        </ListProvider>
                    </IntlProvider>
                </BrowserRouter>
            );
        });

        expect(httpClient.get).toHaveBeenCalled();
        expect(screen.getByText("First item")).toBeTruthy();
        expect(screen.getByText("Second item")).toBeTruthy();
        expect(screen.getByText("Third item")).toBeTruthy();
        expect(screen.queryByText("recent")).toBeTruthy();
    });

    it('should render an empty list with a component passed as props', async () => {
        httpClient.get.mockResolvedValue({
            status: 200,
            "data": {
                "success": true,
                "data": []
            }
        });

        await act(async () => {
            render(
                <BrowserRouter>
                    <IntlProvider locale="en">
                        <ListProvider>
                            <IconProvider library={regularIcons}>
                                <ResponsiveProvider>
                                    <DataProviderContext.Provider value={{ dataProvider: data }}>
                                        <PaginatedList
                                            currentListId={"itemList"}
                                            resource={'/items'}
                                            sort={"-created_at"}
                                            loadingComponent={null}
                                            resourcePropName={"item"}
                                            perPage={1}
                                            withPagination
                                            countless={false}
                                            staticContext={null}
                                            staticResourceName={"getListItem"}
                                            display="column"
                                            numberElements={3}
                                            emptyListComponent={<p>Empty list</p>}
                                        >
                                            <ListItem />
                                        </PaginatedList>
                                    </DataProviderContext.Provider>
                                </ResponsiveProvider>
                            </IconProvider>
                        </ListProvider>
                    </IntlProvider>
                </BrowserRouter>
            );
        });

        expect(httpClient.get).toHaveBeenCalled();
        expect(screen.queryByText("Empty list")).toBeTruthy();
        expect(screen.queryByText("Aucun élément pour le moment.")).toBeFalsy();
    });

    it('should call api on sort select click', async () => {
        httpClient.get.mockResolvedValue({
            status: 200,
            "data": {
                "success": true,
                "data": [
                    { id: 1, name: "First item" },
                    { id: 2, name: "Second item" },
                    { id: 3, name: "Third item" }
                ]
            }
        });

        await act(async () => {
            render(
                <BrowserRouter>
                    <IntlProvider locale="en">
                        <ListProvider>
                            <IconProvider library={regularIcons}>
                                <ResponsiveProvider>
                                    <DataProviderContext.Provider value={{ dataProvider: data }}>
                                        <PaginatedList
                                            currentListId={"itemList"}
                                            resource={'/items'}
                                            loadingComponent={null}
                                            resourcePropName={"item"}
                                            perPage={1}
                                            withPagination
                                            countless={false}
                                            filters={{}}
                                            staticContext={null}
                                            staticResourceName={"getListItem"}
                                            display="column"
                                            numberElements={3}
                                            sortOptions={[
                                                {
                                                    name: "recent",
                                                    value: "-created_at",
                                                    type: "sort",
                                                    text: "recent",
                                                },
                                                {
                                                    name: "old",
                                                    type: "sort",
                                                    value: "+created_at",
                                                    text: "oldest",
                                                },
                                            ]}
                                        >
                                            <ListItem />
                                        </PaginatedList>
                                    </DataProviderContext.Provider>
                                </ResponsiveProvider>
                            </IconProvider>
                        </ListProvider>
                    </IntlProvider>
                </BrowserRouter>
            );
        });

        expect(httpClient.get).toHaveBeenNthCalledWith(1, "https://mock.example.api//items?page=1&per_page=1&sort=-created_at&api_key=");

        const dropdownFirstOption = screen.getByText(/recent/i);
        expect(screen.queryByText(/oldest/i)).toBeNull();

        userEvent.click(dropdownFirstOption);

        await waitFor(() => {
            expect(screen.getByText(/oldest/i)).toBeTruthy();
        });

        const oldestSortButton = screen.getByText(/oldest/i);
        userEvent.click(oldestSortButton);

    });

    it('should call api on pagination click', async () => {
        httpClient.get.mockResolvedValue({
            status: 200,
            "data": {
                "success": true,
                "data": [
                    { id: 1, name: "First item" },
                    { id: 2, name: "Second item" },
                    { id: 3, name: "Third item" }
                ]
            }
        });

        await act(async () => {
            render(
                <BrowserRouter>
                    <IntlProvider locale="en">
                        <ListProvider>
                            <IconProvider library={regularIcons}>
                                <ResponsiveProvider>
                                    <DataProviderContext.Provider value={{ dataProvider: data }}>
                                        <PaginatedList
                                            currentListId={"itemList"}
                                            resource={'/items'}
                                            loadingComponent={null}
                                            resourcePropName={"item"}
                                            perPage={1}
                                            withPagination
                                            countless={false}
                                            staticContext={null}
                                            staticResourceName={"getListItem"}
                                            filters={{}}
                                            display="column"
                                            numberElements={3}
                                            sortOptions={[
                                                {
                                                    name: "recent",
                                                    value: "-created_at",
                                                    type: "sort",
                                                    text: "recent",
                                                },
                                                {
                                                    name: "old",
                                                    type: "sort",
                                                    value: "+created_at",
                                                    text: "oldest",
                                                },
                                            ]}
                                        >
                                            <ListItem />
                                        </PaginatedList>
                                    </DataProviderContext.Provider>
                                </ResponsiveProvider>
                            </IconProvider>
                        </ListProvider>
                    </IntlProvider>
                </BrowserRouter>
            );
        });

        expect(httpClient.get).toHaveBeenNthCalledWith(1, "https://mock.example.api//items?page=1&per_page=1&sort=-created_at&api_key=");

        const paginationButton = screen.getByText(/See more/i);
        expect(paginationButton).toBeTruthy();

        await userEvent.click(paginationButton);
        expect(httpClient.get).toHaveBeenCalled();
    });

    it('should call api with query params if passed as props', async () => {
        httpClient.get.mockResolvedValue({
            status: 200,
            "data": {
                "success": true,
                "data": [
                    { id: 1, name: "First item" },
                    { id: 2, name: "Second item" },
                    { id: 3, name: "Third item" }
                ]
            }
        });

        await act(async () => {
            render(
                <BrowserRouter>
                    <IntlProvider locale="en">
                        <ListProvider>
                            <IconProvider library={regularIcons}>
                                <ResponsiveProvider>
                                    <DataProviderContext.Provider value={{ dataProvider: data }}>
                                        <PaginatedList
                                            currentListId={"itemList"}
                                            resource={'/items'}
                                            loadingComponent={null}
                                            resourcePropName={"item"}
                                            perPage={1}
                                            withPagination
                                            countless={false}
                                            staticContext={null}
                                            staticResourceName={"getListItem"}
                                            filters={{}}
                                            display="column"
                                            numberElements={3}
                                            query={"test"}
                                            sortOptions={[
                                                {
                                                    name: "recent",
                                                    value: "-created_at",
                                                    type: "sort",
                                                    text: "recent",
                                                },
                                                {
                                                    name: "old",
                                                    type: "sort",
                                                    value: "+created_at",
                                                    text: "oldest",
                                                },
                                            ]}
                                        >
                                            <ListItem />
                                        </PaginatedList>
                                    </DataProviderContext.Provider>
                                </ResponsiveProvider>
                            </IconProvider>
                        </ListProvider>
                    </IntlProvider>
                </BrowserRouter>
            );
        });

        expect(httpClient.get).toHaveBeenNthCalledWith(1, "https://mock.example.api//items?page=1&per_page=1&query=test&api_key=");
    });

    it('should call api when using searchbar', async () => {
        httpClient.get.mockResolvedValue({
            status: 200,
            "data": {
                "success": true,
                "data": [
                    { id: 1, name: "First item" },
                    { id: 2, name: "Second item" },
                    { id: 3, name: "Third item" }
                ]
            }
        });

        await act(async () => {
            render(
                <BrowserRouter>
                    <IntlProvider locale="en">
                        <ListProvider>
                            <IconProvider library={regularIcons}>
                                <ResponsiveProvider>
                                    <DataProviderContext.Provider value={{ dataProvider: data }}>
                                        <PaginatedList
                                            currentListId={"itemList"}
                                            resource={'/items'}
                                            loadingComponent={null}
                                            resourcePropName={"item"}
                                            perPage={1}
                                            withPagination
                                            countless={false}
                                            staticContext={null}
                                            staticResourceName={"getListItem"}
                                            filters={{}}
                                            display="column"
                                            numberElements={3}
                                            searchBar
                                            sortOptions={[
                                                {
                                                    name: "recent",
                                                    value: "-created_at",
                                                    type: "sort",
                                                    text: "recent",
                                                },
                                                {
                                                    name: "old",
                                                    type: "sort",
                                                    value: "+created_at",
                                                    text: "oldest",
                                                },
                                            ]}
                                        >
                                            <ListItem />
                                        </PaginatedList>
                                    </DataProviderContext.Provider>
                                </ResponsiveProvider>
                            </IconProvider>
                        </ListProvider>
                    </IntlProvider>
                </BrowserRouter>
            );
        });

        expect(httpClient.get).toHaveBeenNthCalledWith(1, "https://mock.example.api//items?page=1&per_page=1&sort=-created_at&api_key=");

        const searchInput = screen.getByTestId("input_search_query");
        await userEvent.click(searchInput);

        expect(screen.getByText(/Search/i)).toBeTruthy();
        await userEvent.keyboard("test");
        await userEvent.keyboard("[Enter]");
        expect(httpClient.get).toHaveBeenCalled();
    });

    it('should call onElementClick when clicking list item', async () => {
        httpClient.get.mockResolvedValue({
            status: 200,
            "data": {
                "success": true,
                "data": [
                    { id: 1, name: "First item" },
                    { id: 2, name: "Second item" },
                    { id: 3, name: "Third item" }
                ]
            }
        });

        const callback = jest.fn();

        await act(async () => {
            render(
                <BrowserRouter>
                    <IntlProvider locale="en">
                        <ListProvider>
                            <IconProvider library={regularIcons}>
                                <ResponsiveProvider>
                                    <DataProviderContext.Provider value={{ dataProvider: data }}>
                                        <PaginatedList
                                            currentListId={"itemList"}
                                            resource={'/items'}
                                            loadingComponent={null}
                                            resourcePropName={"item"}
                                            perPage={1}
                                            withPagination
                                            countless={false}
                                            staticContext={null}
                                            staticResourceName={"getListItem"}
                                            filters={{}}
                                            display="column"
                                            numberElements={3}
                                            onElementClick={callback}
                                            sortOptions={[
                                                {
                                                    name: "recent",
                                                    value: "-created_at",
                                                    type: "sort",
                                                    text: "recent",
                                                },
                                                {
                                                    name: "old",
                                                    type: "sort",
                                                    value: "+created_at",
                                                    text: "oldest",
                                                },
                                            ]}
                                        >
                                            <ListItem />
                                        </PaginatedList>
                                    </DataProviderContext.Provider>
                                </ResponsiveProvider>
                            </IconProvider>
                        </ListProvider>
                    </IntlProvider>
                </BrowserRouter>
            );
        });

        expect(httpClient.get).toHaveBeenNthCalledWith(1, "https://mock.example.api//items?page=1&per_page=1&sort=-created_at&api_key=");
        const firstElm = screen.getByText(/First item/i);
        expect(firstElm).toBeTruthy();

        const secondElm = screen.getByText(/First item/i);
        expect(secondElm).toBeTruthy();

        await userEvent.click(firstElm);
        expect(callback).toHaveBeenCalled();

        await userEvent.click(secondElm);
        expect(callback).toHaveBeenCalled();
    });

    it('should render emptyText prop if no emptyListComponent is passed', async () => {
        httpClient.get.mockResolvedValue({
            status: 200,
            "data": {
                "success": true,
                "data": []
            }
        });

        const callback = jest.fn();

        await act(async () => {
            render(
                <BrowserRouter>
                    <IntlProvider locale="en">
                        <ListProvider>
                            <IconProvider library={regularIcons}>
                                <ResponsiveProvider>
                                    <DataProviderContext.Provider value={{ dataProvider: data }}>
                                        <PaginatedList
                                            currentListId={"itemList"}
                                            resource={'/items'}
                                            loadingComponent={null}
                                            resourcePropName={"item"}
                                            perPage={1}
                                            withPagination
                                            countless={false}
                                            staticContext={null}
                                            staticResourceName={"getListItem"}
                                            filters={{}}
                                            display="column"
                                            numberElements={3}
                                            onElementClick={callback}
                                            emptyText={"Empty text"}
                                            sortOptions={[
                                                {
                                                    name: "recent",
                                                    value: "-created_at",
                                                    type: "sort",
                                                    text: "recent",
                                                },
                                                {
                                                    name: "old",
                                                    type: "sort",
                                                    value: "+created_at",
                                                    text: "oldest",
                                                },
                                            ]}
                                        >
                                            <ListItem />
                                        </PaginatedList>
                                    </DataProviderContext.Provider>
                                </ResponsiveProvider>
                            </IconProvider>
                        </ListProvider>
                    </IntlProvider>
                </BrowserRouter>
            );
        });

        expect(httpClient.get).toHaveBeenNthCalledWith(1, "https://mock.example.api//items?page=1&per_page=1&sort=-created_at&api_key=");
        const emptyText = screen.getByText(/Empty text/i);
        expect(emptyText).toBeTruthy();
    });

    it('should call api with countless prop if passed', async () => {
        httpClient.get.mockResolvedValue({
            status: 200,
            "data": {
                "success": true,
                "data": [
                    { id: 1, name: "First item" },
                    { id: 2, name: "Second item" },
                    { id: 3, name: "Third item" }
                ]
            }
        });

        await act(async () => {
            render(
                <BrowserRouter>
                    <IntlProvider locale="en">
                        <ListProvider>
                            <IconProvider library={regularIcons}>
                                <ResponsiveProvider>
                                    <DataProviderContext.Provider value={{ dataProvider: data }}>
                                        <PaginatedList
                                            currentListId={"itemList"}
                                            resource={'/items'}
                                            loadingComponent={null}
                                            resourcePropName={"item"}
                                            perPage={1}
                                            withPagination
                                            countless={true}
                                            staticContext={null}
                                            staticResourceName={"getListItem"}
                                            filters={{}}
                                            display="column"
                                            numberElements={3}
                                            sortOptions={[
                                                {
                                                    name: "recent",
                                                    value: "-created_at",
                                                    type: "sort",
                                                    text: "recent",
                                                },
                                                {
                                                    name: "old",
                                                    type: "sort",
                                                    value: "+created_at",
                                                    text: "oldest",
                                                },
                                            ]}
                                        >
                                            <ListItem />
                                        </PaginatedList>
                                    </DataProviderContext.Provider>
                                </ResponsiveProvider>
                            </IconProvider>
                        </ListProvider>
                    </IntlProvider>
                </BrowserRouter>
            );
        });

        expect(httpClient.get).toHaveBeenNthCalledWith(1, "https://mock.example.api//items?page=1&per_page=1&sort=-created_at&countless=true&api_key=");
    });

    it('should render unique elements', async () => {
        httpClient.get.mockResolvedValue({
            status: 200,
            "data": {
                "success": true,
                "data": [
                    { id: 1, name: "First item" },
                    { id: 1, name: "First item" },
                    { id: 3, name: "Third item" }
                ]
            }
        });

        await act(async () => {
            render(
                <BrowserRouter>
                    <IntlProvider locale="en">
                        <ListProvider>
                            <IconProvider library={regularIcons}>
                                <ResponsiveProvider>
                                    <DataProviderContext.Provider value={{ dataProvider: data }}>
                                        <PaginatedList
                                            currentListId={"itemList"}
                                            resource={'/items'}
                                            loadingComponent={null}
                                            resourcePropName={"item"}
                                            perPage={1}
                                            withPagination
                                            countless={false}
                                            staticContext={null}
                                            staticResourceName={"getListItem"}
                                            filters={{}}
                                            display="column"
                                            numberElements={3}
                                            sortOptions={[
                                                {
                                                    name: "recent",
                                                    value: "-created_at",
                                                    type: "sort",
                                                    text: "recent",
                                                },
                                                {
                                                    name: "old",
                                                    type: "sort",
                                                    value: "+created_at",
                                                    text: "oldest",
                                                },
                                            ]}
                                        >
                                            <ListItem />
                                        </PaginatedList>
                                    </DataProviderContext.Provider>
                                </ResponsiveProvider>
                            </IconProvider>
                        </ListProvider>
                    </IntlProvider>
                </BrowserRouter>
            );
        });

        expect(httpClient.get).toHaveBeenNthCalledWith(1, "https://mock.example.api//items?page=1&per_page=1&sort=-created_at&api_key=");
        expect(screen.queryAllByText("First item").length).toEqual(1);
        expect(screen.getByText("First item")).toBeTruthy();
        expect(screen.queryByText("Second item")).toBeFalsy();
        expect(screen.getByText("Third item")).toBeTruthy();
    });

    it('should call api with first sortOption from props (getInitSort func)', async () => {
        httpClient.get.mockResolvedValue({
            status: 200,
            "data": {
                "success": true,
                "data": [
                    { id: 1, name: "First item" },
                    { id: 2, name: "Second item" },
                    { id: 3, name: "Third item" }
                ]
            }
        });

        await act(async () => {
            render(
                <BrowserRouter>
                    <IntlProvider locale="en">
                        <ListProvider>
                            <IconProvider library={regularIcons}>
                                <ResponsiveProvider>
                                    <DataProviderContext.Provider value={{ dataProvider: data }}>
                                        <PaginatedList
                                            currentListId={"itemList"}
                                            resource={'/items'}
                                            loadingComponent={null}
                                            resourcePropName={"item"}
                                            perPage={1}
                                            withPagination
                                            countless={false}
                                            staticContext={null}
                                            staticResourceName={"getListItem"}
                                            filters={{}}
                                            display="column"
                                            numberElements={3}
                                            sortOptions={[
                                                {
                                                    name: "test",
                                                    value: "-test",
                                                    type: "sort",
                                                    text: "test",
                                                },
                                                {
                                                    name: "old",
                                                    type: "sort",
                                                    value: "+created_at",
                                                    text: "oldest",
                                                },
                                            ]}
                                        >
                                            <ListItem />
                                        </PaginatedList>
                                    </DataProviderContext.Provider>
                                </ResponsiveProvider>
                            </IconProvider>
                        </ListProvider>
                    </IntlProvider>
                </BrowserRouter>
            );
        });

        expect(httpClient.get).toHaveBeenNthCalledWith(1, "https://mock.example.api//items?page=1&per_page=1&sort=-test&api_key=");
    });

    it('should call onUpdateTotal func if passed as prop and headers["total"] is present', async () => {
        httpClient.get.mockResolvedValue({
            status: 200,
            "headers": {
                "total": 3
            },
            "data": {
                "success": true,
                "data": [
                    { id: 1, name: "First item" },
                    { id: 2, name: "Second item" },
                    { id: 3, name: "Third item" }
                ]
            }
        });

        const callback = jest.fn();

        await act(async () => {
            render(
                <BrowserRouter>
                    <IntlProvider locale="en">
                        <ListProvider>
                            <IconProvider library={regularIcons}>
                                <ResponsiveProvider>
                                    <DataProviderContext.Provider value={{ dataProvider: data }}>
                                        <PaginatedList
                                            currentListId={"itemList"}
                                            resource={'/items'}
                                            loadingComponent={null}
                                            resourcePropName={"item"}
                                            perPage={1}
                                            withPagination
                                            staticContext={null}
                                            staticResourceName={"getListItem"}
                                            filters={{}}
                                            display="column"
                                            onUpdateTotal={callback}
                                            sortOptions={[
                                                {
                                                    name: "recent",
                                                    value: "-created_at",
                                                    type: "sort",
                                                    text: "recent",
                                                },
                                                {
                                                    name: "old",
                                                    type: "sort",
                                                    value: "+created_at",
                                                    text: "oldest",
                                                },
                                            ]}
                                        >
                                            <ListItem />
                                        </PaginatedList>
                                    </DataProviderContext.Provider>
                                </ResponsiveProvider>
                            </IconProvider>
                        </ListProvider>
                    </IntlProvider>
                </BrowserRouter>
            );
        });

        expect(httpClient.get).toHaveBeenNthCalledWith(1, "https://mock.example.api//items?page=1&per_page=1&sort=-created_at&api_key=");
        expect(callback).toHaveBeenNthCalledWith(1, 3);
    });

    it('should call api with first sortOptions filter type from props (getInitFilters func)', async () => {
        httpClient.get.mockResolvedValue({
            status: 200,
            "data": {
                "success": true,
                "data": [
                    { id: 1, name: "First item" },
                    { id: 2, name: "Second item" },
                    { id: 3, name: "Third item" }
                ]
            }
        });

        await act(async () => {
            render(
                <BrowserRouter>
                    <IntlProvider locale="en">
                        <ListProvider>
                            <IconProvider library={regularIcons}>
                                <ResponsiveProvider>
                                    <DataProviderContext.Provider value={{ dataProvider: data }}>
                                        <PaginatedList
                                            currentListId={"itemList"}
                                            resource={'/items'}
                                            loadingComponent={null}
                                            resourcePropName={"item"}
                                            perPage={1}
                                            withPagination
                                            countless={false}
                                            staticContext={null}
                                            staticResourceName={"getListItem"}
                                            filters={{}}
                                            display="column"
                                            numberElements={3}
                                            sortOptions={[
                                                {
                                                    name: "popular",
                                                    value: "true",
                                                    type: "filter",
                                                    textKey: "info.sort_by_popular",
                                                },
                                                {
                                                    name: "recent",
                                                    value: "-created_at",
                                                    textKey: "info.sort_by_newest",
                                                },
                                                {
                                                    name: "old",
                                                    value: "+created_at",
                                                    textKey: "info.sort_by_oldest",
                                                }
                                            ]}
                                        >
                                            <ListItem />
                                        </PaginatedList>
                                    </DataProviderContext.Provider>
                                </ResponsiveProvider>
                            </IconProvider>
                        </ListProvider>
                    </IntlProvider>
                </BrowserRouter>
            );
        });

        expect(httpClient.get).toHaveBeenNthCalledWith(1, "https://mock.example.api//items?page=1&per_page=1&popular=true&api_key=");
    });

    it('should use transformData filter func if passed as prop', async () => {
        httpClient.get.mockResolvedValue({
            status: 200,
            "headers": {
                "total": 3
            },
            "data": {
                "success": true,
                "data": [
                    { id: 1, name: "First item" },
                    { id: 2, name: "Second item" },
                    { id: 3, name: "Third item" }
                ]
            }
        });

        await act(async () => {
            render(
                <BrowserRouter>
                    <IntlProvider locale="en">
                        <ListProvider>
                            <IconProvider library={regularIcons}>
                                <ResponsiveProvider>
                                    <DataProviderContext.Provider value={{ dataProvider: data }}>
                                        <PaginatedList
                                            currentListId={"itemList"}
                                            resource={'/items'}
                                            loadingComponent={null}
                                            resourcePropName={"item"}
                                            perPage={1}
                                            withPagination
                                            staticContext={null}
                                            staticResourceName={"getListItem"}
                                            filters={{}}
                                            display="column"
                                            transformData={elm => elm.id !== 1}
                                            sortOptions={[
                                                {
                                                    name: "recent",
                                                    value: "-created_at",
                                                    type: "sort",
                                                    text: "recent",
                                                },
                                                {
                                                    name: "old",
                                                    type: "sort",
                                                    value: "+created_at",
                                                    text: "oldest",
                                                },
                                            ]}
                                        >
                                            <ListItem />
                                        </PaginatedList>
                                    </DataProviderContext.Provider>
                                </ResponsiveProvider>
                            </IconProvider>
                        </ListProvider>
                    </IntlProvider>
                </BrowserRouter>
            );
        });

        expect(httpClient.get).toHaveBeenNthCalledWith(1, "https://mock.example.api//items?page=1&per_page=1&sort=-created_at&api_key=");
        expect(screen.queryByText("First item")).toBeFalsy();
        expect(screen.getByText("Second item")).toBeTruthy();
        expect(screen.getByText("Third item")).toBeTruthy();
    });

    it('should call onElementsLoad if passed as props', async () => {
        httpClient.get.mockResolvedValue({
            status: 200,
            "data": {
                "success": true,
                "data": [
                    { id: 1, name: "First item" },
                    { id: 2, name: "Second item" },
                    { id: 3, name: "Third item" }
                ]
            }
        });

        const callback = jest.fn();

        await act(async () => {
            render(
                <BrowserRouter>
                    <IntlProvider locale="en">
                        <ListProvider>
                            <IconProvider library={regularIcons}>
                                <ResponsiveProvider>
                                    <DataProviderContext.Provider value={{ dataProvider: data }}>
                                        <PaginatedList
                                            currentListId={"itemList"}
                                            resource={'/items'}
                                            loadingComponent={null}
                                            resourcePropName={"item"}
                                            perPage={1}
                                            withPagination
                                            countless={false}
                                            staticContext={null}
                                            staticResourceName={"getListItem"}
                                            filters={{}}
                                            display="column"
                                            numberElements={3}
                                            onElementsLoad={callback}
                                            sortOptions={[
                                                {
                                                    name: "recent",
                                                    value: "-created_at",
                                                    type: "sort",
                                                    text: "recent",
                                                },
                                                {
                                                    name: "old",
                                                    type: "sort",
                                                    value: "+created_at",
                                                    text: "oldest",
                                                },
                                            ]}
                                        >
                                            <ListItem />
                                        </PaginatedList>
                                    </DataProviderContext.Provider>
                                </ResponsiveProvider>
                            </IconProvider>
                        </ListProvider>
                    </IntlProvider>
                </BrowserRouter>
            );
        });

        expect(httpClient.get).toHaveBeenNthCalledWith(1, "https://mock.example.api//items?page=1&per_page=1&sort=-created_at&api_key=");
        expect(callback).toHaveBeenCalled();
    });

    it('should add elements through useList hook', async () => {
        const myElements = [
            { id: 4, name: "Fourth item" },
            { id: 5, name: "Fifth item" }
        ];

        const AddElementsComponent = () => {
            const list = useList();

            const handleAdd = () => {
                list.add("itemList", myElements);
            }

            return (
                <button onClick={handleAdd}>Add elements</button>
            )
        }

        const callback = jest.fn();

        await act(async () => {
            render(
                <BrowserRouter>
                    <IntlProvider locale="en">
                        <ResponsiveProvider>
                            <DataProviderContext.Provider value={{ dataProvider: data }}>
                                <IconProvider library={regularIcons}>
                                    <ListProvider>
                                        <AddElementsComponent />
                                        <PaginatedList
                                            currentListId={"itemList"}
                                            resource={'/items'}
                                            sort={"-created_at"}
                                            loadingComponent={null}
                                            resourcePropName={"item"}
                                            perPage={10}
                                            withPagination={false}
                                            countless={true}
                                            staticContext={null}
                                            staticResourceName={"getListItem"}
                                            display="column"
                                            onElementsLoad={callback}
                                        >
                                            <ListItem />
                                        </PaginatedList>
                                    </ListProvider>
                                </IconProvider>
                            </DataProviderContext.Provider>
                        </ResponsiveProvider>
                    </IntlProvider>
                </BrowserRouter>
            );
        });

        expect(screen.getByText("First item")).toBeTruthy();
        expect(screen.getByText("Second item")).toBeTruthy();
        expect(screen.getByText("Third item")).toBeTruthy();

        const addButton = screen.getByText("Add elements");
        expect(addButton).toBeTruthy();

        await act(async () => { await userEvent.click(addButton) });

        expect(screen.getByText(/Fourth item/i)).toBeTruthy();
        expect(screen.getByText(/Fifth item/i)).toBeTruthy();
    });
});