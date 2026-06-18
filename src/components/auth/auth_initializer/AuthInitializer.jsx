import { AuthProviderFactory } from "@logora/debate/auth/providers";
import { authTokenHandler, useAuth, useAuthActions } from "@logora/debate/auth/use_auth";
import { useAuthInterceptor } from "@logora/debate/auth/use_auth";
import { httpClient } from "@logora/debate/data/axios_client";
import { useConfig } from "@logora/debate/data/config_provider";
import { useDataProvider } from "@logora/debate/data/data_provider";
import { OnboardingModal } from "@logora/debate/user/onboarding_modal";
import { useAuthRequired } from "@logora/debate/hooks/use_auth_required";
import React, { useState, useEffect } from "react";

export const AuthInitializer = ({ authUrl, authType, provider, assertion }) => {
	const tokenKey = "logora_user_token";
	const config = useConfig();
	const api = useDataProvider();
	useAuthInterceptor(httpClient, authUrl, tokenKey);

	const [showOnboardingModal, setShowOnboardingModal] = useState(false);

	const { getToken, removeToken } = authTokenHandler(
		httpClient,
		authUrl,
		tokenKey,
	);
	const { loginUser, logoutUser, fetchUser } = useAuthActions(
		httpClient,
		authUrl,
		tokenKey,
	);
	const requireAuthentication = useAuthRequired();
	const { setIsLoggingIn, currentUser } = useAuth();

	useEffect(() => {
		checkAuth();
	}, []);

	useEffect(() => {
		if (typeof window !== "undefined") {
			window.addEventListener("logora:authentication:require", requireAuthentication);
			return () => {
				window.removeEventListener("logora:authentication:require", requireAuthentication);
			};
		}
	}, []);

	const checkAuth = () => {
		const authProvider = getAuthProvider();
		const tokenObject = getToken();
		if (!!tokenObject) {
			const currentSessionId = tokenObject.session_id;
			if (authProvider.isSameUser(currentSessionId)) {
				fetchUser();
			} else {
				removeToken();
				initAuth(authProvider);
			}
		} else {
			initAuth(authProvider);
		}
	};

	const initAuth = (authProvider) => {
		if (authProvider.shouldInitAuth()) {
			const authParams = authProvider.getAuthorizationParams();
			if (authParams) {
				const isJWT = authType !== "social" && authType !== "oauth2_server";
				if (isJWT && config.auth?.showOnboardingBeforeLogin === true) {
					setShowOnboardingModal(true);
					return;
				}
				loginUser(authParams);
			}
		} else {
			logoutUser();
		}
	};

	const handleConsentConfirmed = async (formData) => {
		const authProvider = getAuthProvider();
		const authParams = authProvider.getAuthorizationParams();
		await loginUser(authParams);
		await api.update("users", currentUser.slug, formData);

		setShowOnboardingModal(false);
	};

	const getAuthProvider = () => {
		return AuthProviderFactory.create(authType, provider, assertion);
	};

	return (
		<>
			{showOnboardingModal && (
				<OnboardingModal
					pendingAuth={true}
					onConsentConfirmed={handleConsentConfirmed}
					showTerms={config.auth?.hideCgu !== true}
					showEmailConsent={config.auth?.showEmailConsent}
					termsUrl={
						config.provider?.cguUrl ||
						"https://www.logora.com/blog-posts/cgu"
					}
					privacyUrl={
						config.provider?.privacyUrl ||
						"https://www.logora.com/blog-posts/privacy-policy"
					}
				/>
			)}
		</>
	);
};
