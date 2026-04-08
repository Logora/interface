import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { InnerComponent } from './ScrollToTop.composition';

describe('ScrollToTop', () => {  
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should scroll to the element with the specified ID on location change', async () => {
        const scrollIntoViewMock = vi.fn();
        const getElementByIdMock = vi.fn(() => ({
            scrollIntoView: scrollIntoViewMock
        }));
        window.document.getElementById = getElementByIdMock;
        window.scrollTo = vi.fn();

        render(
            <BrowserRouter>
                <InnerComponent />
            </BrowserRouter>
        );

        expect(getElementByIdMock).not.toHaveBeenCalledWith('test');
        expect(scrollIntoViewMock).not.toHaveBeenCalled();

        const button = screen.getByText("Navigate")
        expect(button).toBeTruthy();
        await userEvent.click(button)

        expect(getElementByIdMock).toHaveBeenCalledWith('test');
        expect(scrollIntoViewMock).toHaveBeenCalled();
    });  
});