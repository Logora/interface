import React, { createContext, useEffect, useState } from "react";
import { IntlProvider as ReactIntlProvider } from 'react-intl';
import { flatten } from 'flat';
import useSessionStorageState from '@rooks/use-sessionstorage-state';
import PropTypes from 'prop-types';

export const LocaleContext = createContext();

export const IntlProvider = ({ language, defaultLanguage = "fr", async = true, locales, customMessages = {}, children }) => {
  const [storedLocale] = useSessionStorageState("logora:locale", null);

  const getLocale = () => {
    if (storedLocale) {
      return storedLocale;
    } else if (language) {
      return language;
    } else {
      return defaultLanguage;
    }
  }

  const getMessages = () => {
    if(!async) {
      return locales[locale];
    } else {
      return {};
    }
  }

  const [locale, setLocale] = useState(getLocale());
  const [messages, setMessages] = useState(getMessages());

  useEffect(() => {
    if (locale && async) {
      (() => import(locales + locale + ".json"))().then((m) => {
        setMessages(m);
      });
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
    <ReactIntlProvider locale={locale} messages={mergeRemoteMessages(flatten(messages))}>
      <LocaleContext.Provider value={{ locale, setLocale }}>
        {children}
      </LocaleContext.Provider>
    </ReactIntlProvider>
  )
};

IntlProvider.propTypes = {
  /** Current language used */
  language: PropTypes.string,
  /** Default language if no language is passed or stored  */
  defaultLanguage: PropTypes.string,
  /** If true, will fetch the locales asynchronously with import */
  async: PropTypes.bool,
  /** Path to the folder containing locale files, or object containing the locale strings */
  locales: PropTypes.any,
  /** Dictionary of messages that will override messages from files */
  customMessages: PropTypes.object,
  /** Component children */
  children: PropTypes.node
};