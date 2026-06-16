import { useAuth } from "@logora/debate/auth/use_auth";
import { useConfig } from "@logora/debate/data/config_provider";
import { useModal } from "@logora/debate/dialog/modal";
import React, { useEffect } from "react";
import { OnboardingModal } from "./OnboardingModal";

export const useOnboarding = () => {
	const { currentUser, isLoggedIn } = useAuth();
	const { showModal, isModalPresent } = useModal();
	const config = useConfig();

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
		if (
			!isModalPresent &&
			isLoggedIn &&
			currentUser.is_onboarded === false &&
			config.auth?.showOnboarding === true
		) {
			showOnboardingModal();
		}
	}, [isModalPresent, isLoggedIn, config.auth?.showOnboarding]);

	return null;
};