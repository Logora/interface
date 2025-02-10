import React from 'react';
import styles from './SummaryBox.module.scss';
import PropTypes from "prop-types";

export const SummaryBox = ({contentItems, color, tag}) => {
    return (
        <div className={styles.box}>
            <div className={styles.stats}>
            {tag && (
                    <div className={styles.tag} style={{ backgroundColor: color }}>
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
    /**  Color for bar background */
    color: PropTypes.string,
    /**  Tag displaying in the left corner of the box */
    tag: PropTypes.string
};