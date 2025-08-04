import React from 'react';
import { IntlProvider } from 'react-intl';
import { SearchInput } from './SearchInput';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';

export const DefaultSearchInput = () => {
    return (
        <IntlProvider locale="en">
            <IconProvider library={regularIcons}>
                <SearchInput onSearchSubmit={(query) => alert(query)} placeholder={"Search"} />
            </IconProvider>
        </IntlProvider>
    )
};

export const ReducedByDefaultSearchInput = () => {
    return (
        <IntlProvider locale="en">
            <IconProvider library={regularIcons}>
                <SearchInput onSearchSubmit={() => alert("SearchInput callback")} placeholder={"Search"} reducedByDefault={true} />
            </IconProvider>
        </IntlProvider>
    )
};

export const DisabledSearchInput = () => {
    return (
        <IntlProvider locale="en">
            <IconProvider library={regularIcons}>
                <SearchInput onSearchSubmit={() => alert("SearchInput callback")} placeholder={"Search"} disabled={true} />
            </IconProvider>
        </IntlProvider>
    )

};