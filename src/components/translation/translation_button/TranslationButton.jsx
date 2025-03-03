import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import cx from 'classnames';
import styles from './TranslationButton.module.scss';
import PropTypes from "prop-types";

export const TranslationButton = ({ className, language, callback, ...rest }) => {
    const [isOriginal, setIsOriginal] = useState(false);
    const intl = useIntl();

    const handleClick = () => {
        setIsOriginal(!isOriginal);
        callback();
    }

    return (
        <div 
            onClick={handleClick}
            className={cx(styles.translationButton, className)}
            {...rest}
        >
            {!isOriginal ?
                <FormattedMessage 
                    id="translations.translated_from" 
                    values={{ variable: intl.formatMessage({ id: "translations." + language, defaultMessage: "French" }) }} 
                    defaultMessage={`Translated from French - Show original`} 
                />
            :
                <FormattedMessage 
                    id="translations.translate_to" 
                    values={{ variable: intl.formatMessage({ id: "translations." + intl.locale, defaultMessage: "English" }) }} 
                    defaultMessage={`Translate to English`} 
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