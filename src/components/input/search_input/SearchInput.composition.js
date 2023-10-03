import React from 'react';
import { SearchInput } from './SearchInput';

export const DefaultSearchInput = () => {
    return (
        <SearchInput onSearchSubmit={(query) => alert(query)} placeholder={"Search"} />
    )
};

export const ReducedByDefaultSearchInput = () => {
    return (
        <SearchInput onSearchSubmit={() => alert("SearchInput callback")} placeholder={"Search"} reducedByDefault={true} />
    )
};

export const DisabledSearchInput = () => {
    return (
        <SearchInput onSearchSubmit={() => alert("SearchInput callback")} placeholder={"Search"} disabled={true} />
    )
};