import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Pagination } from './Pagination';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';

const callback = jest.fn();

const listsSingle = {
    argumentList: {
        currentPage: 1,
        perPage: 10,
        totalElements: 20,
        hideLoader: false,
        isLoading: false,
        onLoad: callback
    }
};

const listsLoading = {
    argumentList: {
        currentPage: 1,
        perPage: 10,
        totalElements: 30,
        hideLoader: false,
        isLoading: true,
        onLoad: callback
    }
};

describe('Pagination', () => {
    it('should render with the correct text', () => {
        const pagination = render(
            <IconProvider library={regularIcons}>
                <Pagination 
                    buttonText={"Voir plus"} 
                    lists={listsSingle}
                />
            </IconProvider>
        );
        const renderedPagination = pagination.getByText(/Voir plus/i);
        expect(renderedPagination).toBeTruthy();
    });
    
    it('should render loader when isLoading is true', () => {
        const pagination = render(
            <IconProvider library={regularIcons}>
                <Pagination 
                    buttonText={"Voir plus"} 
                    lists={listsLoading}
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
                    lists={listsSingle}
                />
            </IconProvider>
        );
        const renderedPagination = pagination.getByText(/Voir plus/i);
        fireEvent.click(renderedPagination);
        expect(callback).toHaveBeenCalled();
    });
    
    it('should show button if at least one list has next page', () => {
        const listsMulti = {
            argumentListA: {
                currentPage: 1,
                perPage: 10,
                totalElements: 5,
                hideLoader: false,
                isLoading: false,
                onLoad: callback
            },
            argumentListB: {
                currentPage: 1,
                perPage: 10,
                totalElements: 20,
                hideLoader: false,
                isLoading: false,
                onLoad: callback
            }
        };
        const pagination = render(
            <IconProvider library={regularIcons}>
                <Pagination 
                    buttonText={"Voir plus"} 
                    lists={listsMulti}
                />
            </IconProvider>
        );
        expect(pagination.getByText(/Voir plus/i)).toBeTruthy();
    });
});