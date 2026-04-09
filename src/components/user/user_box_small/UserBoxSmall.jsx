import { Link } from "@logora/debate/action/link";
import { useRoutes } from "@logora/debate/data/config_provider";
import { Avatar } from "@logora/debate/user/avatar";
import cx from "classnames";
import React from "react";
import { useIntl } from "react-intl";
import styles from "./UserBoxSmall.module.scss";

export const UserBoxSmall = ({ userName, avatarUrl, userSlug }) => {
	const intl = useIntl();
	const routes = useRoutes();

	return (
		<div className={cx(styles.authorContainer, "author-box")}>
			<Link
				to={routes.userShowLocation.toUrl({ userSlug: userSlug })}
				className={styles.authorLink}
				target="_top"
				aria-label={intl.formatMessage({
					id: "user.user_box_small.author_link.aria_label",
					defaultMessage: "View profile",
				})}
			>
				<Avatar avatarUrl={avatarUrl} userName={userName} size={25} />
			</Link>
			<div className={styles.authorName}>
				<Link
					to={routes.userShowLocation.toUrl({ userSlug: userSlug })}
					className={styles.authorLink}
					target="_top"
					aria-label={intl.formatMessage({
						id: "user.user_box_small.author_link.aria_label",
						defaultMessage: "View profile",
					})}
				>
					{userName}
				</Link>
			</div>
		</div>
	);
};
