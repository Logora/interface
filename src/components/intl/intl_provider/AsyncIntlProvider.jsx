import React, { createContext, useEffect, useState } from "react";
import { IntlProvider as ReactIntlProvider } from 'react-intl';
import { flatten } from 'flat';
import useSessionStorageState from '@rooks/use-sessionstorage-state';
import PropTypes from 'prop-types';

export const LocaleContext = createContext();

export const AsyncIntlProvider = ({ language, defaultLanguage = "fr", messagesPath = "../locales/", customMessages = {}, children }) => {
  const [messages, setMessages] = useState(null);
  const [locale, setLocale] = useState(null);
  const [userLocale, setUserLocale] = useSessionStorageState("logora:locale", null);

  useEffect(() => {
    if (userLocale && userLocale !== "undefined" && userLocale !== "null") {
      setLocale(userLocale);
    } else if(language && language != "undefined") {
      setLocale(language);
    } else {
      setLocale(defaultLanguage);
    }
  }, []);

  useEffect(() => {
    if(locale) {
      (() => import(messagesPath + locale + ".json"))().then((m) => {
        setMessages(m);
      });
    }
  }, [locale]);

  const mergeRemoteMessages = (messages) => {
    let updatedMessages = { ...messages };
    Object.keys(updatedMessages).forEach((k) => {
      if(Object.keys(customMessages).indexOf(k) > -1) {
        updatedMessages[k] = customMessages[k];
      }
    });
    return updatedMessages;
  }

  return (
    <>
      { messages ? 
        (
          <ReactIntlProvider locale={locale} messages={mergeRemoteMessages(flatten(messages))}>
            <LocaleContext.Provider value={{ locale, setLocale }}>
              { children }
            </LocaleContext.Provider>
          </ReactIntlProvider>
        )
      :
        null
      }
    </>
  )
};

AsyncIntlProvider.propTypes = {
	/** Current language used */
    language: PropTypes.string,
    /** Default language if no language is passed or stored  */
    defaultLanguage: PropTypes.string,
    /** Path to the folder containing locale files */
    messagesPath: PropTypes.string,
    /** Dictionary of messages that will override messages from files */
    customMessages: PropTypes.object,
    /** Component children */
    children: PropTypes.node
};