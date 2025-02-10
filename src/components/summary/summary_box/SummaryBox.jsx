import React from 'react';
import styles from './SummaryBox.module.scss';
import PropTypes from "prop-types";

export const SummaryBox = ({contentItems = [], className, tag}) => {
    return (
        <div className={styles.box}>
            <div className={styles.stats}>
            {tag && (
                    <div className={`${styles.tag} ${className}`} >
                        {tag}
                    </div>
                )}
            </div>
              <ul className={styles.contentItems}>
                {contentItems.map((item, index) => (
                    <li key={index} className={styles.contentItem}>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    )
};

SummaryBox.propTypes = {
    /** List of content items to display */
    contentItems: PropTypes.arrayOf(PropTypes.string),
    /** Class name to style the tag */
    className: PropTypes.string,
    /**  Tag displaying in the left corner of the box */
    tag: PropTypes.string
};