import React from 'react';
import { IntlProvider as ReactIntlProvider } from 'react-intl';
import { flatten } from 'flat';
import PropTypes from 'prop-types';

export const IntlProvider = ({ language, defaultLanguage = "fr", locales, customMessages = {}, children }) => {
  const setLocale = () => {
    if(language && Object.keys(locales).includes(language)) {
      return language;
    } else {
      return defaultLanguage;
    }
  }

  const locale = setLocale();

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
    <ReactIntlProvider locale={locale} messages={mergeRemoteMessages(flatten(locales[locale]))}>
      { children }
    </ReactIntlProvider>
  )
};

IntlProvider.propTypes = {
	/** Current language used */
    language: PropTypes.string,
    /** Default language if no language is passed or stored  */
    defaultLanguage: PropTypes.string,
    /** Object containing the locale strings, usually imported from files */
    locales: PropTypes.dictionary,
    /** Dictionary of messages that will override messages from files */
    customMessages: PropTypes.object,
    /** Component children */
    children: PropTypes.node
};