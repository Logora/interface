import { useConfig } from "@logora/debate/data/config_provider";
import { ProgressBar } from "@logora/debate/progress/progress_bar";
import cx from "classnames";
import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import styles from "./BadgeBox.module.scss";

export const BadgeBox = ({
	icon_url,
	level,
	name,
	next_title_level,
	steps,
	title,
	progress,
	eloquenceTitle,
}) => {
	const intl = useIntl();
	const config = useConfig();
	const [badgeImageMissing, setBadgeImageMissing] = useState(false);

	const customBaseUrl = config?.badges?.baseUrl;
	const customImageUrl =
		customBaseUrl &&
		`${customBaseUrl.replace(/\/+$/, "")}/${name}.${
			config?.badges?.fileExtension || "png"
		}`;
	const badgeIconUrl = !badgeImageMissing && customImageUrl ? customImageUrl : icon_url;

	return (
		<div className={styles.badgeBox}>
			<div className={cx(styles.badgeLevel, styles[`level-${level}`])}>
				<FormattedMessage
					id="gamification.badge_box.level"
					values={{ count: level }}
					defaultMessage="Level {count}"
				/>
			</div>
			<div className={styles.badgeImageBox}>
				<img
					className={styles.badgeImage}
					src={badgeIconUrl}
					loading={"lazy"}
					width={80}
					height={80}
					title={title}
					alt={`Badge ${title}`}
					onError={() => setBadgeImageMissing(true)}
				/>
			</div>
			<div className={styles.badgeName}>
				{intl.formatMessage({
					id: `gamification.badge_box.${name}.title`,
					defaultMessage: "Contributor",
				})}
			</div>
			<div className={styles.badgeDescription}>
				<FormattedMessage
					id={`gamification.badge_box.${name}.description`}
					values={{ count: steps }}
					defaultMessage="Write {count} arguments with a relevance score of at least 75"
				/>
			</div>
			<div className={styles.badgeProgressContainer}>
				{progress >= steps ? (
					<span>
						{intl.formatMessage({
							id: "gamification.badge_box.completed",
							defaultMessage: "Completed !",
						})}
					</span>
				) : (
					<span>{progress + "/" + steps}</span>
				)}
				<ProgressBar
					progress={progress}
					goal={steps}
					className={styles.badgeProgress}
					innerClassName={cx(styles.badgeProgressBar, styles[`level-${level}`])}
				/>
			</div>
			{next_title_level !== null && (
				<div
					className={cx(styles.badgeReward, {
						[styles.rewardObtained]: progress >= steps,
						[styles.rewardShown]: eloquenceTitle === name,
					})}
					data-testid="badge-reward"
				>
					<span>
						{eloquenceTitle === name ? (
							intl.formatMessage({
								id: "gamification.badge_box.title_shown",
								defaultMessage: "Title shown :",
							})
						) : progress >= steps ? (
							intl.formatMessage({
								id: "gamification.badge_box.title_obtained",
								defaultMessage: "Title obtained :",
							})
						) : (
							<FormattedMessage
								id="gamification.badge_box.title"
								values={{ variable: next_title_level }}
								defaultMessage="At level {variable} you will get the title :"
							/>
						)}
					</span>
					<span className={styles.rewardName}>
						&quot;
						{intl.formatMessage({
							id: `gamification.badge_box.${name}.reward`,
							defaultMessage: "Dialogue pro",
						})}
						&quot;
					</span>
				</div>
			)}
		</div>
	);
};
