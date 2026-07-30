import { AuthProviderFactory } from "@logora/debate/auth/providers";
import { authTokenHandler, useAuthActions } from "@logora/debate/auth/use_auth";
import { useAuthInterceptor } from "@logora/debate/auth/use_auth";
import { httpClient } from "@logora/debate/data/axios_client";
import { useConfig } from "@logora/debate/data/config_provider";
import { OnboardingModal, saveOnboardingBeforeLogin } from "@logora/debate/user/onboarding_modal";
import { useAuthRequired } from "@logora/debate/hooks/use_auth_required";
import React, { useState, useEffect } from "react";

export const AuthInitializer = ({ authUrl, authType, provider, assertion }) => {
	const tokenKey = "logora_user_token";
	const config = useConfig();
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

	useEffect(() => {
		checkAuth();
	}, []);

	useEffect(() => {
		if (typeof window !== "undefined") {
			window.addEventListener("logora:authentication:require", requireAuthentication);
			window.addEventListener("logora:authentication:refresh", checkAuth);
			return () => {
				window.removeEventListener("logora:authentication:require", requireAuthentication);
				window.removeEventListener("logora:authentication:refresh", checkAuth);
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

	const handleConsentConfirmed = (_formData, data) => {
		const authProvider = getAuthProvider();
		const authParams = authProvider.getAuthorizationParams();
		saveOnboardingBeforeLogin(config.shortname, data);
		setShowOnboardingModal(false);
		loginUser(authParams);
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
