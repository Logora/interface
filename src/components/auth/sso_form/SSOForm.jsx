import React from "react";
import { useIntl, FormattedMessage } from "react-intl";
import { useLocation } from "react-router";
import useSessionStorageState from '@rooks/use-sessionstorage-state';
import { Icon } from "@logora/debate.icons.icon";
import { Toggle } from "@logora/debate.input.toggle";
import { Button } from '@logora/debate.action.button';
import cx from "classnames";
import styles from "./SSOForm.module.scss";
import PropTypes from "prop-types";

export const EMAIL_CONSENT_STORAGE_KEY = "logora:emailConsent";

export const SSOForm = ({authType, providerName, loginUrl, signupUrl, termsUrl, logoUrl, clientId, oAuthRedirectUri, scope, redirectParameter = "logora_redirect", trackingParameters = {}, hideActions = false, showEmailConsent = false, showTerms = false, error = false }) => {
	const [emailConsent, setEmailConsent] = showEmailConsent ? useSessionStorageState(EMAIL_CONSENT_STORAGE_KEY, false) : [false, () => {}];
	const intl = useIntl();
	const location = useLocation();

	const getLinkWithRedirect = (url) => {
		if (typeof window !== "undefined") {
			let redirectUrl = url === "CURRENT_LOCATION" ? window.location : url;
			let parsedUrl = new URL(redirectUrl, window.location.origin);
			let params = parsedUrl.searchParams;
			let originalParams = new URLSearchParams(location.search);

			if (params.has('code')) {
				params.delete('code');
			}

			if (redirectParameter) {
				params.append(redirectParameter, window.location.toString());
			}
			for (let [key, value] of Object.entries(trackingParameters)) {
				let parsedValue = value
				if (parsedValue) {
					const currentPath = location.pathname.slice(0, location.pathname.lastIndexOf('/'))
					parsedValue = parsedValue.replace("{{UTM_CAMPAIGN}}", originalParams.get("utm_campaign"));
					parsedValue = parsedValue.replace("{{CURRENT_PATH}}", decodeURIComponent(currentPath))
				}
				params.append(key, encodeURIComponent(parsedValue));
			}
			parsedUrl.search = params.toString();
			return parsedUrl.toString();
		}
		return "";
	}

	const getOAuthDialogUrl = (url) => {
		let baseUrl = new URL(url);
		baseUrl.searchParams.delete("code");
		baseUrl.searchParams.append("client_id", clientId);
		baseUrl.searchParams.append("redirect_uri", oAuthRedirectUri);
		baseUrl.searchParams.append("scope", scope);
		baseUrl.searchParams.append("response_type", "code");
		if (typeof window !== 'undefined') {
			let parsedUrl = new URL(window.location.href);
			parsedUrl.searchParams.delete("code");
			baseUrl.searchParams.append("state", window.btoa(parsedUrl.toString()));
		}

		return baseUrl.href;
	}

	const getAuthLink = (url) => {
		if (authType === "oauth2_server") {
			return getOAuthDialogUrl(url)
		} else {
			return getLinkWithRedirect(url)
		}
	}

	const loginLink = getAuthLink(loginUrl);
	const signupLink = getAuthLink(signupUrl);

	return (
		<div className={styles.ssoForm}>
			<div className={styles.logo}>
				{logoUrl ?
					<img height={100} width={100} className={styles.logoImage} src={logoUrl} alt={"Logo " + providerName} />
					:
					<Icon name="next" height={50} width={50} className={styles.loginIcon} />
				}
			</div>
			<div className={styles.mainText}>
				<div className={styles.title}>
					{intl.formatMessage({ id: 'auth.sso_form.title', defaultMessage: "Debate now !" })}
					<br />
				</div>
				{intl.formatMessage({ id: 'auth.sso_form.subtitle', defaultMessage: "Sign up right now and receive alerts by email." }, { provider: providerName })}
			</div>
			{hideActions ? null :
				<>
					<Button
						data-tid={"link_signup"}
						data-testid={"signup-button"}
						className={styles.loginButton}
						to={signupLink}
						external
						border={false}
					>
						{intl.formatMessage({ id: 'auth.sso_form.signup', defaultMessage: 'Sign up' })}
					</Button>
					<div className={styles.cgu}>
						{intl.formatMessage({ id: 'auth.sso_form.already_account', defaultMessage: "Already have an account ?" })}
						<a
							className={styles.signupButton}
							role="link"
							data-testid={"signin-link"}
							data-tid={"link_login"}
							rel='nofollow'
							href={loginLink}
						>
							{intl.formatMessage({ id: 'auth.sso_form.signin', defaultMessage: 'Sign in' })}
						</a>
					</div>
					{showEmailConsent ? (
						<div className={cx(styles.switchBox)}>
							<Toggle
								type={"checkbox"}
								name={"accepts_provider_email"}
								role="input"
								style={{ fontSize: 18 }}
								checked={emailConsent}
								label={intl.formatMessage({ id: "auth.sso_form.consent_label", defaultMessage: "I agree to receive emails from the editor" }, { variable: providerName })}
								onInputChanged={(e) => setEmailConsent(!emailConsent)}
								data-testid={"accepts-email-input"}
							/>
						</div>
					) : null}
					{error ? (
						<div className={styles.error}>
							{intl.formatMessage({ id: "auth.sso_form.error", defaultMessage: "An error occurred during sign in. Please try again in a few moments." })}
						</div>
					) : null}
					{showTerms &&
						<>
							<div className={styles.cguButton}>
								<FormattedMessage
									id='auth.sso_form.terms'
									defaultMessage="By clicking on « Sign up », I declare that I have read the <var1> General Conditions of Use </var1> of the debate space and accept them"
									values={{
										var1: (chunks) => (
											<a className={styles.termsTarget} target='_blank' href={termsUrl}>
												{chunks}
											</a>
										),
									}}
								/>
							</div>
							<div className={styles.cguButton}>
								<FormattedMessage id='auth.sso_form.data_terms' defaultMessage={"Your personal data are being processed by the Editor. For more information and to exercise your rights, see our personal data policy available on the site."} />
							</div>
						</>
					}
				</>
			}
		</div>
	);
}

SSOForm.propTypes = {
	/** Authentication type */
	authType: PropTypes.string,
	/** Name of the provider / website */
	providerName: PropTypes.string,
	/** URL of the login page */
	loginUrl: PropTypes.string,
	/** URL to the signup page */
	signupUrl: PropTypes.string,
	/** URL of the logo displayed on top of the form. If not passed, an icon is shown */
	logoUrl: PropTypes.string,
	/** URL to the terms page */
	termsUrl: PropTypes.string,
	/** OAuth2 client ID */
	clientId: PropTypes.string,
	/** OAuth2 redirect URI */
	oAuthRedirectUri: PropTypes.string,
	/** OAuth2 scope */
	scope: PropTypes.string,
	/** Name of the parameter passed in the URL that will contain the current page URL to redirect after authentication */
	redirectParameter: PropTypes.string,
	/** Custom hash of parameters to add to the auth URL */
	trackingParameters: PropTypes.object,
	/** If `true`, will only show header and subtitle */
	hideActions: PropTypes.bool,
	/** If `true`, will show a toggle for email consent */
	showEmailConsent: PropTypes.bool,
	/** If `true`, will show a toggle to accept terms */
	showTerms: PropTypes.bool,
	/** If `true`, will show an error */
	error: PropTypes.bool
}
