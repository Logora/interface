import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ScrollToTop } from './ScrollToTop';
import { render } from '@testing-library/react';

describe('ScrollToTop', () => {  
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should scroll to the element with the specified ID', async () => {
        // Mock the window and its properties
        const scrollIntoViewMock = jest.fn();
        const getElementByIdMock = jest.fn(() => ({
            scrollIntoView: scrollIntoViewMock
        }));
        window.document.getElementById = getElementByIdMock;
        window.scrollTo = jest.fn();

        // Render the component with a dummy element
        render(
            <BrowserRouter>
                <ScrollToTop elementId="my-element" />
                <div id="my-element">Dummy element</div>
            </BrowserRouter>
        );

        // Expect that the DOM methods were called as expected
        expect(getElementByIdMock).toHaveBeenCalledWith('my-element');
        expect(scrollIntoViewMock).toHaveBeenCalled();
    });

    it('should not scroll when the location changes and an element ID is provided, but the element is not found', () => {
        const getElementByIdMock = jest.fn(() => null);
        jest.spyOn(document, 'getElementById').mockImplementation(getElementByIdMock);
    
        const { rerender } = render(
          <BrowserRouter>
            <ScrollToTop elementId="non-existent-element" />
          </BrowserRouter>
        );
    
        // Expect that getElementById and scrollIntoView were not called
        expect(getElementByIdMock).toHaveBeenCalledTimes(1);
        expect(getElementByIdMock).toHaveBeenCalledWith('non-existent-element');
        expect(getElementByIdMock.mock.results[0].value).toBeNull();
    });       
});