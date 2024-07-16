import React, { useState } from "react";
import { useDataProvider } from '@logora/debate.data.data_provider';
import { useIntl } from "react-intl";
import { PaginatedList } from "@logora/debate.list.paginated_list";
import { NotificationItem } from '@logora/debate.notification.notification_item';
import { UserContentSkeleton } from '@logora/debate.skeleton.user_content_skeleton';
import styles from "./NotificationMenu.module.scss";
import PropTypes from "prop-types";

export const NotificationMenu = ({ notificationDefinitions = {} }) => {
  const intl = useIntl();
  const api = useDataProvider();
  const [readAll, setReadAll] = useState(false);

  const handleClick = () => {
    setReadAll(true);
    api.create("notifications/read/all", {}).then(() => {});
  };

  return (
    <>
      <div className={styles.notificationMenuHeader}>
        <div className={styles.notificationMenuHeaderText}>
          {intl.formatMessage({ id: 'header.notifications', defaultMessage: "Alerts" })}
        </div>
        <div
          id='read_all_notifications'
          data-tid={"action_read_all_notifications"}
          className={styles.readNotificationsButton}
          tabIndex='0'
          onClick={handleClick}
        >
          {intl.formatMessage({ id: 'notifications.read_all', defaultMessage: "Mark all as read" })}
        </div>
      </div>
      <div className={styles.notificationList}>
        <PaginatedList
          currentListId={"notificationList"}
          loadingComponent={<UserContentSkeleton numberLines={0} />}
          resourcePropName="notification"
          resource={'notifications'}
          sort={"-created_at"}
          perPage={10}
          withToken={true}
          display={"column"}
          gap={"0px"}
        >
          <NotificationItem
            notificationDefinitions={notificationDefinitions}
            isRead={readAll}
          />
        </PaginatedList>
      </div>
    </>
  );
}

NotificationMenu.propTypes = {
  /** Definitions for the notification types */
  notificationDefinitions: PropTypes.object.isRequired,
};
