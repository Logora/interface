import React from 'react';
import { ProgressBar } from "@logora/debate.progress.progress_bar";
import styles from './BadgeBox.module.scss';
import cx from 'classnames';
import PropTypes from "prop-types";
import { useIntl, FormattedMessage } from "react-intl";

export const BadgeBox = ({ badge, eloquenceTitle }) => {
    const intl = useIntl();

    return (
        <div className={styles.badgeBox}>
            <div className={cx(styles.badgeLevel, styles[`level-${badge.badge.level}`])}>
                <FormattedMessage id="gamification.badge_box.level" values={{ count: badge.badge.level  }} defaultMessage="Level {count}" />
            </div>
            <div className={styles.badgeImageBox}>
                <img className={styles.badgeImage} src={badge.badge.icon_url} loading={"lazy"} width={80} height={80} title={badge.badge.title} alt={`Badge ${badge.badge.title}`} />
            </div>
            <div className={styles.badgeName}>
                { intl.formatMessage({ id: `gamification.badge.${badge.badge.name}.title`, defaultMessage: "Contributor" }) }
            </div>
            <div className={styles.badgeDescription}>
                <FormattedMessage id={`gamification.badge_box.${badge.badge.name}.description`} values={{ count: badge.badge.steps }} defaultMessage="Write {count} arguments with a relevance score of at least 75" />
            </div>
            <div className={styles.badgeProgressContainer}>
                {badge.progress >= badge.badge.steps ?
                    <span>{ intl.formatMessage({ id: "gamification.badge_box.completed", defaultMessage: "Completed !" }) }</span>
                :
                    <span>{badge.progress + "/" + badge.badge.steps}</span>
                }
                <ProgressBar 
                    progress={badge.progress} 
                    goal={badge.badge.steps} 
                    className={styles.badgeProgress} 
                    innerClassName={cx(styles.badgeProgressBar, styles[`level-${badge.badge.level}`])} 
                />
            </div>
            { badge.badge.next_title_level !== null &&
                <div className={cx(styles.badgeReward, {[styles.rewardObtained]: badge.progress >= badge.badge.steps, [styles.rewardShown]: eloquenceTitle === badge.badge.name})} data-testid="badge-reward">
                    <span>
                        {eloquenceTitle === badge.badge.name ? 
                            intl.formatMessage({ id: "gamification.badge_box.title_shown", defaultMessage: "Title shown :" }) 
                        : 
                            badge.progress >= badge.badge.steps ? 
                                intl.formatMessage({ id: "gamification.badge_box.title_obtained", defaultMessage: "Title obtained :" }) 
                            : 
                                <FormattedMessage id="gamification.badge_box.title" values={{ variable: badge.badge.next_title_level  }} defaultMessage="At level {variable} you will get the title :" /> 
                        }
                    </span>
                    <span className={styles.rewardName}>&quot;{ intl.formatMessage({ id: `gamification.badge_box.${badge.badge.name}.reward`, defaultMessage: "Dialogue pro" })}&quot;</span>
                </div>
            }
        </div>
    );
}

BadgeBox.propTypes = {
    /** Badge informations */
    badge: PropTypes.object.isRequired,
    /** User title */
    eloquenceTitle: PropTypes.string,
};
