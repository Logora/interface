import React from 'react';
import styles from './SummaryBox.module.scss';
import PropTypes from "prop-types";

export const SummaryBox = ({ summaryItems = [], tagClassName, tag, emptySummaryText = "" }) => {
    return (
        <div className={styles.box}>
            <div className={`${styles.stats} ${tag ? styles.withTag : ''}`}>
                {tag && (
                    <div className={`${styles.tag} ${tagClassName}`} >
                        {tag}
                    </div>
                )}
            </div>
            {summaryItems.length === 0 ? (
                <span className={styles.emptySummaryText}>{emptySummaryText}</span>
            ) : (
                summaryItems.map((item, index) => (
                    <li key={index} className={styles.summaryItem}>
                        {item && <span>•</span>}
                        {item}
                    </li>
                ))
            )}

        </div>
    )
};

SummaryBox.propTypes = {
    /** List of content items to display */
    summaryItems: PropTypes.arrayOf(PropTypes.string),
    /** Class name to style the tag */
    tagClassName: PropTypes.string,
    /**  Tag displaying in the left corner of the box */
    tag: PropTypes.string,
    /** Message to display when summaryItems is empty */
    emptySummaryText: PropTypes.string,
};