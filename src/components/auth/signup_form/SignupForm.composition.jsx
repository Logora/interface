import React from 'react';
import { IntlProvider } from 'react-intl';
import { SignupForm } from './SignupForm';

export const DefaultSignupForm = () => {
    return (
        <IntlProvider locale="en">
            <SignupForm 
                onSubmit={(first_name, last_name, email, password, password_confirmation, accepts_provider_email) => false }
                providerName={"Debate Inc."}
            />
        </IntlProvider>
    );
};

export const SignupFormWithError = () => {
    return (
        <IntlProvider locale="en">
            <SignupForm 
                onSubmit={(first_name, last_name, email, password, password_confirmation, accepts_provider_email) => false }
                providerName={"My company"}
                error={true} 
            />
        </IntlProvider>
    );
};