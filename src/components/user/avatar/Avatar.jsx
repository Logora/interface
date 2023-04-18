import React from "react";
import { useIntl } from 'react-intl';
import { Tooltip } from '@logora/debate.tools.tooltip';
import cx from 'classnames';
import styles from './Avatar.module.scss';

export const Avatar = ({ avatarUrl, userName, isOnline, className, ...rest }) => {
    const intl = useIntl();

    const commonProps = {
        loading: "lazy",
        className: cx(styles.avatarImage, className),
        src: avatarUrl,
        alt: intl.formatMessage({ id:"user.avatar.alt", defaultMessage: "{name}'s profile picture" }, { name: userName }),
        height: 40,
        width: 40,
        ...rest
    };

    return (
        <div className={styles.avatarContainer}>
            { isOnline ?
                <Tooltip text={intl.formatMessage({ id:"user.avatar.online", defaultMessage: "{name} is online" }, { name: userName })}>
                    <div className={styles.avatarBox}>
                        <img {...commonProps} />
                        <span data-testid={"online-pin"} className={styles.onlinePin}></span>
                    </div>
                </Tooltip>
                :
                <img {...commonProps} />
            }
        </div>
    )
};