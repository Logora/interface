import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Pagination } from './Pagination';

const callback = jest.fn();

describe('Pagination', () => {
    it('should render with the correct text', () => {
        const pagination = render(
            <Pagination 
                buttonText={"Voir plus"} 
                currentPage={1} 
                perPage={10} 
                totalElements={20} 
                hideLoader={false} 
                isLoading={false} 
                onLoad={callback} 
            />
        );
        const renderedPagination = pagination.getByText(/Voir plus/i);
        expect(renderedPagination).toBeTruthy();
    });
    
    it('should render loader when isLoading prop is true', () => {
        const pagination = render(
            <Pagination 
                buttonText={"Voir plus"} 
                currentPage={1} 
                perPage={10} 
                totalElements={30} 
                hideLoader={false} 
                isLoading={true}
                onLoad={callback} 
            />
        );
        expect(screen.getByRole("status")).toBeTruthy()
    });
    
    it('should call onLoad when clicked', () => {
        const pagination = render(
            <Pagination 
                buttonText={"Voir plus"} 
                currentPage={1} 
                perPage={10} 
                totalElements={20} 
                hideLoader={false} 
                isLoading={false} 
                onLoad={callback} 
            />
        );
        const renderedPagination = pagination.getByText(/Voir plus/i);
        fireEvent.click(renderedPagination);
        expect(callback).toHaveBeenCalled();
    });
});