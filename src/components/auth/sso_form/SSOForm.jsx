import { Button } from "@logora/debate/action/button";
import { EMAIL_CONSENT_STORAGE_KEY } from "@logora/debate/auth/use_auth";
import { Icon } from "@logora/debate/icons/icon";
import { Toggle } from "@logora/debate/input/toggle";
import { useSessionStorageState } from "@logora/debate/hooks/use_session_storage_state";
import cx from "classnames";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import styles from "./SSOForm.module.scss";
import { useAuthLink } from "./useAuthLink";

export const SSOForm = ({
	authType,
	providerName,
	loginUrl,
	signupUrl,
	termsUrl,
	logoUrl,
	clientId,
	oAuthRedirectUri,
	scope,
	redirectParameter,
	trackingParameters = {},
	hideActions = false,
	hideLoginButton = false,
	showEmailConsent = false,
	showTerms = false,
	hideBelowButton = false,
	error = false,
}) => {
	const [emailConsent, setEmailConsent] = showEmailConsent
		? useSessionStorageState(EMAIL_CONSENT_STORAGE_KEY, false)
		: [false, () => {}];
	const intl = useIntl();

	const getAuthLink = useAuthLink({
		authType,
		clientId,
		oAuthRedirectUri,
		scope,
		redirectParameter,
		trackingParameters,
	});

	const loginLink = getAuthLink(loginUrl);
	const signupLink = getAuthLink(signupUrl);

	return (
		<div className={styles.ssoForm}>
			<div className={styles.logo}>
				{logoUrl ? (
					<img
						height={100}
						width={100}
						className={styles.logoImage}
						src={logoUrl}
						alt={`Logo ${providerName}`}
					/>
				) : (
					<Icon
						name="next"
						aria-hidden="true"
						height={50}
						width={50}
						className={styles.loginIcon}
					/>
				)}
			</div>
			<div className={styles.mainText}>
				<div className={styles.title}>
					{intl.formatMessage({
						id: "auth.sso_form.title",
						defaultMessage: "Debate now !",
					})}
					<br />
				</div>
				{intl.formatMessage(
					{
						id: "auth.sso_form.subtitle",
						defaultMessage: "Sign up right now and receive alerts by email.",
					},
					{ provider: providerName },
				)}
			</div>
			{hideActions ? null : (
				<>
					<Button
						data-tid={"link_signup"}
						data-testid={"signup-button"}
						className={styles.loginButton}
						to={signupLink}
						external
						border={false}
					>
						{intl.formatMessage({
							id: "auth.sso_form.signup",
							defaultMessage: "Sign up",
						})}
					</Button>
					{hideBelowButton ? null : (
						<>
							{hideLoginButton === true ? null : (
								<div className={styles.cgu}>
									{intl.formatMessage({
										id: "auth.sso_form.already_account",
										defaultMessage: "Already have an account ?",
									})}
									<a
										className={styles.signupButton}
										data-testid={"signin-link"}
										data-tid={"link_login"}
										rel="nofollow"
										href={loginLink}
									>
										{intl.formatMessage({
											id: "auth.sso_form.signin",
											defaultMessage: "Sign in",
										})}
									</a>
								</div>
							)}
							{showEmailConsent ? (
								<div className={cx(styles.switchBox)}>
									<Toggle
										type={"checkbox"}
										name={"accepts_provider_email"}
										style={{ fontSize: 18 }}
										checked={emailConsent}
										label={intl.formatMessage(
											{
												id: "auth.sso_form.consent_label",
												defaultMessage:
													"I agree to receive emails from the editor",
											},
											{ variable: providerName },
										)}
										onInputChanged={(_e) => setEmailConsent(!emailConsent)}
										data-testid={"accepts-email-input"}
									/>
								</div>
							) : null}
							{error ? (
								<div className={styles.error}>
									{intl.formatMessage({
										id: "auth.sso_form.error",
										defaultMessage:
											"An error occurred during sign in. Please try again in a few moments.",
									})}
								</div>
							) : null}
							{showTerms && (
								<>
									<div className={styles.cguButton}>
										<FormattedMessage
											id="auth.sso_form.terms"
											defaultMessage="By clicking on « Sign up », I declare that I have read the <var1> General Conditions of Use </var1> of the debate space and accept them"
											values={{
												var1: (chunks) => (
													<a
														className={styles.termsTarget}
														target="_blank"
														href={termsUrl}
														rel="noreferrer"
													>
														{chunks}
													</a>
												),
											}}
										/>
									</div>
									<div className={styles.cguButton}>
										<FormattedMessage
											id="auth.sso_form.data_terms"
											defaultMessage={
												"Your personal data are being processed by the Editor. For more information and to exercise your rights, see our personal data policy available on the site."
											}
										/>
									</div>
								</>
							)}
						</>
					)}
				</>
			)}
		</div>
	);
};
