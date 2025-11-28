import React, { useState, useEffect } from "react";
import { useIntl } from 'react-intl';
import { Tooltip } from '@logora/debate.dialog.tooltip';
import { DefaultAvatarIcon } from "./DefaultAvatar";
import cx from 'classnames';
import styles from './Avatar.module.scss';
import PropTypes from 'prop-types';

export const Avatar = ({ avatarUrl, userName, isOnline = false, showTooltip = false, size = 40, className, ...rest }) => {
    const [fallback, setFallback] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const intl = useIntl();

    useEffect(() => {
        setFallback(false); 
        setIsLoaded(false); 
    }, [avatarUrl]);

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
        if (avatarUrl && !fallback) {
            return (
                <div className={styles.avatarWrapper} style={commonStyles}>
                    {!isLoaded && (
                        <div
                            className={styles.avatarPlaceholder}
                            aria-hidden="true"
                        />
                    )}
                    <img
                        {...commonProps}
                        style={commonStyles}
                        src={avatarUrl}
                        alt={intl.formatMessage(
                            {
                                id:"user.avatar.alt",
                                defaultMessage: "{name}'s profile picture"
                            },
                            { name: userName }
                        )}
                        onLoad={() => setIsLoaded(true)}
                        onError={() => {
                            setFallback(true);
                            setIsLoaded(false);
                        }}
                    />
                </div>
            );
        } else {
            return (
                <div className={styles.avatarWrapper} style={commonStyles}>
                    <DefaultAvatarIcon
                        {...commonProps}
                        style={commonStyles}
                        data-testid={"avatar-icon"}
                    />
                </div>
            );
        }
    };
    return (
        <div className={styles.avatarContainer}>
            { showTooltip || isOnline ?
                <Tooltip text={ isOnline ? intl.formatMessage({ id:"user.avatar.online", defaultMessage: "{name} is online" }, { name: userName }) : userName}>
                    <div 
                        className={styles.avatarBox}
                    >
                        { displayImage() }
                        { isOnline ? <span data-testid={"online-pin"} className={styles.onlinePin}></span> : null }
                    </div>
                </Tooltip>
            :
                displayImage()
            }
        </div>
    )
};

Avatar.propTypes = {
    /** User's image url */
    avatarUrl: PropTypes.string,
    /** User's full name */
    userName: PropTypes.string,
    /** Whether the user is online or not, displays online pin */
    isOnline: PropTypes.bool,
    /** Adjust the size of avatar */
    size: PropTypes.number,
    /** Additional classname passed to image */
    className: PropTypes.string,
}