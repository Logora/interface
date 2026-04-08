import React from 'react';
import { MemoryRouter } from "react-router-dom";
import { IntlProvider } from 'react-intl';
import { LoginForm } from './LoginForm';

const noop = () => false;

export default {
    title: 'Auth/Login Form',
    component: LoginForm,
    args: {
        forgotPasswordUrl: 'http://example.com/forgot_password',
        error: false,
        onSubmit: noop
    },
    argTypes: {
        forgotPasswordUrl: {
            control: 'text'
        },
        error: {
            control: 'boolean'
        },
        onSubmit: {
            control: false
        }
    },
    render: (args) => (
        <MemoryRouter>
            <IntlProvider locale="en">
                <LoginForm {...args} />
            </IntlProvider>
        </MemoryRouter>
    )
};

export const DefaultLoginForm = {};

export const LoginFormWithError = {
    args: {
        error: true
    }
};
