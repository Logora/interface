import React from "react";
import { useLocation } from "react-router-dom";
import OauthPopup from "react-oauth-popup";
import styles from "./OAuth2Button.module.scss";
import classnames from "classnames";

export const OAuth2Button = ({
  provider,
  authDialogUrl,
  clientId,
  redirectUri,
  scope,
  responseType,
  accessType = "",
  forceAuth = false,
  onCode,
  onClose,
  popup = true,
  children,
  className,
  state = "",
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

    if (forceAuth) {
      baseUrl.searchParams.append("force_authentication", "1");
    }

    if (responseType) {
      baseUrl.searchParams.append("response_type", responseType);
    }
    if (accessType) {
      baseUrl.searchParams.append("access_type", accessType);
    }

    if (typeof window !== "undefined") {
      baseUrl.searchParams.append(
        "state",
        state ? window.btoa(state) : window.btoa(window.location.href)
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
        <a href={getDialogUrl()}>{children}</a>
      )}
    </div>
  );
};
