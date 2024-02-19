import React from 'react';
import { PaginatedList } from './PaginatedList';
import { IntlProvider } from 'react-intl';
import { dataProvider, DataProviderContext } from '@logora/debate.data.data_provider';
import { ListProvider } from '@logora/debate.list.list_provider';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import { ResponsiveProvider } from '@logora/debate.hooks.use_responsive';
import * as regularIcons from '@logora/debate.icons.regular_icons';
import { BrowserRouter } from 'react-router-dom';

const ListItem = (props) => {
    return (
        <p>{props.item.name}</p>
    )
}

const httpClient = {
    get: () => { return new Promise((resolve, reject) => {
            resolve(
                {
                    "data": {
                        "success": true,
                        "data": [ 
                            { id: 1, name: "First item" },
                            { id: 2, name: "Second item"},
                            { id: 3, name: "Third item"}
                        ]
                    }
                }
            );
        });
    },
    post: () => null,
    patch: () => null
};

const data = dataProvider(httpClient, "https://mock.example.api");

export const DefaultPaginatedList = () => {
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
};

export const PaginatedListWithPagination = () => {
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
                                    perPage={1}
                                    withPagination
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
};

export const PaginatedListWithCustomGap = () => {
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
                                    perPage={1}
                                    withPagination
                                    countless={false}
                                    staticContext={null}
                                    staticResourceName={"getListItem"}
                                    display="column"
                                    numberElements={3}
                                    gap={"2em"}
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
};

export const PaginatedListWithSearchBarAndTitle = () => {
    return (
        <div style={{width: "400px"}}>
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
                                    withPagination={false}
                                    countless={false}
                                    staticContext={null}
                                    staticResourceName={"getListItem"}
                                    display="column"
                                    numberElements={3}
                                    gap={"1em"}
                                    searchBar
                                    title={"List title"}
                                >
                                    <ListItem />
                                </PaginatedList>
                            </DataProviderContext.Provider>
                        </ResponsiveProvider>
                    </IconProvider>
                </ListProvider>
            </IntlProvider>
        </BrowserRouter>
        </div>
    );
};

export const RowPaginatedList = () => {
    return (
        <div style={{width: "400px"}}>
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
                                    withPagination={false}
                                    countless={false}
                                    staticContext={null}
                                    staticResourceName={"getListItem"}
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
        </div>
    );
};