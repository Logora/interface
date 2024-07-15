import React from 'react';
import { useHistory } from 'react-router-dom';
import { useRoutes } from '@logora/debate.data.config_provider';
import { useDataProvider } from '@logora/debate.data.data_provider';
import { useRelativeTime } from '@logora/debate.hooks.use_relative_time';
import { useIntl } from 'react-intl';
import PropTypes from "prop-types";
import cx from 'classnames';
import styles from './NotificationItem.module.scss';

export const NotificationItem = ({ notification, notificationDefinitions = {}, isRead }) => {
    const intl = useIntl();
    const routes = useRoutes();
    const api = useDataProvider();
    const history = useHistory();
    const relativeTime = useRelativeTime(new Date(notification.created_at).getTime());

    if (!(notification.notify_type in notificationDefinitions)) {
        return null;
    }

    const notificationSettings = notificationDefinitions[notification.notify_type];

    const handleClick = () => {
        if (typeof window !== 'undefined') {
            const redirectUrl = notificationSettings.getRedirectUrl(notification, routes);
            history.push(redirectUrl);
        }
        if (notification.is_opened == false) {
            api.create(`notifications/read/${notification.id}`, {}).then(() => {
                null;
            }).catch(() => {
                null;
            })
        }
    }

    return (
        <li className={styles.notificationItem} tabIndex="0" onClick={() => handleClick()}>
            <div data-tid={"action_view_notification"} className={cx(styles.notificationItemBody, { [styles.read]: notification.is_opened || isRead })}>
                <div data-tid={"action_view_notification"} className={styles.notificationImageContainer}>
                    {notificationSettings.getImage(notification)}
                </div>
                <div data-tid={"action_view_notification"} className={styles.notificationItemContent}>
                    <div data-tid={"action_view_notification"}>
                        {notificationSettings.getContent(notification, intl)}
                    </div>
                    <div data-tid={"action_view_notification"} className={styles.notificationItemDate}>
                        {relativeTime}
                    </div>
                </div>
            </div>
        </li>
    );
}

NotificationItem.propTypes = {
    /** Notification data */
    notification: PropTypes.object.isRequired,
    /** Definitions for the notification types */
    notificationDefinitions: PropTypes.object.isRequired,
    /** Indicates if the notification is read */
    isRead: PropTypes.bool,
};