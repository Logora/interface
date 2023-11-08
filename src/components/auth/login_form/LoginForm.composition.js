import React from 'react';
import { MemoryRouter } from "react-router";
import { IntlProvider } from 'react-intl';
import { LoginForm } from './LoginForm';

export const DefaultLoginForm = () => {
    return (
        <MemoryRouter>
            <IntlProvider locale="en">
                <LoginForm onSubmit={(email, password) => false } forgotPasswordUrl={"http://example.com/forgot_password"} />
            </IntlProvider>
        </MemoryRouter>
    );
};

export const LoginFormWithoutForgotPassword = () => {
    return (
        <MemoryRouter>
            <IntlProvider locale="en">
                <LoginForm onSubmit={(email, password) => false } error={false} />
            </IntlProvider>
        </MemoryRouter>
    );
};

export const LoginFormWithError = () => {
    return (
        <MemoryRouter>
            <IntlProvider locale="en">
                <LoginForm onSubmit={(email, password) => false } error={true} forgotPasswordUrl={"http://example.com/forgot_password"} />
            </IntlProvider>
        </MemoryRouter>
    );
};