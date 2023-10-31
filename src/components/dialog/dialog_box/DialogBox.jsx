import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import styles from './DialogBox.module.scss';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

export const DialogBox = ({ position = "bottom", title, content, isHidden = false, children, className }) => {
    const storedChoice = JSON.parse(typeof window !== "undefined" && window.localStorage && window.localStorage.getItem(content)) || false;
    const [show, setShow] = useState(true);

    useEffect(() => {
    }, [isHidden]);

    const closeBox = () => {
        setShow(false);
        if(typeof window !== "undefined") {
            window.localStorage.setItem(content, true);
        }
    }

    return (
        <div className={styles.childContainer}>
            {children}
            {!storedChoice && !isHidden &&
                <div className={cx(styles.textContainer, className, {[styles.hidden]: !show, [styles.left]: position === "left", [styles.right]: position === "right", [styles.top]: position === "top", [styles.bottom]: position === "bottom"})}>
                    <div className={styles.close} onClick={closeBox}>x</div>
                    <div className={styles.title}>
                        <span>{title}</span>
                    </div>
                    <div className={styles.textContent}>
                        <span>{content}</span>
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
    /** DialogBox position, can be `top`, `bottom`, `left` or `right` */
    position: PropTypes.string,
    /** Title to display */
    title: PropTypes.string,
    /** Content to display */
    content: PropTypes.string,
    /** Controls the dialog display */
    isHidden: PropTypes.bool,
    /** Custom css to pass */
    className: PropTypes.string,
};

DialogBox.defaultProps = {
    isHidden: false
};