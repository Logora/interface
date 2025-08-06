import React from 'react';
import { IntlProvider } from 'react-intl';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SignupForm } from './SignupForm';

describe('SignupForm', () => {
    it('should render form with correct inputs', () => {
        render(
            <IntlProvider locale="en">
                <SignupForm 
                    onSubmit={(first_name, last_name, email, password, password_confirmation, accepts_provider_email) => false }
                    providerName={"my company"}
                    error={false}
                />
            </IntlProvider>
        );

        expect(screen.getAllByRole("button")).toHaveLength(1);

        const firstNameInput = screen.getByTestId("first-name-input");
        expect(firstNameInput.tagName).toBe("INPUT");
        expect(firstNameInput.name).toBe("first_name");
        expect(firstNameInput.required).toBeTruthy();

        const lastNameInput = screen.getByTestId("last-name-input");
        expect(lastNameInput.tagName).toBe("INPUT");
        expect(lastNameInput.name).toBe("last_name");
        expect(lastNameInput.required).toBeFalsy();
        
        const emailInput = screen.getByTestId("email-input");
        expect(emailInput.tagName).toBe("INPUT");
        expect(emailInput.name).toBe("email");
        expect(emailInput.required).toBeTruthy();

        const passwordInput = screen.getByTestId("password-input");
        expect(passwordInput.tagName).toBe("INPUT");
        expect(passwordInput.name).toBe("password");
        expect(passwordInput.required).toBeTruthy();

        const confirmPasswordInput = screen.getByTestId("password-confirmation-input");
        expect(confirmPasswordInput.tagName).toBe("INPUT");
        expect(confirmPasswordInput.name).toBe("password_confirmation");
        expect(confirmPasswordInput.required).toBeTruthy();

        const acceptsEmailInput = screen.getByTestId("accepts-email-input");
        expect(screen.getByText("I agree to receive emails from the editor")).toBeTruthy();
    });

    it('should render form with error', () => {
        render(
            <IntlProvider locale="en">
                <SignupForm 
                    onSubmit={(first_name, last_name, email, password, password_confirmation, accepts_provider_email) => false }
                    providerName={"my company"}
                    error={true}
                />
            </IntlProvider>
        );
        expect(screen.getAllByRole("button")).toHaveLength(1);

        expect(screen.getByText("An error occurred while signing up. Please check your input and try again.")).toBeTruthy();
    });

    it('should trigger callback when submitting function', async () => {
        const email = "test@test.com";
        const firstName = "My first name";
        const lastName = "My last name";
        const password = "my-password";
        const passwordConfirmation = password;
        const acceptsEmail = true;
        const onSubmitCallback = jest.fn();

        render(
            <IntlProvider locale="en">
                <SignupForm 
                    onSubmit={onSubmitCallback}
                    providerName={"my company"}
                    error={false}
                />
            </IntlProvider>
        );

        const submitButton = screen.getByRole("button");
        const firstNameInput = screen.getByTestId("first-name-input");
        const lastNameInput = screen.getByTestId("last-name-input");
        const emailInput = screen.getByTestId("email-input");
        const passwordInput = screen.getByTestId("password-input");
        const confirmPasswordInput = screen.getByTestId("password-confirmation-input");
        const acceptsEmailInput = screen.getByTestId("accepts-email-input");

        await userEvent.type(firstNameInput, firstName);
        await userEvent.type(lastNameInput, lastName);
        await userEvent.type(emailInput, email);
        await userEvent.type(passwordInput, password);
        await userEvent.type(confirmPasswordInput, passwordConfirmation);
        await userEvent.click(acceptsEmailInput);

        expect(submitButton).toBeTruthy();

        await userEvent.click(submitButton);
        expect(onSubmitCallback).toHaveBeenCalledTimes(1);
        expect(onSubmitCallback).toHaveBeenCalledWith(firstName, lastName, email, password, passwordConfirmation, acceptsEmail);
    });

    it('should render password error', async () => {
        const email = "test@test.com";
        const firstName = "My first name";
        const lastName = "My last name";
        const password = "my-password";
        const passwordConfirmation = "my-password-but-not-the-same";
        const onSubmitCallback = jest.fn();

        render(
            <IntlProvider locale="en">
                <SignupForm 
                    onSubmit={onSubmitCallback}
                    providerName={"my company"}
                    error={false}
                />
            </IntlProvider>
        );

        const submitButton = screen.getByRole("button");
        const firstNameInput = screen.getByTestId("first-name-input");
        const lastNameInput = screen.getByTestId("last-name-input");
        const emailInput = screen.getByTestId("email-input");
        const passwordInput = screen.getByTestId("password-input");
        const confirmPasswordInput = screen.getByTestId("password-confirmation-input");
        const acceptsEmailInput = screen.getByTestId("accepts-email-input");

        await userEvent.type(firstNameInput, firstName);
        await userEvent.type(lastNameInput, lastName);
        await userEvent.type(emailInput, email);
        await userEvent.type(passwordInput, password);
        await userEvent.type(confirmPasswordInput, passwordConfirmation);
        await userEvent.click(acceptsEmailInput);

        expect(submitButton).toBeTruthy();

        await userEvent.click(submitButton);
        expect(screen.getAllByText("Password and confirmation are not matching.")).toBeTruthy();
    });
});