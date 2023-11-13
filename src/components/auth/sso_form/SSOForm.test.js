import React from 'react';
import { render, screen } from '@testing-library/react';
import { DefaultSSOForm, SSOFormWithRedirect, SSOFormWithEmailConsent, SSOFormWithError, SSOFormWithoutActions } from './SSOForm.composition';

describe('SSOForm', () => {
    it('should render with correct defaults', () => {
        const component = render(
            <DefaultSSOForm />
        )

        const signupButton = screen.getByTestId('signup-button');
        const signinLink = screen.getByTestId('signin-link');

        expect(signupButton).toBeTruthy();
        expect(signinLink).toBeTruthy();
        expect(signinLink.href).toBe("https://example.com/login?client_id=client-id&redirect_uri=https%3A%2F%2Fredirect-uri.com&scope=email&response_type=code&state=aHR0cDovL2xvY2FsaG9zdC8%3D");
        expect(signupButton.href).toBe("https://example.com/signup?client_id=client-id&redirect_uri=https%3A%2F%2Fredirect-uri.com&scope=email&response_type=code&state=aHR0cDovL2xvY2FsaG9zdC8%3D");
        expect(screen.getByText('Already have an account ?')).toBeTruthy();
        expect(screen.getByText("Debate now !")).toBeTruthy();
        expect(screen.getByText("Sign up right now and receive alerts by email.")).toBeTruthy();
        expect(screen.queryByRole("input")).toBeNull();
        expect(screen.queryByText("An error occurred during sign in. Please try again in a few moments.")).toBeNull();
    });

    it('should render with correct links if not OAuth2', () => {
        const component = render(
            <SSOFormWithRedirect />
        )

        const signupButton = screen.getByTestId('signup-button');
        const signinLink = screen.getByTestId('signin-link');

        expect(signupButton).toBeTruthy();
        expect(signinLink).toBeTruthy();
        expect(signinLink.href).toBe("https://example.com/login?logora_redirect=http%3A%2F%2Flocalhost%2F");
        expect(signupButton.href).toBe("https://example.com/signup?logora_redirect=http%3A%2F%2Flocalhost%2F");
        expect(screen.getByText('Already have an account ?')).toBeTruthy();
        expect(screen.getByText("Sign up right now and receive alerts by email.")).toBeTruthy();
        expect(screen.queryByRole("input")).toBeNull();
        expect(screen.queryByText("An error occurred during sign in. Please try again in a few moments.")).toBeNull();
    });

    it('should render with consent toggle', () => {
        const component = render(
            <SSOFormWithEmailConsent />
        )

        const toggle = screen.queryByRole("input");
        const signupButton = screen.getByTestId('signup-button');
        const signinLink = screen.getByTestId('signin-link');

        expect(signupButton).toBeTruthy();
        expect(signinLink).toBeTruthy();
        expect(toggle).toBeTruthy();
    });

    it('should render with error', () => {
        render(
            <SSOFormWithError />
        )

        expect(screen.getByText("An error occurred during sign in. Please try again in a few moments.")).toBeTruthy();
    });

    it('should render without actions if prop passed', () => {
        render(
            <SSOFormWithoutActions />
        )

        expect(screen.queryByTestId('signup-button')).toBeNull();
        expect(screen.queryByTestId('signin-link')).toBeNull();
    });
});