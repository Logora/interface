import { useAuth } from "@logora/debate/auth/use_auth";
import { useConfig } from "@logora/debate/data/config_provider";
import { useDataProvider } from "@logora/debate/data/data_provider";
import { useModal } from "@logora/debate/dialog/modal";
import React, { useEffect, useState } from "react";
import { OnboardingModal } from "./OnboardingModal";

export const ONBOARDING_BEFORE_LOGIN_STORAGE_KEY = "logora:onboardingBeforeLogin";

export const getOnboardingBeforeLoginStorageKey = (shortname) => (
	shortname ? `${ONBOARDING_BEFORE_LOGIN_STORAGE_KEY}:${shortname}` : ONBOARDING_BEFORE_LOGIN_STORAGE_KEY
);

const dataUrlToBlob = (dataUrl) => {
	const [header, base64] = dataUrl.split(",");
	const mime = header.match(/^data:([^;]+)/)?.[1] || "application/octet-stream";
	const binary = atob(base64);
	const array = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) {
		array[i] = binary.charCodeAt(i);
	}
	return new Blob([array], { type: mime });
};

export const saveOnboardingBeforeLogin = (shortname, data) => {
	if (typeof window === "undefined" || !window.sessionStorage) {
		return;
	}

	window.sessionStorage.setItem(
		getOnboardingBeforeLoginStorageKey(shortname),
		JSON.stringify(data),
	);
};

export const useOnboarding = () => {
	const auth = useAuth();
	const { currentUser, isLoggedIn } = auth;
	const { showModal, isModalPresent } = useModal();
	const api = useDataProvider();
	const config = useConfig();
	const [isApplyingBeforeLoginOnboarding, setIsApplyingBeforeLoginOnboarding] = useState(false);
	const [didApplyBeforeLoginOnboarding, setDidApplyBeforeLoginOnboarding] = useState(false);

	const showOnboardingModal = () => {
		showModal(
			<OnboardingModal
				showEmailConsent={config.auth?.showEmailConsent}
				showTerms={config.auth?.hideCgu !== true}
				termsUrl={
					config.provider?.cguUrl || "https://www.logora.com/blog-posts/cgu"
				}
				privacyUrl={
					config.provider?.privacyUrl ||
					"https://www.logora.com/blog-posts/privacy-policy"
				}
			/>,
		);
	};

	useEffect(() => {
		if (isApplyingBeforeLoginOnboarding) {
			return;
		}

		if (
			!isModalPresent &&
			isLoggedIn &&
			currentUser?.is_onboarded === false &&
			config.auth?.showOnboarding === true
		) {
			if (shouldApplyBeforeLoginOnboarding()) {
				applyBeforeLoginOnboarding();
				return;
			}
			showOnboardingModal();
		}
	}, [isModalPresent, isLoggedIn, currentUser?.slug, currentUser?.is_onboarded, config.auth?.showOnboarding, isApplyingBeforeLoginOnboarding, didApplyBeforeLoginOnboarding]);

	const getBeforeLoginOnboarding = () => {
		if (typeof window === "undefined" || !window.sessionStorage) {
			return null;
		}

		const rawValue = window.sessionStorage.getItem(getOnboardingBeforeLoginStorageKey(config.shortname)) || window.sessionStorage.getItem(ONBOARDING_BEFORE_LOGIN_STORAGE_KEY);

		if (!rawValue) {
			return null;
		}

		try {
			const parsedValue = JSON.parse(rawValue);
			return parsedValue && typeof parsedValue === "object" ? parsedValue : { accepts_terms: true };
		} catch (_error) {
			return { accepts_terms: rawValue === "true" };
		}
	};

	const clearBeforeLoginOnboarding = () => {
		if (typeof window === "undefined" || !window.sessionStorage) {
			return;
		}

		window.sessionStorage.removeItem(getOnboardingBeforeLoginStorageKey(config.shortname));
		window.sessionStorage.removeItem(ONBOARDING_BEFORE_LOGIN_STORAGE_KEY);
	};

	const shouldApplyBeforeLoginOnboarding = () => {
		if (isApplyingBeforeLoginOnboarding || didApplyBeforeLoginOnboarding || config.auth?.showOnboardingBeforeLogin !== true || !currentUser?.slug) {
			return false;
		}

		const beforeLoginOnboarding = getBeforeLoginOnboarding();
		return beforeLoginOnboarding?.accepts_terms === true || beforeLoginOnboarding?.acceptsTerms === true;
	};

	const applyBeforeLoginOnboarding = () => {
		const beforeLoginOnboarding = getBeforeLoginOnboarding();
		if (!beforeLoginOnboarding) {
			return;
		}

		const data = {
			accepts_terms: true,
			is_onboarded: true,
		};

		if (beforeLoginOnboarding.accepts_provider_email !== undefined) {
			data.accepts_provider_email = beforeLoginOnboarding.accepts_provider_email;
		} else if (beforeLoginOnboarding.acceptsProviderEmail !== undefined) {
			data.accepts_provider_email = beforeLoginOnboarding.acceptsProviderEmail;
		}

		if (beforeLoginOnboarding.first_name && !currentUser.first_name) {
			data.first_name = beforeLoginOnboarding.first_name;
		}

		if (beforeLoginOnboarding.last_name && !currentUser.last_name) {
			data.last_name = beforeLoginOnboarding.last_name;
		}

		if (beforeLoginOnboarding.origin_image_url) {
			data.origin_image_url = beforeLoginOnboarding.origin_image_url;
		}

		if (beforeLoginOnboarding.image && typeof beforeLoginOnboarding.image === "string") {
			data.image = dataUrlToBlob(beforeLoginOnboarding.image);
		}

		const formData = new FormData();
		Object.entries(data).forEach(([key, value]) => {
			if (key === "image" && value instanceof Blob) {
				formData.append(key, value, "avatar.png");
			} else {
				formData.append(key, value);
			}
		});

		setIsApplyingBeforeLoginOnboarding(true);
		setDidApplyBeforeLoginOnboarding(true);
		api.update("users", currentUser.slug, formData).then((response) => {
			setIsApplyingBeforeLoginOnboarding(false);
			if (response.data.success) {
				clearBeforeLoginOnboarding();
				auth.setCurrentUser(response.data.data.resource);
			} else {
				clearBeforeLoginOnboarding();
			}
		}).catch(() => {
			clearBeforeLoginOnboarding();
			setIsApplyingBeforeLoginOnboarding(false);
		});
	};

	return null;
};
