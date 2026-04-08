import React from 'react';
import { render, screen } from '@testing-library/react';
import { DefaultSSOForm, SSOFormWithRedirect, SSOFormWithEmailConsent, SSOFormWithError, SSOFormWithoutActions } from './SSOForm.stories';

describe('SSOForm', () => {
    it('should render with correct defaults', () => {
        const component = render(
            <DefaultSSOForm />
        )

        const signupButton = screen.getByTestId('signup-button');
        const signinLink = screen.getByTestId('signin-link');

        expect(signupButton).toBeTruthy();
        expect(signinLink).toBeTruthy();
        expect(signinLink.href).toContain("https://example.com/login?client_id=client-id");
        expect(signinLink.href).toContain("response_type=code");
        expect(signinLink.href).toContain("state=");
        expect(signupButton.href).toContain("https://example.com/signup?client_id=client-id");
        expect(signupButton.href).toContain("response_type=code");
        expect(signupButton.href).toContain("state=");
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
        expect(signinLink.href).toContain("https://example.com/login?logora_redirect=");
        expect(signupButton.href).toContain("https://example.com/signup?logora_redirect=");
        expect(decodeURIComponent(signinLink.href)).toContain(window.location.origin);
        expect(decodeURIComponent(signupButton.href)).toContain(window.location.origin);
        expect(screen.getByText('Already have an account ?')).toBeTruthy();
        expect(screen.getByText("Sign up right now and receive alerts by email.")).toBeTruthy();
        expect(screen.queryByRole("input")).toBeNull();
        expect(screen.queryByText("An error occurred during sign in. Please try again in a few moments.")).toBeNull();
    });

    it('should render with consent toggle when showEmailConsent is true', () => {
        const component = render(
            <SSOFormWithEmailConsent />
        )

        const toggle = screen.queryByTestId("accepts-email-input");
        expect(toggle).toBeTruthy();
    });

    it('should not render consent toggle when showEmailConsent is false', () => {
        const component = render(
            <DefaultSSOForm />
        )

        const toggle = screen.queryByTestId("accepts-email-input");
        expect(toggle).toBeNull();
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
