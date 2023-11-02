import React from 'react';
import PropTypes from 'prop-types';
import { Point } from '@logora/debate.icons.regular_icons';
import cx from 'classnames';
import styles from './Toast.module.scss';

export const Toast = ({ text, points, variant = "info", handleClose }) => {
    return (
        <div className={cx(styles.container, styles[variant])}>
            <div className={styles.body}>
                <div className={styles.message}>
                    { text }
                </div>
                { points &&
                    <div className={styles.points}>
                        <span className={styles.textPoints}>{points}</span>
                        <Point width={14} height={14} className={styles.pointIcon} />
                    </div>
                }
            </div>
            <div className={styles.closeContainer}>
                <div className={styles.closeButton} onClick={handleClose}>✕</div>
            </div>
        </div>
    );
}

Toast.propTypes = {
    /** Text of the toast */
    text: PropTypes.string.isRequired,
    /** Points earned displayed below the text */
    points: PropTypes.oneOfType([PropTypes.string, PropTypes.number ]),
    /** Type of the toast, can be 'info', 'success' or 'error' */
    variant: PropTypes.string,
    /** Callback triggered on close */
    handleClose: PropTypes.func
};

Toast.defaultProps = {
    variant: "info"
};