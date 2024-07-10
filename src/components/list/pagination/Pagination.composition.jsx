import React from 'react';
import { Pagination } from './Pagination';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';

export const DefaultPagination = () => {
    return (
        <IconProvider library={regularIcons}>
            <Pagination buttonText={"Next page"} currentPage={1} perPage={10} totalElements={20} hideLoader={false} />
        </IconProvider>
    );
};

export const LoadingElementsPagination = () => {
    return (
        <IconProvider library={regularIcons}>
            <Pagination buttonText={"Next page"} currentPage={1} perPage={10} totalElements={20} hideLoader={false} isLoading={true} />
        </IconProvider>
    );
};