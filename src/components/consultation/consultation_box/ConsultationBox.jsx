import React, { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { useRelativeTime } from '@logora/debate.hooks.use_relative_time';
import { Icon } from "@logora/debate.icons.icon";
import { Link } from 'react-router-dom';
import { ProgressBar } from "@logora/debate.progress.progress_bar";
import { useResponsive } from "@logora/debate.hooks.use_responsive";
import { useRoutes } from '@logora/debate.data.config_provider';
import { TranslatedContent } from '@logora/debate.translation.translated_content';
import styles from './ConsultationBox.module.scss';
import cx from 'classnames';
import PropTypes from "prop-types";

export const ConsultationBox = ({ consultation }) => {
    const date = useMemo(() => new Date());
    const endDate = new Date(consultation.ends_at);
    const remainingTime = useRelativeTime(endDate.getTime());
    const routes = useRoutes();
    const { isMobile } = useResponsive();

    const displayRemainingTime = () => {
        if( endDate < date ) {
            return <span><FormattedMessage id="consultation.consultation_box.consultation_ended" defaultMessage={"Consultation ended"}/></span>;
        } else {
            return <>
                <span><FormattedMessage id="consultation.consultation_box.in_progress" defaultMessage={"Consultation in progress"}/> - </span>
                <span>{ remainingTime }</span>
            </>;
        }
    }

    return (
        <>
            <div className={styles.container}>
                <Link to={routes.consultationShowLocation.toUrl({ consultationSlug: consultation.slug })}>
                    <img loading={"lazy"} className={styles.consultationImage} src={consultation.image_url} />
                </Link>
                { consultation.ends_at && 
                    <div className={cx(styles.consultationTime, {[styles.ended]: endDate < date})}>
                        {displayRemainingTime()}
                    </div>
                }
                <Link to={routes.consultationShowLocation.toUrl({ consultationSlug: consultation.slug })}>
                    <div className={styles.consultationTitle}>
                        <TranslatedContent 
                            originalContent={consultation.title}
                            originalLanguage={consultation.language}
                            targetField={"title"}
                            translations={consultation.translation_entries}
                        />
                    </div>
                </Link>
                <Link to={routes.consultationShowLocation.toUrl({ consultationSlug: consultation.slug })}>
                    <div className={styles.consultationButtonContainer}>
                        { consultation.ends_at && (endDate < date) ?
                            <span><FormattedMessage id="consultation.consultation_box.action_show_result" defaultMessage={"Show result"} /></span>
                        :
                            <span><FormattedMessage id="consultation.consultation_box.action_consultation_participate" defaultMessage={"Participate"} /></span>
                        }
                        <Icon name="arrow" width={18} height={18} className={styles.arrowIcon} />
                    </div>
                </Link>
                <div className={styles.consultationInformations}>
                    <div className={styles.consultationLeft}>
                        <div className={cx(styles.consultationGroupInformation, styles.consultationGroupRight)}>
                            <span className={styles.consultationTextInformation}>{consultation.proposals_count}</span>
                            <Icon name="chat" width={15} height={20} />
                        </div>
                        <div className={styles.consultationGroupInformation}>
                            <span className={styles.consultationTextInformation}>{consultation.total_participants}</span>
                            <Icon name="user" width={15} height={20} />
                        </div>
                    </div>
                    { consultation.vote_goal > 0 &&
                        <div className={cx(styles.consultationGroupInformation, styles.progressBarContainer)}>
                            {endDate < date ?
                                <FormattedMessage id="consultation.consultation_box.stats_votes" values={{ votesCount: consultation.total_votes }} defaultMessage={"{votesCount} votes"} />
                            :
                                <ProgressBar 
                                    className={styles.progress} 
                                    innerClassName={styles.bar} 
                                    progress={consultation.total_votes} 
                                    goal={consultation.vote_goal}
                                    showProgressSubtitle={true}
                                    progressUnit={"votes"}
                                />
                            }
                        </div>
                    }
                </div>
            </div>
        </>
    );
};

ConsultationBox.propTypes = {
    /** A consultation object gathering all the consultation infos */
    consultation: PropTypes.object.isRequired,
};