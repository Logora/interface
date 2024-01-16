import React from 'react';
import { render, screen } from '@testing-library/react';
import { AsyncIntlProvider } from './AsyncIntlProvider';

const IntlComponent = () => {
    return (
        <div>Hello world !</div>
    )
}

describe('AsyncIntlProvider', () => {
    it('should render children', () => {
        render(
            <AsyncIntlProvider>
                <IntlComponent />
            </AsyncIntlProvider>
        )

        expect(screen.getByText("Hello world !")).toBeTruthy();
    });
});