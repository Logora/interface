import React from 'react';
import { Pagination } from './Pagination';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';

export const DefaultPagination = () => {
    const lists = {
        argumentList: {
            currentPage: 1,
            perPage: 10,
            totalElements: 20,
            hideLoader: false,
            isLoading: false,
            onLoad: () => {}
        }
    };
    return (
        <IconProvider library={regularIcons}>
            <Pagination buttonText={"Next page"} lists={lists} />
        </IconProvider>
    );
};

export const LoadingElementsPagination = () => {
    const lists = {
        argumentList: {
            currentPage: 1,
            perPage: 10,
            totalElements: 20,
            hideLoader: false,
            isLoading: true,
            onLoad: () => {}
        }
    };
    return (
        <IconProvider library={regularIcons}>
            <Pagination buttonText={"Next page"} lists={lists} />
        </IconProvider>
    );
};