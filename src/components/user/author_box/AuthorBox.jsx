import React from 'react';
import { useRoutes } from '@logora/debate.data.config_provider';
import { useIntl, FormattedMessage } from 'react-intl';
import { Avatar } from '@logora/debate.user.avatar';
import { Link } from '@logora/debate.action.link';
import { Icon } from '@logora/debate.icons.icon';
import { getLocaleIcon } from '@logora/debate.util.lang_emojis';
import styles from './AuthorBox.module.scss';
import PropTypes from 'prop-types';
import cx from 'classnames';

export const AuthorBox = ({
    fullName,
    slug,
    avatarUrl,
    lastActivity,
    showBadge = false,
    points = 0,
    eloquenceTitle,
    occupation,
    disableLinks = false,
    isDeleted = false,
    language = null,
    languageDialect = null,
}) => {
    const intl = useIntl();
    const routes = useRoutes();
    const isOnline = (new Date(lastActivity) > Date.now());

    return (
        <div className={cx(styles.authorBox, "author-box")}>
            {!slug || disableLinks || isDeleted ?
                <Avatar avatarUrl={isDeleted ? null : avatarUrl} userName={fullName} isOnline={isOnline} size={48} />
                :
                <Link to={routes.userShowLocation.toUrl({ userSlug: slug })} className={styles.authorLink}>
                    <Avatar avatarUrl={avatarUrl} userName={fullName} isOnline={isOnline} size={48} />
                </Link>
            }
            <div className={styles.authorNameBox}>
                <div className={styles.authorName}>
                    <div className={styles.authorNameLine}>
                        {!slug || disableLinks || isDeleted ?
                            <span className={cx(styles.authorLink, { [styles.deleted]: isDeleted, [styles.linkDisabled]: !slug || disableLinks })}>
                                {isDeleted ? intl.formatMessage({ id: "user.author_box.deleted", defaultMessage: "Deleted" }) : fullName}
                            </span>
                            :
                            <div className={styles.authorLink}>
                                <Link to={routes.userShowLocation.toUrl({ userSlug: slug })}>
                                    {fullName}
                                </Link>
                            </div>
                        }
                        {showBadge && !isDeleted &&
                            <div className={styles.expertContainer}>
                                <Icon name="expertBadge" width={14} height={14} />
                                <span className={styles.expertBadge}>{intl.formatMessage({ id: "user.author_box.expert", defaultMessage: "Journalist" })}</span>
                            </div>
                        }
                        {language && languageDialect &&
                            <div className={styles.languageContainer}>
                                {getLocaleIcon(language, languageDialect)}
                            </div>
                        }
                    </div>
                </div>
                {!isDeleted &&
                    <>
                        <div className={styles.authorPointsBox}>
                            {points != null &&
                                <div className={styles.authorPoints} aria-label={intl.formatMessage({ id: "user.author_box.points", defaultMessage: "User points" })}>
                                    <span>
                                        {intl.formatNumber(points, { notation: 'compact', maximumFractionDigits: 1, roundingMode: "floor" })}
                                        {" "}
                                        <FormattedMessage
                                            id="user.author_box.points"
                                            defaultMessage={"points"}
                                            values={{ count: points }}
                                        />
                                    </span>
                                </div>
                            }
                            {eloquenceTitle &&
                                <>
                                    <span className={styles.separator}></span>
                                    <div className={styles.authorEloquence}>
                                        <span>{intl.formatMessage({ id: "gamification.badge_box." + eloquenceTitle + ".reward", defaultMessage: "Eloquence title" })}</span>
                                    </div>
                                </>
                            }
                        </div>
                        {occupation &&
                            <div className={styles.occupationBox}>
                                <span className={styles.authorPoints}>
                                    {occupation}
                                </span>
                            </div>
                        }
                    </>
                }
            </div>
        </div>
    )
};

AuthorBox.propTypes = {
    /** User first name and last name combined */
    fullName: PropTypes.string,
    /** User avatar URL */
    avatarUrl: PropTypes.string,
    /** User slug used in the router link */
    slug: PropTypes.string,
    /** User last activity date time */
    lastActivity: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    /** Whether an user has a special status or not */
    showBadge: PropTypes.bool,
    /** User eloquence points total */
    points: PropTypes.number,
    /** User eloquence title */
    eloquenceTitle: PropTypes.string,
    /** User occupation as in profession */
    occupation: PropTypes.string,
    /** Should a click on the user redirect on his/her profile */
    disableLinks: PropTypes.bool,
    /** Give information about the current status of the content displayed and whether to show the user as deleted or not */
    isDeleted: PropTypes.bool,
    /** User language */
    language: PropTypes.string
}
