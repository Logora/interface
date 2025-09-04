import React, { useContext, lazy, Suspense } from 'react';
import { ConfigContext } from '@logora/debate.data.config_provider';
import { useModal } from '@logora/debate.dialog.modal';
const AuthModal = lazy(() => import('@logora/debate.auth.auth_modal'));

export const useAuthRequired = () => {
    const { config } = useContext(ConfigContext);
    const { showModal } = useModal();

    const requireAuthentication = (modalParams = {}) => {
        if (typeof window !== 'undefined') {
            window.dispatchEvent(
                new CustomEvent("LOGORA::authenticationRequired", { detail: { redirectUrl: window.location.href } })
            );
            window.dispatchEvent(
                new CustomEvent("logora:authentication:requested", {
                    detail: { redirectUrl: window.location.href }
                })
            );
        }
        if (config?.auth?.disableLoginModal === true) {
            return;
        }
        showModal(<Suspense fallback={null}><AuthModal {...modalParams} /></Suspense>);
    }

    return requireAuthentication;
}