import React, { createContext, useEffect, useState } from "react";
import { IntlProvider as ReactIntlProvider } from 'react-intl';
import { flatten } from 'flat';
import useSessionStorageState from '@rooks/use-sessionstorage-state';
import PropTypes from 'prop-types';

export const IntlContext = createContext();

export const IntlProvider = ({ language, async = false, locales, customMessages = {}, children, onError }) => {
  const [storedLocale] = useSessionStorageState("logora:locale", null);

  const getLocale = () => {
    if (storedLocale) {
      return storedLocale;
    } else if (language) {
      return language;
    }
  }

  const getMessages = () => {
    if (!async && (locale in locales)) {
      return locales[locale];
    } else {
      return {};
    }
  }

  const [locale, setLocale] = useState(getLocale());
  const [messages, setMessages] = useState(getMessages());

  useEffect(() => {
    if (locale && async) {
      (() => import("../locales/" + locale + ".json"))().then((m) => {
        setMessages(m);
      }).catch(() => setMessages({}));
    }
  }, [locale]);

  const mergeRemoteMessages = (messages) => {
    let updatedMessages = { ...messages };
    Object.keys(updatedMessages).forEach((k) => {
      if (Object.keys(customMessages).indexOf(k) > -1) {
        updatedMessages[k] = customMessages[k];
      }
    });
    return updatedMessages;
  }

  return (
    <ReactIntlProvider locale={locale} messages={mergeRemoteMessages(flatten(messages))} onError={onError}>
      <IntlContext.Provider value={{ locale, setLocale }}>
        {children}
      </IntlContext.Provider>
    </ReactIntlProvider>
  )
};

IntlProvider.propTypes = {
  /** Current language used */
  language: PropTypes.string,
  /** If true, will fetch the locales asynchronously with import */
  async: PropTypes.bool,
  /** Path to the folder containing locale files, or object containing the locale strings */
  locales: PropTypes.any,
  /** Dictionary of messages that will override localized messages */
  customMessages: PropTypes.object,
  /** Component children */
  children: PropTypes.node,
  /** Optional onError callback passed to react-intl */
  onError: PropTypes.func
};

IntlProvider.defaultProps = {
  async: false,
  customMessages: {}
}