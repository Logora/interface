import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useIntl } from 'react-intl';
import cx from 'classnames';
import styles from './TranslationButton.module.scss';
import PropTypes from "prop-types";

export const TranslationButton = ({ className, language, callback, ...rest }) => {
    const [ isOriginal, setIsOriginal] = useState(false);
    const intl = useIntl();

    const handleClick = () => {
        setIsOriginal(!isOriginal);
        callback();
    }

    const getLocaleAbbreviation = (locale) => {
        const localeMap = {
            english: 'EN',
            french: 'FR',
            spanish: 'ES',
            italian: 'IT',
            romansh: 'RM',
            german: 'DE',
        };
        return localeMap[locale.toLowerCase()] || locale;
    };

    return (
        <div 
            onClick={handleClick}
            className={cx(styles.translationButton, className)}
            {...rest}
        >
            { !isOriginal ?
                <FormattedMessage 
                    id="translations.translated_from" 
                    values={{ variable: getLocaleAbbreviation(language) }} 
                    defaultMessage={`Translated from ${getLocaleAbbreviation(language)} - Show original`} 
                />
            :
                <FormattedMessage 
                    id="translations.translate_to" 
                    values={{ variable: getLocaleAbbreviation(intl.locale) }} 
                    defaultMessage={`Translate to ${getLocaleAbbreviation(intl.locale)}`} 
                />
            }
        </div>
    );
};

TranslationButton.propTypes = {
    /** Origin language */
    language: PropTypes.string.isRequired,
    /** Function triggered on click */
    callback: PropTypes.func.isRequired,
    /** Extra classname */
    className: PropTypes.string,
};