import React from 'react';
import { FormattedMessage } from 'react-intl';
import styles from './KeywordBox.module.scss';

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

