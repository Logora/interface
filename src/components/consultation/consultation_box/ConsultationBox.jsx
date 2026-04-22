import { Link } from "@logora/debate/action/link";
import { useRoutes } from "@logora/debate/data/config_provider";
import { useRelativeTime } from "@logora/debate/hooks/use_relative_time";
import { useResponsive } from "@logora/debate/hooks/use_responsive";
import { Icon } from "@logora/debate/icons/icon";
import { ProgressBar } from "@logora/debate/progress/progress_bar";
import { TranslatedContent } from "@logora/debate/translation/translated_content";
import cx from "classnames";
import React, { useMemo } from "react";
import { useIntl } from "react-intl";
import { FormattedMessage } from "react-intl";
import styles from "./ConsultationBox.module.scss";

export const ConsultationBox = ({ consultation, showVoteProgress = true }) => {
	const intl = useIntl();
	const date = useMemo(() => new Date());
	const endDate = new Date(consultation.ends_at);
	const remainingTime = useRelativeTime(endDate.getTime());
	const routes = useRoutes();
	const { isMobile } = useResponsive();

	const displayRemainingTime = () => {
		if (endDate < date) {
			return (
				<span>
					<FormattedMessage
						id="consultation.consultation_box.consultation_ended"
						defaultMessage={"Consultation ended"}
					/>
				</span>
			);
		} else {
			return (
				<>
					<span>{remainingTime}</span>
				</>
			);
		}
	};

	return (
		<>
			<div className={styles.container}>
				<div className={styles.consultationImageBox}>
					<Link
						to={routes.consultationShowLocation.toUrl({
							consultationSlug: consultation.slug,
						})}
					>
						<img
							loading={"lazy"}
							className={styles.consultationImage}
							src={consultation.image_url}
							alt={intl.formatMessage({
								id: "consultation.consultation_box.alt",
								defaultMessage: "Presentation image for the consultation",
							})}
						/>
					</Link>
					{consultation.ends_at && (
						<div
							className={cx(styles.consultationTime, {
								[styles.ended]: endDate < date,
							})}
						>
							{displayRemainingTime()}
						</div>
					)}
				</div>
				<Link
					to={routes.consultationShowLocation.toUrl({
						consultationSlug: consultation.slug,
					})}
				>
					<div className={styles.consultationTitle}>
						<TranslatedContent
							originalContent={consultation.title}
							originalLanguage={consultation.language}
							targetField={"title"}
							translations={consultation.translation_entries}
						/>
					</div>
				</Link>
				<Link
					to={routes.consultationShowLocation.toUrl({
						consultationSlug: consultation.slug,
					})}
				>
				</Link>
				<div className={styles.consultationInformations}>
					<div className={styles.consultationLeft}>
						<div
							className={cx(
								styles.consultationGroupInformation,
								styles.consultationGroupRight,
							)}
						>
							<span className={styles.consultationTextInformation}>
								{consultation.total_votes}
							</span>
							<Icon name="votebox" width={15} height={20} />
						</div>
						<div className={styles.consultationGroupInformation}>
							<span className={styles.consultationTextInformation}>
								{consultation.proposals_count}
							</span>
							<Icon name="chat" width={15} height={20} />
						</div>
					</div>
					{showVoteProgress && consultation.vote_goal > 0 && endDate > date && (
						<div
							className={cx(
								styles.consultationGroupInformation,
								styles.progressBarContainer,
							)}
						>
							<ProgressBar
								className={styles.progress}
								innerClassName={styles.bar}
								progress={consultation.total_votes}
								goal={consultation.vote_goal}
								showProgressSubtitle={true}
								progressUnit={"votes"}
							/>
						</div>
					)}
				</div>
			</div>
		</>
	);
};
