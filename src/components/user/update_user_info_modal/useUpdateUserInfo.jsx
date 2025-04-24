import React, { useEffect } from "react";
import { useAuth } from "@logora/debate.auth.use_auth";
import { useModal } from "@logora/debate.dialog.modal";
import { useConfig } from "@logora/debate.data.config_provider";
import { UpdateUserInfoModal } from "./UpdateUserInfoModal";

export const useUpdateUserInfo = () => {
	const { currentUser, isLoggedIn } = useAuth();
	const { showModal } = useModal();
	const config = useConfig();

	useEffect(() => {
		if (
			isLoggedIn &&
			currentUser.is_onboarded === false &&
			config.auth?.showOnboarding === true
		) {
			showUpdateUserInfoModal();
		}
	}, [currentUser, isLoggedIn, config.auth.showOnboarding]);

	const showUpdateUserInfoModal = () => {
		showModal(
			<UpdateUserInfoModal
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

	return null;
};
