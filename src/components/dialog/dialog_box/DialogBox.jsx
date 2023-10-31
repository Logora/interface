import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import styles from './DialogBox.module.scss';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

export const DialogBox = ({ isBottom, isTop, isRight, isLeft, titleKey, contentKey, isHidden = false, children, className }) => {
    const storedChoice = JSON.parse(typeof window !== "undefined" && window.localStorage && window.localStorage.getItem(contentKey)) || false;
    const [show, setShow] = useState(true);

    useEffect(() => {
    }, [isHidden]);

    const closeBox = () => {
        setShow(false);
        if(typeof window !== "undefined") {
            window.localStorage.setItem(contentKey, true);
        }
    }

    return (
        <div className={styles.childContainer}>
            {children}
            {!storedChoice && !isHidden &&
                <div className={cx(styles.textContainer, className, {[styles.hidden]: !show, [styles.left]: isLeft, [styles.right]: isRight, [styles.top]: isTop, [styles.bottom]: isBottom})}>
                    <div className={styles.close} onClick={closeBox}>x</div>
                    <div className={styles.title}>
                        <span><FormattedMessage id={titleKey} defaultMessage="Debates" /></span>
                    </div>
                    <div className={styles.textContent}>
                        <span><FormattedMessage id={contentKey} defaultMessage="Participate by writing your argument and earn eloquence points" /></span>
                    </div>
                    <div className={styles.closeText} onClick={closeBox}>
                        <span><FormattedMessage id="dialog.dialog_box.got_it" defaultMessage="Got it" /></span>
                    </div>
                </div>
            }
        </div>
    )
}

DialogBox.propTypes = {
    /** Dialog position */
    isBottom: PropTypes.bool,
    /** Dialog position */
    isTop: PropTypes.bool,
    /** Dialog position */
    isRight: PropTypes.bool,
    /** Dialog position */
    isLeft: PropTypes.bool,
    /** Title to display */
    titleKey: PropTypes.string.isRequired,
    /** Content to display */
    contentKey: PropTypes.string.isRequired,
    /** Controls the dialog display */
    isHidden: PropTypes.bool,
    /** Custom css to pass */
    className: PropTypes.string,
};

DialogBox.defaultProps = {
    isHidden: false
};