import { AuthProviderFactory } from "@logora/debate/auth/providers";
import { authTokenHandler, useAuthActions } from "@logora/debate/auth/use_auth";
import { useAuthInterceptor } from "@logora/debate/auth/use_auth";
import { httpClient } from "@logora/debate/data/axios_client";
import { useConfig } from "@logora/debate/data/config_provider";
import { OnboardingModal, saveOnboardingBeforeLogin } from "@logora/debate/user/onboarding_modal";
import { useAuthRequired } from "@logora/debate/hooks/use_auth_required";
import React, { useState, useEffect } from "react";

const base64UrlDecode = (str) => {
	const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
	const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
	return atob(padded);
};

export const decodeJwtPayload = (token) => {
	if (!token || typeof token !== "string") {
		return null;
	}
	const parts = token.split(".");
	if (parts.length < 2) {
		return null;
	}
	try {
		return JSON.parse(base64UrlDecode(parts[1]));
	} catch (_error) {
		return null;
	}
};

const getDataFromPayload = (payload, mapping) => {
	if (!payload || typeof payload !== "object") {
		return {};
	}
	const mappingConfig = mapping || {};
	const get = (attr) => {
		const path = mappingConfig[attr];
		if (typeof path === "string" && path.length > 0) {
			return path.split(".").reduce((acc, key) => (acc == null ? acc : acc[key]), payload);
		}
		return payload[attr];
	};
	return {
		first_name: get("first_name"),
		last_name: get("last_name"),
		image_url: get("image_url"),
	};
};

export const AuthInitializer = ({ authUrl, authType, provider, assertion }) => {
	const tokenKey = "logora_user_token";
	const config = useConfig();
	useAuthInterceptor(httpClient, authUrl, tokenKey);

	const initialUserProfile = getDataFromPayload(
		decodeJwtPayload(assertion),
		config.auth?.userProfileMapping,
	);

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
					initialFirstName={initialUserProfile.first_name}
					initialLastName={initialUserProfile.last_name}
					initialImageUrl={initialUserProfile.image_url}
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
