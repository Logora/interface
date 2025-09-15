import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Pagination } from './Pagination';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';

const callback = jest.fn();

describe('Pagination', () => {
    it('should render with the correct text', () => {
        const pagination = render(
            <IconProvider library={regularIcons}>
                <Pagination 
                    buttonText={"Voir plus"} 
                    currentPage={1}
                    perPage={10}
                    totalElements={20}
                    hideLoader={false}
                    isLoading={false}
                    onLoad={callback}
                />
            </IconProvider>
        );
        const renderedPagination = pagination.getByText(/Voir plus/i);
        expect(renderedPagination).toBeTruthy();
    });
    
    it('should render loader when isLoading is true', () => {
        render(
            <IconProvider library={regularIcons}>
                <Pagination 
                    buttonText={"Voir plus"} 
                    currentPage={1}
                    perPage={10}
                    totalElements={30}
                    hideLoader={false}
                    isLoading={true}
                    onLoad={callback}
                />
            </IconProvider>
        );
        expect(screen.getByRole("status")).toBeTruthy()
    });
    
    it('should call onLoad when clicked', () => {
        const pagination = render(
            <IconProvider library={regularIcons}>
                <Pagination 
                    buttonText={"Voir plus"} 
                    currentPage={1}
                    perPage={10}
                    totalElements={20}
                    hideLoader={false}
                    isLoading={false}
                    onLoad={callback}
                />
            </IconProvider>
        );
        const renderedPagination = pagination.getByText(/Voir plus/i);
        fireEvent.click(renderedPagination);
        expect(callback).toHaveBeenCalled();
    });

    it('should not show button if there is no next page', () => {
        const pagination = render(
            <IconProvider library={regularIcons}>
                <Pagination 
                    buttonText={"Voir plus"} 
                    currentPage={2}
                    perPage={10}
                    totalElements={20}
                    hideLoader={false}
                    isLoading={false}
                    onLoad={callback}
                />
            </IconProvider>
        );
        expect(screen.queryByText(/Voir plus/i)).toBeNull();
    });
});