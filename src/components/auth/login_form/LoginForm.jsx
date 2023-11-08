import React, { useState } from "react";
import { useIntl } from "react-intl";
import { useLocation } from 'react-router-dom';
import { Button } from '@logora/debate.action.button';
import { TextInput } from '@logora/debate.input.text_input';
import styles from "./LoginForm.module.scss";
import cx from "classnames";
import PropTypes from "prop-types";

export const LoginForm = ({ onSubmit, forgotPasswordUrl, error = false }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const intl = useIntl();
	const location = useLocation();

	const handleSubmit = (event) => {
		event.preventDefault();
		if(onSubmit) {
			onSubmit(email, password);
		}
	};

	const getUrlWithRedirect = () => {
		let baseUrl = new URL(forgotPasswordUrl);
		baseUrl.searchParams.append("redirect_url", encodeURIComponent(window.location.origin + location.pathname + location.hash + location.search));
		return baseUrl.href;
	};

	return (
		<form onSubmit={handleSubmit} className={styles.loginForm}>
			<div className={styles.formGroup}>
				<TextInput
					type={"email"}
					name={"email"}
					role={"input"}
					required
					placeholder={intl.formatMessage({ id: "auth.login_form.email_placeholder", defaultMessage: "Email" })}
					onChange={(e) => setEmail(e.target.value)}
					error={error}
					data-testid={"email-input"}
				/>
			</div>
			<div className={styles.formGroup}>
				<TextInput
					type={"password"}
					name={"password"}
					role={"input"}
					required
					placeholder={intl.formatMessage({ id: "auth.login_form.password_placeholder", defaultMessage: "Password" })}
					onChange={(e) => setPassword(e.target.value)}
					error={error}
					message={error && intl.formatMessage({ id: "auth.login_form.error", defaultMessage: "An error occurred while signing in, please try again" })}
					data-testid={"password-input"}
				/>
			</div>
			{ forgotPasswordUrl &&
				<a href={getUrlWithRedirect()} target='_blank' role="link" className={styles.forgotPassword}>
					{ intl.formatMessage({ id: "auth.login_form.forgot_password", defaultMessage: "Forgot password ?" }) }
				</a>
			}
			<div className={cx(styles.formSubmitGroup)}>
				<Button className={styles.formSubmitButton} type='submit' role="button" handleClick={() => null}>
					{ intl.formatMessage({ id: "auth.login_form.sign_in", defaultMessage: "Sign in" }) }
				</Button>
			</div>
		</form>
	);
}

LoginForm.propTypes = {
	/** Callback triggered when form is submitted */
	onSubmit: PropTypes.func,
	/** URL for the forgot password page */
	forgotPasswordUrl: PropTypes.string,
	/** If `true`, will show an error message */
	error: PropTypes.bool
}

LoginForm.defaultProps = {
	error: false
}