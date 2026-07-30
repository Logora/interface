import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { useAuth } from '@logora/debate.auth.use_auth';
import { useDataProvider } from '@logora/debate.data.data_provider';
import { useModal } from '@logora/debate.dialog.modal';
import { useConfig } from '@logora/debate.data.config_provider';
import { getOnboardingBeforeLoginStorageKey, useUpdateUserInfo } from './useUpdateUserInfo';

jest.mock('@logora/debate.auth.use_auth', () => ({
    useAuth: jest.fn(),
}));

jest.mock('@logora/debate.data.data_provider', () => ({
    useDataProvider: jest.fn(),
}));

jest.mock('@logora/debate.dialog.modal', () => ({
    useModal: jest.fn(),
}));

jest.mock('@logora/debate.data.config_provider', () => ({
    useConfig: jest.fn(),
}));

jest.mock('./UpdateUserInfoModal', () => ({
    UpdateUserInfoModal: () => null,
}));

const TestComponent = () => {
    useUpdateUserInfo();
    return null;
};

describe('useUpdateUserInfo', () => {
    const showModal = jest.fn();
    const update = jest.fn();
    const setCurrentUser = jest.fn((user) => {
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
        jest.clearAllMocks();
        useAuth.mockImplementation(() => ({
            currentUser,
            isLoggedIn: true,
            setCurrentUser,
        }));
        useModal.mockReturnValue({ showModal });
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
});
