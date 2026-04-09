import { useRoutes } from "@logora/debate/data/config_provider";
import { useConfig } from "@logora/debate/data/config_provider";
import { useDataProvider } from "@logora/debate/data/data_provider";
import { useRelativeTime } from "@logora/debate/hooks/use_relative_time";
import cx from "classnames";
import React from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router";
import styles from "./NotificationItem.module.scss";

export const NotificationItem = ({
	notification,
	notificationDefinitions = {},
	isRead,
}) => {
	const { id, created_at, notify_type, is_opened } = notification;
	const intl = useIntl();
	const routes = useRoutes();
	const api = useDataProvider();
	const navigate = useNavigate();
	const relativeTime = useRelativeTime(new Date(created_at).getTime());
	const config = useConfig();

	if (!(notify_type in notificationDefinitions)) {
		return null;
	}

	const notificationSettings = notificationDefinitions[notify_type];

	const handleClick = () => {
		if (typeof window !== "undefined") {
			const redirectUrl = notificationSettings.getRedirectUrl(
				notification,
				routes,
				config,
			);

			if (redirectUrl?.pathname?.startsWith("http")) {
				window.location.href = redirectUrl.pathname;
			} else {
				navigate(redirectUrl);
			}
		}

		if (!is_opened) {
			api.create(`notifications/read/${id}`, {}).catch(() => {});
		}
	};

	return (
		<div
			className={styles.notificationItem}
			tabIndex="0"
			onClick={() => handleClick()}
		>
			<div
				data-tid={"action_view_notification"}
				className={cx(styles.notificationItemBody, {
					[styles.read]: is_opened || isRead,
				})}
			>
				<div
					data-tid={"action_view_notification"}
					className={styles.notificationImageContainer}
				>
					{notificationSettings.getImage(notification)}
				</div>
				<div
					data-tid={"action_view_notification"}
					className={styles.notificationItemContent}
				>
					<div data-tid={"action_view_notification"}>
						{notificationSettings.getContent(notification, intl)}
					</div>
					<div
						data-tid={"action_view_notification"}
						className={styles.notificationItemDate}
					>
						{relativeTime}
					</div>
				</div>
			</div>
		</div>
	);
};
