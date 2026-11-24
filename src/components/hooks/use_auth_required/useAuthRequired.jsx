import { useAuth } from "@logora/debate/auth/use_auth";
import { ConfigContext } from "@logora/debate/data/config_provider";
import { useModal } from "@logora/debate/dialog/modal";
import React, { createContext, useContext, lazy, Suspense } from "react";
const AuthModal = lazy(() => import("@logora/debate/auth/auth_modal").then(m => ({ default: m.AuthModal })));
const SubscriptionModal = lazy(() => import("@logora/debate/auth/subscription_modal").then(m => ({ default: m.SubscriptionModal })));

export const ModuleContext = createContext(null);

export const useSubscriptionRequired = () => {
	const { config } = useContext(ConfigContext);
	const module = useContext(ModuleContext);
	const { isLoggedIn, currentUser } = useAuth() || {};

	return Boolean(
		isLoggedIn &&
			module &&
			config?.[module]?.subscribersOnly === true &&
			currentUser?.is_subscriber !== true,
	);
};

export const useAuthRequired = () => {
	const { config } = useContext(ConfigContext);
	const module = useContext(ModuleContext);
	const subscriptionRequired = useSubscriptionRequired();
	const { showModal } = useModal();
	const moduleConfig = module ? config?.[module] : null;

	const requireAuthentication = (modalParams = {}) => {
		if (subscriptionRequired) {
			showModal(
				<Suspense fallback={null}>
					<SubscriptionModal {...moduleConfig?.subscriptionModal} />
				</Suspense>,
			);
			return;
		}
		if (typeof window !== "undefined") {
			window.dispatchEvent(
				new CustomEvent("LOGORA::authenticationRequired", {
					detail: { redirectUrl: window.location.href },
				}),
			);
			window.dispatchEvent(
				new CustomEvent("logora:authentication:requested", {
					detail: { redirectUrl: window.location.href },
				}),
			);
		}
		if (config?.auth?.disableLoginModal === true) {
			return;
		}
		showModal(
			<Suspense fallback={null}>
				<AuthModal {...modalParams} />
			</Suspense>,
		);
	};

	return requireAuthentication;
};
