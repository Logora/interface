import { Button } from "@logora/debate/action/button";
import { Tooltip } from "@logora/debate/dialog/tooltip";
import { useFollow } from "@logora/debate/follow/use_follow";
import cx from "classnames";
import React from "react";
import { useIntl } from "react-intl";
import styles from "./FollowButton.module.scss";

export const FollowButton = ({
	followableType,
	followableId,
	tooltipText,
	dataTid,
	noBorder,
}) => {
	const intl = useIntl();
	const { followActive, handleFollow } = useFollow(
		followableType,
		followableId,
	);

	return (
		<Tooltip text={tooltipText}>
			<Button
				data-tid={dataTid}
				className={cx(styles.followUserButton, {
					[styles.followUserButtonNoBorder]: noBorder,
				})}
				active={noBorder || followActive}
				handleClick={handleFollow}
				data-testid={"button"}
				border={false}
			>
				{!followActive && noBorder && (
					<span className={styles.followIcon}>+</span>
				)}
				{followActive ? (
					<span data-testid={"followed"}>
						{intl.formatMessage({
							id: "follow.followed",
							defaultMessage: "Followed",
						})}
					</span>
				) : (
					<span data-testid={"follow"}>
						{intl.formatMessage({
							id: "follow.follow",
							defaultMessage: "Follow",
						})}
					</span>
				)}
				{!followActive && !noBorder && (
					<span className={styles.followIcon}>+</span>
				)}
			</Button>
		</Tooltip>
	);
};
