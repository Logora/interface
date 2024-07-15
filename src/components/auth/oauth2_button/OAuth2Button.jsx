import React from "react";
import { useLocation } from "react-router";
import OauthPopup from "react-oauth-popup";
import styles from "./OAuth2Button.module.scss";
import classnames from "classnames";
import PropTypes from "prop-types";

export const OAuth2Button = ({
  provider,
  authDialogUrl,
  clientId,
  redirectUri,
  scope,
  responseType,
  onCode,
  onClose,
  popup = true,
  children,
  className,
}) => {
  const location = useLocation();

  const handleOnCode = (code, params) => {
    onCode(code, provider);
  };

  const handleOnClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const getDialogUrl = () => {
    let baseUrl = new URL(authDialogUrl);
    baseUrl.searchParams.append("client_id", clientId);
    baseUrl.searchParams.append("redirect_uri", redirectUri);
    baseUrl.searchParams.append("scope", scope);
    if (responseType) {
      baseUrl.searchParams.append("response_type", responseType);
    }
    if (typeof window !== "undefined") {
      baseUrl.searchParams.append(
        "state",
        window.btoa(
          window.location.origin +
            location.pathname +
            location.hash +
            location.search
        )
      );
    }
    return baseUrl.href;
  };

  return (
    <div
      data-testid="container"
      className={classnames(styles.oauthButtonContainer, className)}
    >
      {popup ? (
        <OauthPopup
          url={getDialogUrl()}
          onCode={handleOnCode}
          onClose={handleOnClose}
        >
          <div className={styles.oauthPopupContainer}>{children}</div>
        </OauthPopup>
      ) : (
        <a href={getDialogUrl()} className={className}>
          {children}
        </a>
      )}
    </div>
  );
};

OAuth2Button.propTypes = {
  /** Provider name that will be passed with the onCode callback */
  provider: PropTypes.string,
  /** OAuth login dialog URL */
  authDialogUrl: PropTypes.string,
  /** OAuth2 client ID */
  clientId: PropTypes.string,
  /** OAuth2 redirect URI */
  redirectUri: PropTypes.string,
  /** OAuth2 scope */
  scope: PropTypes.string,
  /** OAuth2 response type */
  responseType: PropTypes.string,
  /** Callback triggered if auth is sucessful */
  onCode: PropTypes.func,
  /** Callback triggered if popup is closed */
  onClose: PropTypes.func,
  /** Button content */
  children: PropTypes.node,
  /**  Class name to style the button container */
  className: PropTypes.string,
  /**  Open a popup on click. If false, the button will be a link */
  popup: PropTypes.bool,
};
