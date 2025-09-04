import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ConfigContext } from '@logora/debate.data.config_provider';
import { useAuthRequired } from './useAuthRequired';
import { useModal } from '@logora/debate.dialog.modal';

jest.mock('@logora/debate.dialog.modal', () => ({
    useModal: jest.fn(),
}));

const TestComponent = () => {
    const requireAuthentication = useAuthRequired();

    return (
        <div>
            <button onClick={() => requireAuthentication({ foo: 'bar' })}>
                Authenticate
            </button>
        </div>
    );
};

describe('useAuthRequired', () => {
    const showModal = jest.fn();
    const hideModal = jest.fn();

    beforeEach(() => {
        useModal.mockReturnValue({
            showModal,
            hideModal,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should call requireAuthentication on button click', () => {
        const config = {
            auth: {
                disableLoginModal: false,
            },
        };

        const redirectUrl = window.location.href;

        window.dispatchEvent = jest.fn();

        const { getByText } = render(
            <ConfigContext.Provider value={{ config }}>
                <TestComponent />
            </ConfigContext.Provider>
        );

        fireEvent.click(getByText('Authenticate'));

        expect(window.dispatchEvent).toHaveBeenCalledWith(
            new CustomEvent('logora:authentication:requested', { detail: { redirectUrl } })
        );
    });

    it('should not show AuthModal if disableLoginModal is true', () => {
        const config = {
            auth: {
                disableLoginModal: true,
            },
        };

        const redirectUrl = window.location.href;

        const { getByText } = render(
            <ConfigContext.Provider value={{ config }}>
                <TestComponent />
            </ConfigContext.Provider>
        );

        fireEvent.click(getByText('Authenticate'));

        expect(window.dispatchEvent).toHaveBeenCalledWith(
            new CustomEvent('logora:authentication:requested', { detail: { redirectUrl } })
        );
        
        expect(showModal).not.toHaveBeenCalled();
    });
});
