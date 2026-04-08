import React from "react";
import { useRelativeTime } from "@logora/debate/hooks/use_relative_time";
import { AuthorBox } from '@logora/debate/user/author_box';
import { UserBoxSmall } from '@logora/debate/user/user_box_small';
import { Icon } from '@logora/debate/icons/icon';
import { useIntl } from "react-intl";
import { useConfig } from '@logora/debate/data/config_provider';
import cx from "classnames";
import styles from "./ContentHeader.module.scss";

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
						<div data-testid={"content-header-date"} className={cx(styles.contentHeaderDate)} aria-label={intl.formatMessage({ id: "user_content.content_header.date", defaultMessage: "Publication date"})}>
							{relativeTime}
						</div>
					}
				</div>
			</div>
		</div>
	);
}

