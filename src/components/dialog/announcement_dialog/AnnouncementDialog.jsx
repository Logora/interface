import { Icon } from "@logora/debate/icons/icon";
import cx from "classnames";
import React from "react";
import styles from "./AnnouncementDialog.module.scss";

export const AnnouncementDialog = ({
	message,
	icon: CustomIcon,
	fullWidth = false,
	className,
	iconClassName,
	children,
}) => {
	return (
		<div
			className={cx(styles.container, className, {
				[styles.fullWidth]: fullWidth,
			})}
			role="status"
		>
			<div className={cx(styles.icon, iconClassName)}>
				{CustomIcon ? (
					<CustomIcon height={24} width={24} data-testid={"custom-icon"} />
				) : (
					<Icon
						name="announcement"
						height={24}
						width={24}
						aria-hidden="true"
						data-testid={"announcement-icon"}
					/>
				)}
			</div>
			<div className={styles.content}>{message ? message : children}</div>
		</div>
	);
};
