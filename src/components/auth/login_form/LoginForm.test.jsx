import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
    it('should render form with correct inputs', () => {
        const forgotPasswordUrl = "http://example.com/forgot_password";

        render(
            <IntlProvider locale="en">
                <MemoryRouter>
                    <LoginForm 
                        onSubmit={(email, password) => false }
                        forgotPasswordUrl={forgotPasswordUrl}
                        error={false}
                    />
                </MemoryRouter>
            </IntlProvider>
        );

        expect(screen.getAllByRole("button")).toHaveLength(1);
        expect(screen.getAllByRole("link")).toHaveLength(1);

        const emailInput = screen.getByTestId("email-input");
        expect(emailInput.tagName).toBe("INPUT");
        expect(emailInput.name).toBe("email");
        expect(emailInput.required).toBeTruthy();

        const passwordInput = screen.getByTestId("password-input");
        expect(passwordInput.tagName).toBe("INPUT");
        expect(passwordInput.name).toBe("password");
        expect(passwordInput.required).toBeTruthy();

        const forgotPasswordLink = screen.getByRole("link");
        expect(forgotPasswordLink.href).toBe("http://example.com/forgot_password?redirect_url=http%253A%252F%252Flocalhost%252F")
        expect(forgotPasswordLink.target).toBe("_blank");
    });

    it('should render form with error', () => {
        const forgotPasswordUrl = "http://example.com/forgot_password";

        const loginForm = render(
            <IntlProvider locale="en">
                <MemoryRouter>
                    <LoginForm 
                        onSubmit={(email, password) => false }
                        forgotPasswordUrl={forgotPasswordUrl}
                        error={true}
                    />
                </MemoryRouter>
            </IntlProvider>
        );
        expect(screen.getAllByRole("button")).toHaveLength(1);
        expect(screen.getAllByRole("link")).toHaveLength(1);

        expect(screen.getByText("An error occurred while signing in, please try again")).toBeTruthy();
    });

    it('should trigger callback when submitting function', async () => {
        const forgotPasswordUrl = "http://example.com/forgot_password";
        const email = "test@test.com";
        const password = "password";
        const onSubmitCallback = jest.fn();

        const loginForm = render(
            <IntlProvider locale="en">
                <MemoryRouter>
                    <LoginForm 
                        onSubmit={onSubmitCallback}
                        forgotPasswordUrl={forgotPasswordUrl}
                        error={false}
                    />
                </MemoryRouter>
            </IntlProvider>
        );

        const submitButton = screen.getByRole("button");
        const emailInput = screen.getByTestId("email-input");
        const passwordInput = screen.getByTestId("password-input");

        await userEvent.type(emailInput, email);
        await userEvent.type(passwordInput, password);

        expect(submitButton).toBeTruthy();

        await userEvent.click(submitButton);
        expect(onSubmitCallback).toHaveBeenCalledTimes(1);
        expect(onSubmitCallback).toHaveBeenCalledWith(email, password);
    });
});