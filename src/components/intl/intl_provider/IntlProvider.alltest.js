import React from 'react';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from './IntlProvider';

const IntlComponent = () => {
    return (
        <div>Hello world !</div>
    )
}

describe('IntlProvider', () => {
    it('should render children', () => {
        render(
            <IntlProvider>
                <IntlComponent />
            </IntlProvider>
        )

        expect(screen.getByText("Hello world !")).toBeTruthy();
    });
});