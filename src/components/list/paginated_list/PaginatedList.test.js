import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
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
import { faker } from '@faker-js/faker'

const createElement = () => {
    return {
        id: faker.random.numeric(6),
        name: faker.music.songName()
    }
}

const httpClient = {
    get: () =>  Promise.resolve({
        status: 200,
        data: {
            success: true,
            data: Array.from({length: 3}, createElement)
        }
    })
};

const ListItem = (props) => {
    return (
        <p>{props.item.name}</p>
    )
}

const data = dataProvider(httpClient, "https://mock.example.api");

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
                                    resourcePropName={"item"}
                                    perPage={10}
                                    withPagination={false}
                                    countless={true}
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

describe('PaginatedList', () => {
    let mock;

    beforeEach(() => {
        mock = jest.spyOn(httpClient, 'get');
    });

    afterEach(() => {
        mock.mockRestore();
        mock.mockClear();
    });

    it('should render a basic list with correct content', async () => {
        await act(async () => {
            render(
                <DefaultList />
            );
        });

        expect(mock).toHaveBeenCalled();
        expect(screen.getAllByTestId("list-item")).toHaveLength(3);
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
        mock.mockImplementation(() =>  Promise.reject({
            status: 500,
            "data": {}
        }));

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
                                                resource={'/items'}
                                                sort={"-created_at"}
                                                resourcePropName={"item"}
                                                perPage={1}
                                                withPagination
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
        mock.mockResolvedValue({
            status: 200,
            data: {
                "success": true,
                "data": []
            }
        });

        await act(async () => {
            render(
                <DefaultList />
            );
        });

        expect(mock).toHaveBeenCalled();
        expect(screen.queryAllByTestId("list-item")).toHaveLength(0);
        expect(screen.queryByText("No items for now.")).toBeTruthy();
    });

    it('should render a list with a pagination button', async () => {
        mock.mockResolvedValue({
            status: 200,
            "data": {
                "success": true,
                "data": Array.from({length: 1}, createElement)
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
                                            resourcePropName={"item"}
                                            perPage={1}
                                            numberElements={3}
                                            display="column"
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

        expect(mock).toHaveBeenCalled();
        expect(screen.getAllByTestId("list-item")).toHaveLength(1);
        expect(screen.getByText("See more")).toBeTruthy();
    });

    it('should render a list with a search bar', async () => {
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
                                            resourcePropName={"item"}
                                            perPage={1}
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

        expect(mock).toHaveBeenCalled();
        expect(screen.getAllByTestId("list-item")).toHaveLength(3);
        expect(screen.getByText("Search")).toBeTruthy();
    });

    it('should render a list with a title', async () => {
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
                                            resourcePropName={"item"}
                                            perPage={1}
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

        expect(mock).toHaveBeenCalled();
        expect(screen.getAllByTestId("list-item")).toHaveLength(3);
        expect(screen.getByText("My title")).toBeTruthy();
    });

    it('should render a list with a sort select', async () => {
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
                                            resourcePropName={"item"}
                                            perPage={1}
                                            withPagination
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

        expect(mock).toHaveBeenCalled();
        expect(screen.getAllByTestId("list-item")).toHaveLength(3);
        expect(screen.queryByText("recent")).toBeTruthy();
    });

    it('should render an empty list with a component passed as props', async () => {
        mock.mockResolvedValue({
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
                                            resourcePropName={"item"}
                                            perPage={1}
                                            withPagination
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

        expect(mock).toHaveBeenCalled();
        expect(screen.queryByText("Empty list")).toBeTruthy();
        expect(screen.queryByText("Aucun élément pour le moment.")).toBeFalsy();
    });

    it('should call api on sort select click', async () => {
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
                                            resourcePropName={"item"}
                                            perPage={1}
                                            withPagination
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

        expect(mock).toHaveBeenNthCalledWith(1, "https://mock.example.api//items?page=1&per_page=1&sort=-created_at&api_key=");

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
                                            resourcePropName={"item"}
                                            perPage={1}
                                            withPagination
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

        expect(mock).toHaveBeenNthCalledWith(1, "https://mock.example.api//items?page=1&per_page=1&sort=-created_at&api_key=");

        expect(screen.getAllByTestId("list-item")).toHaveLength(3);
        const paginationButton = screen.getByText(/See more/i);
        expect(paginationButton).toBeTruthy();

        await userEvent.click(paginationButton);
        expect(mock).toHaveBeenCalled();
        expect(screen.getAllByTestId("list-item")).toHaveLength(6);
    });

    it('should call api with query params if passed as props', async () => {
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
                                            resourcePropName={"item"}
                                            perPage={1}
                                            withPagination
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

        expect(mock).toHaveBeenNthCalledWith(1, "https://mock.example.api//items?page=1&per_page=1&query=test&api_key=");
    });

    it('should call api when using searchbar', async () => {
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
                                            resourcePropName={"item"}
                                            perPage={1}
                                            withPagination
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

        expect(mock).toHaveBeenNthCalledWith(1, "https://mock.example.api//items?page=1&per_page=1&sort=-created_at&api_key=");

        const searchInput = screen.getByTestId("input_search_query");
        await userEvent.click(searchInput);

        expect(screen.getByText(/Search/i)).toBeTruthy();
        await userEvent.keyboard("test");
        await userEvent.keyboard("[Enter]");
        expect(mock).toHaveBeenCalled();
    });

    it('should call onElementClick when clicking list item', async () => {
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
                                            resourcePropName={"item"}
                                            perPage={1}
                                            withPagination
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

        expect(mock).toHaveBeenNthCalledWith(1, "https://mock.example.api//items?page=1&per_page=1&sort=-created_at&api_key=");
        const firstElm = screen.queryAllByTestId("list-item")[0];
        expect(firstElm).toBeTruthy();

        const secondElm = screen.queryAllByTestId("list-item")[1];
        expect(secondElm).toBeTruthy();

        await userEvent.click(firstElm);
        expect(callback).toHaveBeenCalled();

        await userEvent.click(secondElm);
        expect(callback).toHaveBeenCalled();
    });

    it('should render emptyText prop if no emptyListComponent is passed', async () => {
        mock.mockResolvedValue({
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
                                            resourcePropName={"item"}
                                            perPage={1}
                                            withPagination
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

        expect(mock).toHaveBeenNthCalledWith(1, "https://mock.example.api//items?page=1&per_page=1&sort=-created_at&api_key=");
        const emptyText = screen.getByText(/Empty text/i);
        expect(emptyText).toBeTruthy();
    });

    it('should call api with countless prop if passed', async () => {
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
                                            resourcePropName={"item"}
                                            perPage={1}
                                            withPagination
                                            countless={true}
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

        expect(mock).toHaveBeenNthCalledWith(1, "https://mock.example.api//items?page=1&per_page=1&sort=-created_at&countless=true&api_key=");
    });

    it('should render unique elements', async () => {
        mock.mockResolvedValue({
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
                                            resourcePropName={"item"}
                                            perPage={1}
                                            withPagination
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

        expect(mock).toHaveBeenNthCalledWith(1, "https://mock.example.api//items?page=1&per_page=1&sort=-created_at&api_key=");
        expect(screen.queryAllByText("First item").length).toEqual(1);
        expect(screen.getByText("First item")).toBeTruthy();
        expect(screen.queryByText("Second item")).toBeFalsy();
        expect(screen.getByText("Third item")).toBeTruthy();
    });

    it('should call api with first sortOption from props (getInitSort func)', async () => {
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
                                            resourcePropName={"item"}
                                            perPage={1}
                                            withPagination
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

        expect(mock).toHaveBeenNthCalledWith(1, "https://mock.example.api//items?page=1&per_page=1&sort=-test&api_key=");
    });

    it('should call onUpdateTotal func if passed as prop and headers["total"] is present', async () => {
        mock.mockResolvedValue({
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
                                            resourcePropName={"item"}
                                            perPage={1}
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

        expect(mock).toHaveBeenNthCalledWith(1, "https://mock.example.api//items?page=1&per_page=1&sort=-created_at&api_key=");
        expect(callback).toHaveBeenNthCalledWith(1, 3);
    });

    it('should call api with first sortOptions filter type from props (getInitFilters func)', async () => {
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
                                            resourcePropName={"item"}
                                            perPage={1}
                                            withPagination
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

        expect(mock).toHaveBeenNthCalledWith(1, "https://mock.example.api//items?page=1&per_page=1&popular=true&api_key=");
    });

    it('should use transformData filter func if passed as prop', async () => {
        mock.mockResolvedValue({
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
                                            resourcePropName={"item"}
                                            perPage={1}
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

        expect(mock).toHaveBeenNthCalledWith(1, "https://mock.example.api//items?page=1&per_page=1&sort=-created_at&api_key=");
        expect(screen.queryByText("First item")).toBeFalsy();
        expect(screen.getByText("Second item")).toBeTruthy();
        expect(screen.getByText("Third item")).toBeTruthy();
    });

    it('should call onElementsLoad if passed as props', async () => {
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
                                            resourcePropName={"item"}
                                            perPage={1}
                                            withPagination
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

        expect(mock).toHaveBeenNthCalledWith(1, "https://mock.example.api//items?page=1&per_page=1&sort=-created_at&api_key=");
        expect(callback).toHaveBeenCalled();
    });

    it('should add elements through useList hook', async () => {
        const myElements = Array.from({length: 4}, createElement)

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
                                            resourcePropName={"item"}
                                            perPage={10}
                                            withPagination={false}
                                            countless={true}
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

        expect(screen.getAllByTestId("list-item")).toHaveLength(3);

        const addButton = screen.getByText("Add elements");
        expect(addButton).toBeTruthy();

        await act(async () => { await userEvent.click(addButton) });

        expect(screen.getAllByTestId("list-item")).toHaveLength(7);
    });
});