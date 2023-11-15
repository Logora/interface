import React from "react";
import { useIntl } from "react-intl";
import { useLocation } from "react-router";
import useSessionStorageState from '@rooks/use-sessionstorage-state';
import { Icon } from "@logora/debate.icons.icon";
import { Toggle } from "@logora/debate.input.toggle";
import { Button } from '@logora/debate.action.button';
import { FormattedMessage } from "react-intl";
import cx from "classnames";
import styles from "./SSOForm.module.scss";
import PropTypes from "prop-types";

export const SSOForm = ({ authType, providerName, loginUrl, signupUrl, termsUrl, logoUrl, clientId, oAuthRedirectUri, scope, redirectParameter = "logora_redirect", trackingParameter, trackingValue, hideActions = false, showEmailConsent = false, showTerms = false, error = false }) => {
	const [emailConsent, setEmailConsent] = useSessionStorageState("logora:emailConsent", false);
	const intl = useIntl();
	const location = useLocation();

	const getLinkWithRedirect = (url) => {
		if (typeof window !== "undefined") {
			let redirectUrl = url === "CURRENT_LOCATION" ? window.location.origin + location.pathname + location.hash + location.search : url;
			let parsedUrl = new URL(redirectUrl, window.location.origin);
			let params = parsedUrl.searchParams;
			let originalParams = new URLSearchParams(location.search);
			if (redirectParameter) {
				params.append(redirectParameter, window.location.origin + location.pathname + location.hash + location.search);
			}
			if (trackingParameter && trackingValue && originalParams.get("utm_campaign")) {
				const trackingId = trackingValue + originalParams.get("utm_campaign");
				params.append(trackingParameter, encodeURIComponent(trackingId));
			}
			parsedUrl.search = params.toString();
			return parsedUrl.toString();
		} else {
			return "";
		}
	}

	const getOAuthDialogUrl = (url) => {
		let baseUrl = new URL(url);
		baseUrl.searchParams.append("client_id", clientId);
		baseUrl.searchParams.append("redirect_uri", oAuthRedirectUri);
		baseUrl.searchParams.append("scope", scope);
		baseUrl.searchParams.append("response_type", "code");
		if(typeof window !== 'undefined') {
			baseUrl.searchParams.append("state", window.btoa(window.location.href));
		}
		
		return baseUrl.href;
	};

	const loginLink = authType == "oauth2_server" ? getOAuthDialogUrl(loginUrl) : getLinkWithRedirect(loginUrl);
	const signupLink = authType == "oauth2_server" ? getOAuthDialogUrl(signupUrl) : getLinkWithRedirect(signupUrl);

	return (
		<div className={styles.ssoForm}>
            <div className={styles.logo}>
				{ logoUrl ?
					<img height={50} width={50} className={styles.logoImage} src={logoUrl} alt={"Logo " + providerName} />
				:
					<Icon name="next" height={50} width={50} className={styles.loginIcon} />
				}
            </div>
            <div className={styles.mainText}>
				<div className={styles.title}>
					{ intl.formatMessage({ id: 'auth.sso_form.title', defaultMessage: "Debate now !" }, { provider: providerName }) }
					<br />
				</div>
				{ intl.formatMessage({ id: 'auth.sso_form.subtitle', defaultMessage: "Sign up right now and receive alerts by email." }) }
			</div>
			{ hideActions ? null :
				<>
					<Button
						data-tid={"link_signup"}
						data-testid={"signup-button"}
						className={styles.loginButton}
						to={signupLink}
						external
						border={false}
					>
						{ intl.formatMessage({ id: 'auth.sso_form.signup', defaultMessage: 'Sign up' }) }
					</Button>
					<div className={styles.cgu}>
						{ intl.formatMessage({ id: 'auth.sso_form.already_account', defaultMessage: "Already have an account ?" }) }
						<a
							className={styles.signupButton}
							role="link"
							data-testid={"signin-link"}
							data-tid={"link_login"}
							rel='nofollow'
							href={loginLink}
						>
							{ intl.formatMessage({ id: 'auth.sso_form.signin', defaultMessage: 'Sign in' }) }
						</a>
					</div>
					{ showEmailConsent ? (
						<div className={cx(styles.switchBox)}>
							<Toggle 
								type={"checkbox"} 
								name={"accepts_provider_email"} 
								role="input"
								style={{ fontSize: 18 }}
								checked={emailConsent} 
								label={ intl.formatMessage({ id: "auth.sso_form.consent_label", defaultMessage: "I agree to receive emails from the editor" }, { variable: providerName }) }
								onInputChanged={(e) => setEmailConsent(!emailConsent)} 
								data-testid={"accepts-email-input"}
							/>
						</div>
					) : null}
					{ error ? (
						<div className={styles.error}>
							{ intl.formatMessage({ id: "auth.sso_form.error", defaultMessage: "An error occurred during sign in. Please try again in a few moments." }) }
						</div>
					) : null}
					{ showTerms &&
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
	/** Custom parameter name to add to the auth URL */
	trackingParameter: PropTypes.string,
	/** Custom parameter value to add to the auth URL */
	trackingValue: PropTypes.string,
	/** If `true`, will only show header and subtitle */
	hideActions: PropTypes.bool,
	/** If `true`, will show a toggle for email consent */
	showEmailConsent: PropTypes.bool,
	/** If `true`, will show a toggle to accept terms */
	showTerms: PropTypes.bool,
	/** If `true`, will show an error */
	error: PropTypes.bool
}

SSOForm.defaultProps = {
	redirectParameter: "logora_redirect",
	hideActions: false,
	showEmailConsent: false,
	showTerms: false,
	error: false
}