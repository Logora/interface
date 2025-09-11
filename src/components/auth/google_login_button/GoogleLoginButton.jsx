import React from 'react';
import { OAuth2Button } from '@logora/debate.auth.oauth2_button';
import { GoogleIcon } from "./GoogleIcon";
import styles from './GoogleLoginButton.module.scss';
import PropTypes from "prop-types";

export const GoogleLoginButton = ({ text, googleClientId, redirectUri, onCode, onClose, className }) => {
    return (
        <OAuth2Button 
            authDialogUrl={"https://accounts.google.com/o/oauth2/v2/auth"}
            clientId={googleClientId}
            responseType={"code"}
            scope={"https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile"}
            onCode={onCode}
            onClose={onClose}
            provider={"google"}
            redirectUri={redirectUri}
            className={className}
        >
            <div className={styles.container}>
                <GoogleIcon height={35} width={35} className={styles.icon} />&nbsp;
                <span>
                    { text }
                </span>
            </div>
        </OAuth2Button>
    )
}

GoogleLoginButton.propTypes = {
	/** Button text */
	text: PropTypes.string,
	/** Google client ID */
	googleClientId: PropTypes.string,
	/** OAuth2 redirect URI */
	redirectUri: PropTypes.string,
	/** Callback triggered if auth is sucessful */
	onCode: PropTypes.func,
	/** Callback triggered if popup is closed */
	onClose: PropTypes.func
}