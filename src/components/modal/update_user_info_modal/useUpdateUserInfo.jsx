import React, { useEffect, Suspense } from 'react';
import { useAuth } from '@logora/debate.auth.use_auth';
import { useModal } from '@logora/debate.dialog.modal';
import { useConfig } from '@logora/debate.data.config_provider';
import { UpdateUserInfoModal } from '@logora/debate.modal.update_user_info_modal';

export const useUpdateUserInfo = () => {
    const { currentUser, isLoggedIn } = useAuth();
    const { showModal } = useModal();
    const config = useConfig();

    useEffect(() => {
        if (isLoggedIn && currentUser.is_onboarded == false && config.auth.showOnboarding == true) {
            showUpdateUserInfoModal();
        }
    }, [currentUser, isLoggedIn])

    const showUpdateUserInfoModal = () => {
        showModal(
            <Suspense fallback={null}>
                <UpdateUserInfoModal 
                    showEmailConsent={config.auth?.showEmailConsent}
                    showTerms={config.auth?.hideCgu !== true}
                    termsUrl={config.provider?.cguUrl || "http://logora.fr/cgu"}
                    privacyUrl={config.provider?.privacyUrl || "http://logora.fr/privacy"}
                />
            </Suspense>
        );
    }

    return null;
}