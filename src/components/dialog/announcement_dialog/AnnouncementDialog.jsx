import React from 'react';
import { Icon } from '@logora/debate.icons.icon';
import cx from 'classnames';
import styles from './AnnouncementDialog.module.scss';
import PropTypes from "prop-types";

export const AnnouncementDialog = ({ message, icon: CustomIcon, fullWidth = false, className, iconClassName, children }) => {
    return (
        <div className={cx(styles.container, className, {[styles.fullWidth]: fullWidth})}>
            <div className={cx(styles.icon, iconClassName)}>
                { CustomIcon ?
                    <CustomIcon height={24} width={24} data-testid={"custom-icon"} />
                :
                    <Icon name="announcement" height={24} width={24} data-testid={"announcement-icon"} />
                }
            </div>
            <div className={styles.content}>
                { message ? message : children }
            </div>
        </div>
    )
}

AnnouncementDialog.propTypes = {
    /** Icon to display */
    icon: PropTypes.any,
    /** Message to display */
    message: PropTypes.string,
    /** If `true`, dialog will take 100% width */
    fullWidth: PropTypes.bool,
    /** Class name passed to the dialog */
    className: PropTypes.string,
    /** Class name passed to the icon */
    iconClassName: PropTypes.string,
    /** Content to display if message is empty */
    children: PropTypes.node,
};

AnnouncementDialog.defaultProps = {
    fullWidth: false
}