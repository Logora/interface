import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ToastProvider } from './ToastProvider';
import { useToast } from './useToast';

describe('ToastProvider', () => {
    it('should render container without toast by default', () => {
        render(
            <ToastProvider>
                <span>Hello world</span>
            </ToastProvider>
        );
        
        expect(screen.getByText("Hello world")).toBeTruthy();
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

        const ComponentWithToast = () => {
            const { toast, toasts } = useToast();

            return (
                <>
                    <div data-testid="toast-button" onClick={() => toast("First toast")}>My toaster</div>
                    <div data-testid="toast-counter">{ toasts.length } toasts</div>
                </>
            )
        }

        render(
            <ToastProvider>
                <ComponentWithToast />
            </ToastProvider>
        );

        const toastButton = screen.getByTestId("toast-button");
        expect(screen.queryByText("0 toasts")).toBeTruthy();
        expect(screen.queryByText("My toaster")).toBeInTheDocument();

        await fireEvent.click(toastButton);
        
        expect(screen.queryByText("First toast")).toBeTruthy();
        expect(screen.getByText("1 toasts")).toBeTruthy();
    });
});