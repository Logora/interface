import React from "react";
import { useRelativeTime } from "@logora/debate.hooks.use_relative_time";
import { AuthorBox } from '@logora/debate.user.author_box';
import { UserBoxSmall } from '@logora/debate.user.user_box_small';
import { Icon } from '@logora/debate.icons.icon';
import { useIntl } from "react-intl";
import { useConfig } from '@logora/debate.data.config_provider';
import cx from "classnames";
import styles from "./ContentHeader.module.scss";
import PropTypes from "prop-types";

export const ContentHeader = ({ author, tag, tagClassName, date, oneLine = false, disableLinks = false, selectedContent = false, isDeleted = false, moderationReason,
	moderationNotes, moderationPolicyUrl, showModerationFeedback = false }) => {
	const relativeTime = useRelativeTime(new Date(date).getTime());
	const intl = useIntl();
	const config = useConfig();

	return (
		<div className={styles.contentHeaderContainer}>
			{showModerationFeedback && (
				<div className={styles.moderationInfo}>
					<div className={styles.moderationReason}>
						<Icon name="announcement" width={18} height={18} className={styles.warningIcon} />
						{intl.formatMessage({
							id: "user_content.content_header.moderation_reason",
							defaultMessage: "Content rejected by moderation."
						})}
						{" "}
						{moderationReason && intl.messages[`user_content.content_header.moderation_reason.${moderationReason.toLowerCase()}`]
							? intl.formatMessage({
								id: `user_content.content_header.moderation_reason.${moderationReason.toLowerCase()}`,
								defaultMessage: ""
							})
							: null
						}
					</div>
					{moderationNotes && (
						<div>
							{intl.formatMessage(
								{
									id: "user_content.content_header.moderation_notes",
									defaultMessage: "Moderation Notes: {notes}",
								},
								{ notes: moderationNotes }
							)}
						</div>
					)}
					{moderationPolicyUrl && (
						<div>
							{intl.formatMessage(
								{
									id: "user_content.content_header.moderationPolicyUrl",
									defaultMessage: "Please keep contributions respectful. See rules:"
								}
							)} <a href={moderationPolicyUrl} target="_blank" rel="noopener noreferrer" className={styles.moderationLink} >
								{intl.formatMessage({ id: "user_content.content_header.moderation_policy_link", defaultMessage: "moderation policy" })}
							</a>
						</div>
					)}
				</div>
			)}
			{selectedContent && !isDeleted &&
				<div className={styles.selectedContent}>
					<Icon name="expertBadge" width={18} height={18} />
					{intl.formatMessage({ id: "user_content.content_header.selected", defaultMessage: "Selected by editor" })}
				</div>
			}
			<div className={styles.contentHeader}>
				<div className={styles.contentHeaderAuthorBox}>
					{oneLine === true ?
						<UserBoxSmall userName={author.full_name} avatarUrl={author.image_url} userSlug={author.hash_id} />
						:
						<AuthorBox
							fullName={author.full_name}
							avatarUrl={author.image_url}
							points={author.role === "contributor" ? author.points : null}
							slug={author.hash_id}
							lastActivity={author.last_activity}
							occupation={author.occupation}
							eloquenceTitle={author.eloquence_title}
							showBadge={author.role === "editor" || author.role === "moderator"}
							disableLinks={disableLinks}
							isDeleted={isDeleted}
							language={config?.translation?.enable === true ? `${author.language}` : null}
							languageDialect={config?.translation?.dialect || null}
						/>
					}
				</div>
				<div className={styles.contentHeaderRight}>
					{tag &&
						<div className={cx(styles.contentHeaderTagBox, tagClassName)}>
							<div className={styles.contentHeaderTag} title={tag}>
								{tag}
							</div>
						</div>
					}
					{!date || oneLine ? null :
						<div data-testid={"content-header-date"} className={cx(styles.contentHeaderDate)}>
							{relativeTime}
						</div>
					}
				</div>
			</div>
		</div>
	);
}

ContentHeader.propTypes = {
	/** An object containing the `full_name`, `image_url`, `slug` and `points` of the author */
	author: PropTypes.object.isRequired,
	/** The tag associated with the argument */
	tag: PropTypes.string,
	/** A custom class name for the tag container */
	tagClassName: PropTypes.string,
	/** The date the argument was posted */
	date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
	/** If `true`, will render the author box in a single line  */
	oneLine: PropTypes.bool,
	/** If `true`, will disable the links to the author profile */
	disableLinks: PropTypes.bool,
	/** If `true`, will add selected argument div to header */
	selectedContent: PropTypes.bool,
	/** If `true`, will display the deleted content style */
	isDeleted: PropTypes.bool,
	/** Reason for moderation */
	moderationReason: PropTypes.string,
	/** Notes related to moderation */
	moderationNotes: PropTypes.string,
	/** Charte of moderation */
	moderationPolicyUrl: PropTypes.string,
};
