import React from 'react';
import { SearchInput } from './SearchInput';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';

export const DefaultSearchInput = () => {
    return (
        <IconProvider library={regularIcons}>
            <SearchInput onSearchSubmit={(query) => alert(query)} placeholder={"Search"} />
        </IconProvider>
    )
};

export const ReducedByDefaultSearchInput = () => {
    return (
        <IconProvider library={regularIcons}>
            <SearchInput onSearchSubmit={() => alert("SearchInput callback")} placeholder={"Search"} reducedByDefault={true} />
        </IconProvider>
    )
};

export const DisabledSearchInput = () => {
    return (
        <IconProvider library={regularIcons}>
            <SearchInput onSearchSubmit={() => alert("SearchInput callback")} placeholder={"Search"} disabled={true} />
        </IconProvider>
    )
};