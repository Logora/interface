import React, { useState, useEffect } from "react";
import { useConfig } from '@logora/debate.data.config_provider';
import { Modal, useModal } from '@logora/debate.dialog.modal';
import { useAuth, useAuthActions } from "@logora/debate.auth.use_auth";
import { httpClient } from '@logora/debate.data.axios_client';
import AuthProviderFactory from '@logora/debate.auth.providers';
import { SocialAuthForm } from '@logora/debate.auth.social_auth_form';
import { SSOForm } from '@logora/debate.auth.sso_form';
import { Loader } from '@logora/debate.progress.loader';
import styles from "./AuthModal.module.scss";
import PropTypes from "prop-types";

export const AuthModal = ({ onHideModal = null }) => {
	const config = useConfig();
	const { hideModal } = useModal();
	const { isLoggedIn, authError } = useAuth();
	const [initAuth, setInitAuth] = useState(false);
	const [method, setMethod] = useState(null);
    const { loginUser } = useAuthActions(httpClient, process.env.API_AUTH_URL, 'logora_user_token');

	useEffect(() => {
		if (isLoggedIn) { 
			hideAuthModal(); 
		}
	}, [isLoggedIn])

	useEffect(() => {
		if (method && authError) { 
			setInitAuth(false); 
		}
	}, [method, authError])

	const hideAuthModal = () => {
		hideModal();
		if (onHideModal) {
			onHideModal();
		}
	};

	const handleAssertion = (assertion, socialProvider, method) => {
		setMethod(method);
		setInitAuth(true);
		
		authenticate(assertion, socialProvider);
	};

	const authenticate = (assertion, socialProvider) => {
		const authProvider = AuthProviderFactory.create(config.auth?.type, config.shortname, assertion, socialProvider);
		const authParams = authProvider.getAuthorizationParams();
		loginUser(authParams);
	}

	return (
		<Modal data-vid={"login_modal"}>
			<div className={styles.loginModalBody}>
				{initAuth ? (
						<Loader />
					) : (
						<>
							{config.auth.type === "form" || config.auth.type === "social" ? (
								<SocialAuthForm
									onSubmit={handleAssertion}
									error={authError}
									lastStep={method}
									facebookClientId={process.env.FACEBOOK_CLIENT_ID}
									googleClientId={process.env.GOOGLE_CLIENT_ID}
									oAuthRedirectUri={process.env.OAUTH_REDIRECT_URI} 
									logoUrl={config.logo?.desktop}
									providerName={config.provider?.companyName}
									forgotPasswordUrl={`https://admin.logora.fr/?application=${config.shortname}#/forgot_password`}
									termsUrl={config.provider?.cguUrl || "https://www.logora.com/blog-posts/cgu"}
									privacyUrl={config.provider?.privacyUrl || "https://www.logora.com/blog-posts/privacy-policy"}
								/>
							) : (
								<SSOForm 
									authType={config.auth.type}
									error={authError && method === "OAUTH2"}
									oAuthRedirectUri={process.env.OAUTH_REDIRECT_URI}
									clientId={config.auth.clientId}
									scope={config.auth.scope}
									logoUrl={config.logo?.desktop}
									loginUrl={config.auth.login_url}
									signupUrl={config.auth.registration_url || config.auth.login_url}
									termsUrl={config.provider?.cguUrl || "https://www.logora.com/blog-posts/cgu"}
									redirectParameter={config.auth.redirectParameter}
									trackingParameters={config.auth.trackingParameters}
									providerName={config.provider?.companyName}
									hideActions={config.auth.hideModalActions}
									showEmailConsent={config.auth.showEmailConsent}
									showTerms={config.auth.hideCgu !== true}
								/>
							)}
						</>
					)}
			</div>
		</Modal>
	);
}

AuthModal.propTypes = {
	/** Callback when modal is closed */
	onHideModal: PropTypes.func
};
