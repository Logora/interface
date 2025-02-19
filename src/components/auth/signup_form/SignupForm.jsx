import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { Button } from '@logora/debate.action.button';
import { TextInput } from '@logora/debate.input.text_input';
import { Toggle } from "@logora/debate.input.toggle";
import cx from 'classnames';
import styles from './SignupForm.module.scss';
import PropTypes from "prop-types";

export const SignupForm = ({ onSubmit, providerName, error = false }) => {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [acceptsProviderEmail, setAcceptsProviderEmail] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const intl = useIntl();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validatePassword(password, confirmPassword)) {
            if (onSubmit) {
                onSubmit(firstName, lastName, email, password, confirmPassword, acceptsProviderEmail);
            }
        }
    }

    const validatePassword = (password, confirmPassword) => {
        if (password === confirmPassword) { 
            return true 
        }
        setPasswordError(intl.formatMessage({ id: "auth.signup_form.password_error", defaultMessage: "Password and confirmation are not matching." }))
        return false
    }

    return (
        <>
            <form onSubmit={handleSubmit} className={styles.signUpForm}>
                <div className={styles.formGroup}>
                    <TextInput 
                        type={"text"} 
                        name={"first_name"} 
                        role="input"
                        placeholder={intl.formatMessage({ id:"auth.signup_form.first_name_placeholder", defaultMessage: "First name" })} 
                        onChange={(e) => setFirstName(e.target.value)}
                        error={error}
                        required
                        data-testid={"first-name-input"}
                    />
                </div>
                <div className={styles.formGroup}>
                    <TextInput 
                        type={"text"} 
                        name={"last_name"}
                        role="input"
                        placeholder={intl.formatMessage({ id:"auth.signup_form.last_name_placeholder", defaultMessage: "Last name" })}
                        error={error}
                        onChange={(e) => setLastName(e.target.value)}
                        data-testid={"last-name-input"}
                    />
                </div>
                <div className={styles.formGroup}>
                    <TextInput 
                        type={"email"} 
                        name={"email"} 
                        role="input"
                        placeholder={intl.formatMessage({ id:"auth.signup_form.email_placeholder", defaultMessage: "Email" }) } 
                        error={error}
                        required
                        onChange={(e) => setEmail(e.target.value)} 
                        data-testid={"email-input"}
                    />
                </div>
                <div className={styles.formGroup}>
                    <TextInput 
                        type={"password"} 
                        name={"password"} 
                        role="input"
                        placeholder={intl.formatMessage({ id:"auth.signup_form.password_placeholder", defaultMessage: "Password"}) }
                        error={error || passwordError} 
                        message={passwordError && passwordError}
                        required
                        onChange={(e) => setPassword(e.target.value)} 
                        data-testid={"password-input"}
                    />
                </div>
                <div className={styles.formGroup}>
                    <TextInput 
                        type={"password"} 
                        name={"password_confirmation"} 
                        role="input"
                        placeholder={intl.formatMessage({ id:"auth.signup_form.password_confirmation_placeholder", defaultMessage: "Confirm password" })}
                        error={error || passwordError} 
                        required
                        message={error ? 
                                        intl.formatMessage({ id:"auth.signup.form_error", defaultMessage: "An error occurred while signing up. Please check your input and try again." })
                                : passwordError ?
                                        passwordError
                                : null}
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        data-testid={"password-confirmation-input"}
                    />
                </div>
                <div className={styles.formGroup}>
                    <Toggle 
                        type={"checkbox"} 
                        name={"accepts_provider_email"} 
                        role="input"
                        style={{ fontSize: 18 }}
                        checked={acceptsProviderEmail} 
                        label={intl.formatMessage({ id:"auth.signup_form.accepts_email_label", defaultMessage: "I agree to receive emails from the editor" }, { variable: providerName } )}
                        onInputChanged={(_e) => setAcceptsProviderEmail(!acceptsProviderEmail)} 
                        data-testid={"accepts-email-input"}
                    />
                </div>
                <div className={cx(styles.formGroup, styles.formSubmitGroup)}>
                    <Button className={styles.formSubmitButton} role="button" type="submit" handleClick={() => null}>
                        { intl.formatMessage({ id:"auth.signup_form.sign_up", defaultMessage: "Sign up" }) }
                    </Button>
                </div>
            </form>
        </>
    );
}

SignupForm.propTypes = {
	/** Callback triggered when form is submitted */
	onSubmit: PropTypes.func,
	/** Name of the editor */
	providerName: PropTypes.string,
	/** If `true`, will show an error message */
	error: PropTypes.bool
}
