import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { toast } from 'react-hot-toast';
import { AlertContainer } from './AlertContainer';

describe('AlertContainer', () => {
    it('should render container without toast by default', () => {
        const { container } = render(
            <AlertContainer />
        );
        
        expect(container.firstChild.innerHTML).toHaveLength(0);
        expect(container.firstChild).toHaveClass("toaster");
    });

    it('should render toast when called', async () => {
        let mock = () => {}
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: (query) => { return {
                matches: false,
                media: query,
                onchange: null,
                addEventListener: mock,
                removeEventListener: mock,
                dispatchEvent: mock,
            }}
        });

        const message = 'Hello world !';

        render(
            <AlertContainer />
        );

        act(() => {
            toast.success(message);
        });

        expect(screen.queryByText(message)).toBeInTheDocument();
    });
});