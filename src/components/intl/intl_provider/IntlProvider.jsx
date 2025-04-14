import React, { useEffect, useState } from "react";
import { IntlContext } from "./IntlContext";
import { IntlProvider as ReactIntlProvider } from 'react-intl';
import { flatten } from 'flat';
import useLocalstorageState from "@rooks/use-localstorage-state";
import PropTypes from 'prop-types';

export const IntlProvider = ({ language, locales, async = false, customMessages = {}, children, onError }) => {
  const [storedLocale, setStoredLocale] = useLocalstorageState("logora:locale", null);

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
    if (locale) {
      if (async && (locale in locales)) {
        (locales[locale])().then((m) => {
          setMessages(m);
        }).catch(() => setMessages({}));
      }

      if (storedLocale !== locale) {
        setStoredLocale(locale);
      }
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

  const displayContext = () => {
    return (
      <ReactIntlProvider locale={locale} messages={mergeRemoteMessages(flatten(messages))} onError={onError}>
        <IntlContext.Provider value={{ locale, setLocale }}>
          {children}
        </IntlContext.Provider>
      </ReactIntlProvider>
    )
  }

  return (
    <>
      {async && typeof window !== 'undefined' ?
        (Object.keys(messages).length > 0 ?
          displayContext()
          :
          null
        )
        :
        displayContext()
      }
    </>
  )
};

IntlProvider.propTypes = {
  /** Current language used */
  language: PropTypes.string,
  /** Object containing the locale strings. Can be imported lazily in async mode */
  locales: PropTypes.any,
  /** If true, will fetch the locales asynchronously with import */
  async: PropTypes.bool,
  /** Dictionary of messages that will override localized messages */
  customMessages: PropTypes.object,
  /** Component children */
  children: PropTypes.node,
  /** Optional onError callback passed to react-intl */
  onError: PropTypes.func
};
