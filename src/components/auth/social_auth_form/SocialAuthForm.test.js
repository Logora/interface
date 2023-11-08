import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from "react-router";
import { IntlProvider } from 'react-intl';
import { SocialAuthForm } from './SocialAuthForm';
import { DefaultSocialAuthForm, SocialAuthFormWithoutLogo } from './SocialAuthForm.composition';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';

describe('SocialAuthForm', () => {
    it('should render with correct default', () => {
        const component = render(
            <DefaultSocialAuthForm />
        )

        expect(screen.getByRole("img")).toBeTruthy();
        const facebookButton = screen.getByText(/Sign in with Facebook/i);
        const googleButton = screen.getByText(/Sign in with Google/i);
        const emailButton = screen.getByText(/Sign in with email/i);

        expect(facebookButton).toBeTruthy();
        expect(googleButton).toBeTruthy();
        expect(emailButton).toBeTruthy();
    });

    it('should render without logo', () => {
        const component = render(
            <SocialAuthFormWithoutLogo />
        )

        expect(screen.queryByRole("img")).toBeNull();
        const facebookButton = screen.getByText(/Sign in with Facebook/i);
        const googleButton = screen.getByText(/Sign in with Google/i);
        const emailButton = screen.getByText(/Sign in with email/i);

        expect(facebookButton).toBeTruthy();
        expect(googleButton).toBeTruthy();
        expect(emailButton).toBeTruthy();
    });

    it('should handle login navigation', async () => {
        const component = render(
            <DefaultSocialAuthForm />
        )
        const emailButton = screen.getByText(/Sign in with email/i);
        expect(emailButton).toBeTruthy();

        await userEvent.click(emailButton);

        expect(screen.getByText("Email")).toBeTruthy();
        expect(screen.getByText("Password")).toBeTruthy();

        const backButton = screen.getByText("Back to menu");
        expect(backButton).toBeTruthy();

        await userEvent.click(backButton);

        const emailButton2 = screen.getByText(/Sign in with email/i);
        expect(emailButton2).toBeTruthy();
    });

    it('should handle signup navigation', async () => {
        const component = render(
            <DefaultSocialAuthForm />
        )

        const signupButton = screen.getByText(/Sign up/i);
        expect(signupButton).toBeTruthy();

        await userEvent.click(signupButton);

        const emailButton = screen.getByText(/Sign in with email/i);
        expect(emailButton).toBeTruthy();

        await userEvent.click(emailButton);

        expect(screen.getByText("First name")).toBeTruthy();
        expect(screen.getByText("Last name")).toBeTruthy();
        expect(screen.getByText("Email")).toBeTruthy();
        expect(screen.getByText("Password")).toBeTruthy();

        const backButton = screen.getByText("Back to menu");
        expect(backButton).toBeTruthy();

        await userEvent.click(backButton);

        expect(screen.getByText(/Sign in with email/i)).toBeTruthy();
        expect(screen.getByText(/Already have an account ?/i)).toBeTruthy();
    });

    it('should trigger callback when logging in with correct data', async () => {
        const email = "test@test.com";
        const password = "password";
        const onSubmitCallback = jest.fn();
        const data = { email: email, password: password }

        const component = render(
            <MemoryRouter>
                <IconProvider library={regularIcons}>
                    <IntlProvider locale="en">
                        <SocialAuthForm 
                            onSubmit={onSubmitCallback} 
                            facebookClientId={"facebook-client-id"}
                            googleClientId={"google-client-id"}
                            oAuthRedirectUri={"https://redirect-uri.com"} 
                            logoUrl={"https://picsum.photos/200"}
                            providerName={"My company"}
                            termsUrl={"https://example.com/terms"}
                            privacyUrl={"https://example.com/privacy"}
                            forgotPasswordUrl={"http://example.com/forgot_password"} 
                            lastStep={"LOGIN"}
                        />
                    </IntlProvider>
                </IconProvider>
            </MemoryRouter>
        )

        const submitButton = screen.getByRole("button");
        const emailInput = screen.getByTestId("email-input");
        const passwordInput = screen.getByTestId("password-input");

        await userEvent.type(emailInput, email);
        await userEvent.type(passwordInput, password);

        expect(submitButton).toBeTruthy();

        await userEvent.click(submitButton);
        expect(onSubmitCallback).toHaveBeenCalledTimes(1);
        expect(onSubmitCallback).toHaveBeenCalledWith(data, "password", "LOGIN");
    });

    it('should trigger callback when signing up with correct data', async () => {
        const email = "test@test.com";
        const firstName = "My first name";
        const lastName = "My last name";
        const password = "my-password";
        const passwordConfirmation = password;
        const acceptsEmail = true;
        const onSubmitCallback = jest.fn();
        const data = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            accepts_provider_email: acceptsEmail,
            receives_newsletter_email: acceptsEmail
        }

        const component = render(
            <MemoryRouter>
                <IconProvider library={regularIcons}>
                    <IntlProvider locale="en">
                        <SocialAuthForm 
                            onSubmit={onSubmitCallback} 
                            facebookClientId={"facebook-client-id"}
                            googleClientId={"google-client-id"}
                            oAuthRedirectUri={"https://redirect-uri.com"} 
                            logoUrl={"https://picsum.photos/200"}
                            providerName={"My company"}
                            termsUrl={"https://example.com/terms"}
                            privacyUrl={"https://example.com/privacy"}
                            forgotPasswordUrl={"http://example.com/forgot_password"} 
                            lastStep={"SIGNUP"}
                        />
                    </IntlProvider>
                </IconProvider>
            </MemoryRouter>
        )

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

        const call = onSubmitCallback.mock.calls[0];
        expect(call[0].first_name).toBe(firstName);
        expect(call[0].last_name).toBe(lastName);
        expect(call[0].email).toBe(email);
        expect(call[0].password).toBe(password);
        expect(call[0].accepts_provider_email).toBe(acceptsEmail);
        expect(call[0].receives_newsletter_email).toBe(acceptsEmail);
        expect(call[1]).toBe('form');
        expect(call[2]).toBe('SIGNUP');
    });
});