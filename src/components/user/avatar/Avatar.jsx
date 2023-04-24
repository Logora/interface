import React from "react";
import { useIntl } from 'react-intl';
import { Tooltip } from '@logora/debate.tools.tooltip';
import { DefaultAvatarIcon } from "./DefaultAvatar";
import cx from 'classnames';
import styles from './Avatar.module.scss';

export const Avatar = ({ avatarUrl, userName, isOnline = false, size = 40, className, ...rest }) => {
    const intl = useIntl();

    const commonProps = {
        loading: "lazy",
        className: cx(styles.avatarImage, className),
        height: size,
        width: size,
        ...rest
    };

    const commonStyles = {
        width: `${size}px`,
        height: `${size}px`
    }

    const displayImage = () => {
        if (avatarUrl) {
            return <img {...commonProps} style={commonStyles} src={avatarUrl} alt={intl.formatMessage({ id:"user.avatar.alt", defaultMessage: "{name}'s profile picture" }, { name: userName })} />;
        } else {
            return <DefaultAvatarIcon {...commonProps} style={commonStyles} data-testid={"avatar-icon"} />;
        }
    }

    return (
        <div className={styles.avatarContainer}>
            { isOnline ?
                <Tooltip text={intl.formatMessage({ id:"user.avatar.online", defaultMessage: "{name} is online" }, { name: userName })}>
                    <div 
                        className={styles.avatarBox}
                    >
                        { displayImage() }
                        <span data-testid={"online-pin"} className={styles.onlinePin}></span>
                    </div>
                </Tooltip>
                :
                displayImage()
            }
        </div>
    )
};