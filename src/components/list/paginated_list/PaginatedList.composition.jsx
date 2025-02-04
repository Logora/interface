import React from "react";
import { PaginatedList } from "./PaginatedList";
import { IntlProvider } from "react-intl";
import { BrowserRouter } from "react-router-dom";
import {
  dataProvider,
  DataProviderContext,
} from "@logora/debate.data.data_provider";
import { ListProvider } from "@logora/debate.list.list_provider";
import { IconProvider } from "@logora/debate.icons.icon_provider";
import { ResponsiveProvider } from "@logora/debate.hooks.use_responsive";
import * as regularIcons from "@logora/debate.icons.regular_icons";
import { faker } from "@faker-js/faker";

const ListItem = (props) => {
  return <p>{props.item.name}</p>;
};

const createElement = () => {
  return {
    id: faker.random.numeric(6),
    name: faker.music.songName(),
  };
};

const httpClient = {
  get: () => {
    return new Promise((resolve, reject) => {
      resolve({
        data: {
          success: true,
          data: Array.from({ length: 3 }, createElement),
        },
      });
    });
  },
  post: () => null,
  patch: () => null,
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
                  resource={"/items"}
                  resourcePropName={"item"}
                  perPage={3}
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
                  resource={"/items"}
                  sort={"-created_at"}
                  resourcePropName={"item"}
                  perPage={3}
                  numberElements={9}
                  withPagination
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
                  resource={"/items"}
                  sort={"-created_at"}
                  resourcePropName={"item"}
                  perPage={3}
                  numberElements={9}
                  withPagination
                  display="column"
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
    <div style={{ width: "400px" }}>
      <BrowserRouter>
        <IntlProvider locale="en">
          <ListProvider>
            <IconProvider library={regularIcons}>
              <ResponsiveProvider>
                <DataProviderContext.Provider value={{ dataProvider: data }}>
                  <PaginatedList
                    currentListId={"itemList"}
                    resource={"/items"}
                    sort={"-created_at"}
                    resourcePropName={"item"}
                    perPage={3}
                    numberElements={9}
                    display="column"
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

export const PaginatedListWithSort = () => {
  return (
    <div style={{ width: "400px" }}>
      <BrowserRouter>
        <IntlProvider locale="en">
          <ListProvider>
            <IconProvider library={regularIcons}>
              <ResponsiveProvider>
                <DataProviderContext.Provider value={{ dataProvider: data }}>
                  <PaginatedList
                    currentListId={"itemList"}
                    resource={"/items"}
                    sort={"-created_at"}
                    resourcePropName={"item"}
                    perPage={3}
                    numberElements={9}
                    display="column"
                    sortOptions={[
                      {
                        value: "-created_at",
                        type: "sort",
                        name: "recent",
                        text: "Recent",
                      },
                      {
                        value: "+created_at",
                        type: "sort",
                        name: "old",
                        text: "Old",
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
    </div>
  );
};

export const RowPaginatedList = () => {
  return (
    <div style={{ width: "400px" }}>
      <BrowserRouter>
        <IntlProvider locale="en">
          <ListProvider>
            <IconProvider library={regularIcons}>
              <ResponsiveProvider>
                <DataProviderContext.Provider value={{ dataProvider: data }}>
                  <PaginatedList
                    currentListId={"itemList"}
                    resource={"/items"}
                    sort={"-created_at"}
                    resourcePropName={"item"}
                    perPage={3}
                    numberElements={9}
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

export const PaginatedListWithOnLoadNewPage = () => {
  return (
    <BrowserRouter>
      <IntlProvider locale="en">
        <ListProvider>
          <IconProvider library={regularIcons}>
            <ResponsiveProvider>
              <DataProviderContext.Provider value={{ dataProvider: data }}>
                <PaginatedList
                  currentListId={"itemList"}
                  resource={"/items"}
                  sort={"-created_at"}
                  resourcePropName={"item"}
                  perPage={3}
                  numberElements={9}
                  withPagination
                  display="column"
                  onLoadNewPage={() => null}
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
