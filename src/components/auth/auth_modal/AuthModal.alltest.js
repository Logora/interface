import React from 'react';
import { render, screen } from '@testing-library/react';
import { DefaultAuthModal } from './AuthModal.composition';
import { AuthModalSSO } from './AuthModal.composition';

describe('AuthModal', () => {
    it('should render modal with social auth form', () => {
        render(
            <DefaultAuthModal />
        );

        const facebookButton = screen.getByText(/Sign in with Facebook/i);
        const googleButton = screen.getByText(/Sign in with Google/i);
        const emailButton = screen.getByText(/Sign in with email/i);

        expect(facebookButton).toBeTruthy();
        expect(googleButton).toBeTruthy();
        expect(emailButton).toBeTruthy();
    });

    it('should render modal with sso form', () => {
        render(
            <AuthModalSSO />
        );

        expect(screen.getByText('Already have an account ?')).toBeTruthy();
        expect(screen.getByText("Debate now !")).toBeTruthy();
        expect(screen.getByText("Sign up right now and receive alerts by email.")).toBeTruthy();
    });
});