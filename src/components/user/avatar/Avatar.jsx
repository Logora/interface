import React from "react";
import { useIntl } from 'react-intl';
import { Tooltip } from '@logora/debate.tools.tooltip';
import cx from 'classnames';
import styles from './Avatar.module.scss';

export const Avatar = ({ avatarUrl, userName, isOnline = false, size = "normal", className, ...rest }) => {
    const intl = useIntl();

    let sizePx = 40;
    if(size == 'large') {
        sizePx = 60;
    } else if (size == 'small') {
        sizePx = 25;
    }

    const commonProps = {
        loading: "lazy",
        className: cx(styles.avatarImage, className, styles[size]),
        src: avatarUrl,
        alt: intl.formatMessage({ id:"user.avatar.alt", defaultMessage: "{name}'s profile picture" }, { name: userName }),
        height: sizePx,
        width: sizePx,
        ...rest
    };

    return (
        <div className={styles.avatarContainer}>
            { isOnline ?
                <Tooltip text={intl.formatMessage({ id:"user.avatar.online", defaultMessage: "{name} is online" }, { name: userName })}>
                    <div className={cx(styles.avatarBox, styles[size])}>
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