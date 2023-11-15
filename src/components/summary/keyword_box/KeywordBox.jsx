import React from 'react';
import { FormattedMessage } from 'react-intl';
import styles from './KeywordBox.module.scss';
import PropTypes from "prop-types";

export const KeywordBox = (props) => {
    const { keyword, occurrences, color, handleClick, ...rest} = props;
    const boxStyles = { backgroundColor: `${color}` }
    const buttonStyles = { color: `${color}` }
    
    return (
        <div style={boxStyles} className={styles.boxContainer} { ...rest }>
            <div className={styles.keywordTitle}>
                { keyword }
            </div>
            <div className={styles.occurrences}>
                <FormattedMessage 
                    id="summary.keyword_box.occurrences"
                    defaultMessage={"{count} occurrences"}  
                    values={{ count: occurrences }}
                />
            </div>
            <div  
                style={buttonStyles}
                className={styles.keywordButton}
                onClick={handleClick}
            >
                <FormattedMessage id="summary.keyword_box.call_to_action" defaultMessage={"View contributions"} />
            </div>
        </div>
    )
}

KeywordBox.propTypes = {
    /** Keyword to be displayed as a title */
    keyword: PropTypes.string,
    /**  Number of occurrences associated with the keyword */
    occurrences: PropTypes.number,
    /**  Color for background */
    color: PropTypes.string,
    /** Callback function for the button */
    handleClick: PropTypes.func
};