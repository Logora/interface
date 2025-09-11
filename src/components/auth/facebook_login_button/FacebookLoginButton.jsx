import React from 'react';
import { OAuth2Button } from '@logora/debate.auth.oauth2_button';
import { FacebookIcon } from "./FacebookIcon";
import styles from './FacebookLoginButton.module.scss';
import PropTypes from "prop-types";

export const FacebookLoginButton = ({ text, facebookClientId, redirectUri, onCode, onClose}) => {
  return (
    <OAuth2Button 
      authDialogUrl={"https://www.facebook.com/v9.0/dialog/oauth"}
      clientId={facebookClientId}
      scope={"email,public_profile"}
      onCode={onCode}
      onClose={onClose}
      provider={"facebook"}
      redirectUri={redirectUri}
    >
      <div className={styles.facebookButton}>
        <FacebookIcon height={35} width={35} className={styles.icon} />&nbsp;
        <span>
          { text }
        </span>
      </div>
    </OAuth2Button>
  );
}

FacebookLoginButton.propTypes = {
	/** Button text */
	text: PropTypes.string,
	/** Facebook client ID */
	facebookClientId: PropTypes.string,
	/** OAuth2 redirect URI */
	redirectUri: PropTypes.string,
	/** Callback triggered if auth is sucessful */
	onCode: PropTypes.func,
	/** Callback triggered if popup is closed */
	onClose: PropTypes.func
}