import React from 'react';
import styles from './PointBox.module.scss';
import PropTypes from 'prop-types';

export const PointBox = ({ icon, text, timeAgo }) => {
    return (
        <div className={styles.container}>
            <div className={styles.icon}>
                { icon }
            </div>
            <div className={styles.text}>
                { text }
                { timeAgo && <div className={styles.timeAgo}>
                    { timeAgo }
                </div> }
            </div>
        </div>
    )
}

PointBox.propTypes = {
    /** Svg icon */
    icon: PropTypes.node.isRequired,
    /** Text displayed */
    text: PropTypes.node.isRequired,
    /** Time ago */
    timeAgo: PropTypes.string
};