import React, { useEffect, Suspense, useState } from 'react';
import { useAuth } from '@logora/debate.auth.use_auth';
import { useModal } from '@logora/debate.dialog.modal';
import { useConfig } from '@logora/debate.data.config_provider';
import { useDataProvider } from '@logora/debate.data.data_provider';
import { UpdateUserInfoModal } from './UpdateUserInfoModal';

export const ONBOARDING_BEFORE_LOGIN_STORAGE_KEY = "logora:onboardingBeforeLogin";

export const getOnboardingBeforeLoginStorageKey = (shortname) => (
    shortname ? `${ONBOARDING_BEFORE_LOGIN_STORAGE_KEY}:${shortname}` : ONBOARDING_BEFORE_LOGIN_STORAGE_KEY
);

export const useUpdateUserInfo = () => {
    const auth = useAuth();
    const { currentUser, isLoggedIn } = auth;
    const { showModal } = useModal();
    const api = useDataProvider();
    const config = useConfig();
    const [isApplyingBeforeLoginOnboarding, setIsApplyingBeforeLoginOnboarding] = useState(false);
    const [didApplyBeforeLoginOnboarding, setDidApplyBeforeLoginOnboarding] = useState(false);

    useEffect(() => {
        if (isApplyingBeforeLoginOnboarding) {
            return;
        }

        if (isLoggedIn && currentUser.is_onboarded == false && config.auth?.showOnboarding == true) {
            if (shouldApplyBeforeLoginOnboarding()) {
                applyBeforeLoginOnboarding();
                return;
            }
            showUpdateUserInfoModal();
        }
    }, [currentUser, isLoggedIn, isApplyingBeforeLoginOnboarding, didApplyBeforeLoginOnboarding])

    const getBeforeLoginOnboarding = () => {
        if (typeof window === "undefined" || !window.sessionStorage) {
            return null;
        }

        const storageKey = getOnboardingBeforeLoginStorageKey(config.shortname);
        const rawValue = window.sessionStorage.getItem(storageKey) || window.sessionStorage.getItem(ONBOARDING_BEFORE_LOGIN_STORAGE_KEY);

        if (!rawValue) {
            return null;
        }

        try {
            const parsedValue = JSON.parse(rawValue);
            return parsedValue && typeof parsedValue === "object" ? parsedValue : { accepts_terms: true };
        } catch (_error) {
            return { accepts_terms: rawValue === "true" };
        }
    }

    const clearBeforeLoginOnboarding = () => {
        if (typeof window === "undefined" || !window.sessionStorage) {
            return;
        }

        window.sessionStorage.removeItem(getOnboardingBeforeLoginStorageKey(config.shortname));
        window.sessionStorage.removeItem(ONBOARDING_BEFORE_LOGIN_STORAGE_KEY);
    }

    const shouldApplyBeforeLoginOnboarding = () => {
        if (isApplyingBeforeLoginOnboarding || didApplyBeforeLoginOnboarding || config.auth?.showOnboardingBeforeLogin !== true || !currentUser.slug) {
            return false;
        }

        const beforeLoginOnboarding = getBeforeLoginOnboarding();
        return beforeLoginOnboarding?.accepts_terms === true || beforeLoginOnboarding?.acceptsTerms === true;
    }

    const applyBeforeLoginOnboarding = () => {
        const beforeLoginOnboarding = getBeforeLoginOnboarding();
        const data = {
            accepts_terms: true,
            is_onboarded: true
        };

        if (beforeLoginOnboarding.accepts_provider_email !== undefined) {
            data["accepts_provider_email"] = beforeLoginOnboarding.accepts_provider_email;
        } else if (beforeLoginOnboarding.acceptsProviderEmail !== undefined) {
            data["accepts_provider_email"] = beforeLoginOnboarding.acceptsProviderEmail;
        }

        if (beforeLoginOnboarding.first_name && !currentUser.first_name) {
            data["first_name"] = beforeLoginOnboarding.first_name;
        }

        if (beforeLoginOnboarding.last_name && !currentUser.last_name) {
            data["last_name"] = beforeLoginOnboarding.last_name;
        }

        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        })

        setIsApplyingBeforeLoginOnboarding(true);
        setDidApplyBeforeLoginOnboarding(true);
        api.update("users", currentUser.slug, formData).then(response => {
            setIsApplyingBeforeLoginOnboarding(false);
            if(response.data.success) {
                clearBeforeLoginOnboarding();
                auth.setCurrentUser(response.data.data.resource);
            }
        }).catch(() => {
            setIsApplyingBeforeLoginOnboarding(false);
        });
    }

    const showUpdateUserInfoModal = () => {
        showModal(
            <Suspense fallback={null}>
                <UpdateUserInfoModal 
                    showEmailConsent={config.auth?.showEmailConsent}
                    showTerms={config.auth?.hideCgu !== true}
                    termsUrl={config.provider?.cguUrl || "https://www.logora.com/blog-posts/cgu"}
                    privacyUrl={config.provider?.privacyUrl || "https://www.logora.com/blog-posts/privacy-policy"}
                />
            </Suspense>
        );
    }

    return null;
}
