import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { useAuth } from '@logora/debate/auth/use_auth';
import { useDataProvider } from '@logora/debate/data/data_provider';
import { useModal } from '@logora/debate/dialog/modal';
import { useConfig } from '@logora/debate/data/config_provider';
import { getOnboardingBeforeLoginStorageKey, useOnboarding } from './useOnboarding';

vi.mock('@logora/debate/auth/use_auth', () => ({
    useAuth: vi.fn(),
}));

vi.mock('@logora/debate/data/data_provider', () => ({
    useDataProvider: vi.fn(),
}));

vi.mock('@logora/debate/dialog/modal', () => ({
    useModal: vi.fn(),
}));

vi.mock('@logora/debate/data/config_provider', () => ({
    useConfig: vi.fn(),
}));

vi.mock('./OnboardingModal', () => ({
    OnboardingModal: () => null,
}));

const TestComponent = () => {
    useOnboarding();
    return null;
};

describe('useOnboarding', () => {
    const showModal = vi.fn();
    const update = vi.fn();
    const setCurrentUser = vi.fn((user) => {
        currentUser = user;
    });
    let currentUser;

    beforeEach(() => {
        currentUser = {
            slug: 'user-slug',
            first_name: 'Jane',
            last_name: 'Doe',
            is_onboarded: false,
        };
        window.sessionStorage.clear();
        vi.clearAllMocks();
        useAuth.mockImplementation(() => ({
            currentUser,
            isLoggedIn: true,
            setCurrentUser,
        }));
        useModal.mockReturnValue({ showModal, isModalPresent: false });
        useConfig.mockReturnValue({
            shortname: 'test-app',
            auth: {
                showOnboarding: true,
                showOnboardingBeforeLogin: true,
            },
            provider: {},
        });
        useDataProvider.mockReturnValue({ update });
    });

    it('updates the user instead of showing onboarding when pre-login onboarding was completed', async () => {
        const updatedUser = { ...currentUser, is_onboarded: true };
        update.mockResolvedValue({
            data: {
                success: true,
                data: { resource: updatedUser },
            },
        });
        window.sessionStorage.setItem(
            getOnboardingBeforeLoginStorageKey('test-app'),
            JSON.stringify({ accepts_terms: true, accepts_provider_email: true })
        );

        render(<TestComponent />);

        await waitFor(() => expect(update).toHaveBeenCalledTimes(1));

        const formData = update.mock.calls[0][2];
        expect(update.mock.calls[0][0]).toBe('users');
        expect(update.mock.calls[0][1]).toBe('user-slug');
        expect(Object.fromEntries(formData.entries())).toEqual({
            accepts_terms: 'true',
            accepts_provider_email: 'true',
            is_onboarded: 'true',
        });
        await waitFor(() => expect(setCurrentUser).toHaveBeenCalledWith(updatedUser));
        expect(showModal).not.toHaveBeenCalled();
        expect(window.sessionStorage.getItem(getOnboardingBeforeLoginStorageKey('test-app'))).toBeNull();
    });

    it('forwards the chosen avatar (origin_image_url and uploaded image) to the account after login', async () => {
        const updatedUser = { ...currentUser, is_onboarded: true };
        update.mockResolvedValue({
            data: {
                success: true,
                data: { resource: updatedUser },
            },
        });
        window.sessionStorage.setItem(
            getOnboardingBeforeLoginStorageKey('test-app'),
            JSON.stringify({
                accepts_terms: true,
                origin_image_url: 'https://example.com/avatar.jpg',
                image: 'data:image/png;base64,AAAA',
            }),
        );

        render(<TestComponent />);

        await waitFor(() => expect(update).toHaveBeenCalledTimes(1));

        const formData = update.mock.calls[0][2];
        expect(formData.get('origin_image_url')).toBe('https://example.com/avatar.jpg');
        expect(formData.get('image')).toBeInstanceOf(Blob);
        await waitFor(() => expect(setCurrentUser).toHaveBeenCalledWith(updatedUser));
        expect(window.sessionStorage.getItem(getOnboardingBeforeLoginStorageKey('test-app'))).toBeNull();
    });

    it('shows the onboarding modal when no pre-login onboarding completion exists', async () => {
        render(<TestComponent />);

        await waitFor(() => expect(showModal).toHaveBeenCalledTimes(1));
        expect(update).not.toHaveBeenCalled();
    });

    it('falls back to the onboarding modal when applying pre-login onboarding fails', async () => {
        update.mockRejectedValue(new Error('Network error'));
        window.sessionStorage.setItem(
            getOnboardingBeforeLoginStorageKey('test-app'),
            JSON.stringify({ accepts_terms: true })
        );

        render(<TestComponent />);

        await waitFor(() => expect(update).toHaveBeenCalledTimes(1));
        await waitFor(() => expect(showModal).toHaveBeenCalledTimes(1));
    });

    it('ignores stored pre-login onboarding when showOnboardingBeforeLogin is disabled', async () => {
        useConfig.mockReturnValue({
            shortname: 'test-app',
            auth: {
                showOnboarding: true,
                showOnboardingBeforeLogin: false,
            },
            provider: {},
        });
        window.sessionStorage.setItem(
            getOnboardingBeforeLoginStorageKey('test-app'),
            JSON.stringify({ accepts_terms: true })
        );

        render(<TestComponent />);

        await waitFor(() => expect(showModal).toHaveBeenCalledTimes(1));
        expect(update).not.toHaveBeenCalled();
    });

    it('ignores stored pre-login onboarding when showOnboardingBeforeLogin is undefined', async () => {
        useConfig.mockReturnValue({
            shortname: 'test-app',
            auth: {
                showOnboarding: true,
            },
            provider: {},
        });
        window.sessionStorage.setItem(
            getOnboardingBeforeLoginStorageKey('test-app'),
            JSON.stringify({ accepts_terms: true })
        );

        render(<TestComponent />);

        await waitFor(() => expect(showModal).toHaveBeenCalledTimes(1));
        expect(update).not.toHaveBeenCalled();
    });

    it('does not show the onboarding modal or call update when the user is already onboarded', async () => {
        currentUser = { ...currentUser, is_onboarded: true };
        useAuth.mockImplementation(() => ({
            currentUser,
            isLoggedIn: true,
            setCurrentUser,
        }));
        window.sessionStorage.setItem(
            getOnboardingBeforeLoginStorageKey('test-app'),
            JSON.stringify({ accepts_terms: true })
        );

        render(<TestComponent />);

        await new Promise((resolve) => setTimeout(resolve, 20));
        expect(showModal).not.toHaveBeenCalled();
        expect(update).not.toHaveBeenCalled();
    });

    it('does not show the onboarding modal when showOnboarding is disabled, regardless of stored pre-login onboarding', async () => {
        useConfig.mockReturnValue({
            shortname: 'test-app',
            auth: {
                showOnboarding: false,
                showOnboardingBeforeLogin: false,
            },
            provider: {},
        });
        window.sessionStorage.setItem(
            getOnboardingBeforeLoginStorageKey('test-app'),
            JSON.stringify({ accepts_terms: true })
        );

        render(<TestComponent />);

        await new Promise((resolve) => setTimeout(resolve, 20));
        expect(showModal).not.toHaveBeenCalled();
        expect(update).not.toHaveBeenCalled();
    });
});
