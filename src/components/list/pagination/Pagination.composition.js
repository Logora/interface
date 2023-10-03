import React from 'react';
import { Pagination } from './Pagination';

export const DefaultPagination = () => {
    return <Pagination buttonText={"Next page"} currentPage={1} perPage={10} totalElements={20} hideLoader={false} />;
};

export const LoadingElementsPagination = () => {
    return <Pagination buttonText={"Next page"} currentPage={1} perPage={10} totalElements={20} hideLoader={false} isLoading={true} />;
};