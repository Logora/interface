import React from 'react';
import { useRoutes } from '@logora/debate.data.config_provider';
import { useIntl } from 'react-intl';
import { Avatar } from '@logora/debate.user.avatar';
import { Link } from '@logora/debate.action.link';
import { PointIcon } from '@logora/debate.icons.regular_icons';
import { ExpertBadgeIcon } from '@logora/debate.icons.regular_icons';
import styles from './AuthorBox.module.scss';
import cx from 'classnames';
import PropTypes from 'prop-types';

export const AuthorBox = ({ 
        lastActivity, 
        avatarUrl, 
        fullName, 
        hashId, 
        isExpert = false, 
        points, 
        eloquenceTitle, 
        occupation, 
        disableLinks = false, 
        hideUserInfo = false, 
        linkClassName, 
        isDeleted = false 
    }) => {
    const intl = useIntl();
    const routes = useRoutes();
    const isOnline = (new Date(lastActivity) > Date.now());

    return (
        <div className={styles.authorBox}>
            { disableLinks  || isDeleted ?
                <Avatar data-tid={"action_view_argument_author_image"} avatarUrl={isDeleted ? null : avatarUrl} userName={fullName} isOnline={isOnline} size={48} />
            :
                <Link to={routes.userShowLocation.toUrl({ userSlug: hashId })} className={cx(styles.authorLink, linkClassName)}>
                    <Avatar data-tid={"action_view_argument_author_image"} avatarUrl={avatarUrl} userName={fullName} isOnline={isOnline} size={48} />
                </Link>
            }
            { (hideUserInfo !== true) &&
                <div className={styles.authorNameBox}>
                    <div className={styles.authorName}>
                        <div className={styles.authorNameLine}>
                            { disableLinks || isDeleted ?
                                <span className={styles.linkDisabled}>
                                    {isDeleted ? intl.formatMessage({ id: "info.deleted" }) : fullName}
                                </span>
                            :
                                <div className={cx(styles.authorLink, linkClassName)}>
                                    <Link data-tid={"action_view_argument_author_name"} to={routes.userShowLocation.toUrl({userSlug: hashId})}>
                                        { fullName }
                                    </Link>
                                </div>
                            }
                            { isExpert && !isDeleted &&
                                <div className={styles.expertContainer}>
                                    <span className={styles.expertBadge}>{ intl.formatMessage({ id: "user.isExpert", defaultMessage: "Journalist" }) }</span>
                                    <ExpertBadgeIcon width={16} />
                                </div>
                            }
                        </div>
                    </div>
                    { !isDeleted &&
                        <div className={styles.authorPointsBox}>
                            <div className={styles.authorPoints}>
                                <span>{points ? intl.formatNumber(points, { notation: 'compact', maximumFractionDigits: 1, roundingMode: "floor" }) : "0"}</span>
                                <PointIcon width={15} height={15} className={styles.pointIcon} />
                            </div>
                            { eloquenceTitle &&
                                <div className={styles.authorPoints}>
                                    <span>{ intl.formatMessage({ id: "badge." + eloquenceTitle + ".reward", defaultMessage: "Eloquence title" }) }</span>
                                </div>
                            }
                        </div>
                    }
                    { occupation && !isDeleted &&
                        <div className={styles.occupationBox}>
                            <span className={styles.authorPoints}>
                                { occupation }
                            </span>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

AuthorBox.propTypes = {
    /** User last activity time */
    lastActivity: PropTypes.any, 
    /** User avatar URL */
    avatarUrl: PropTypes.any,
    /** User first name and last name combined */
    fullName: PropTypes.any,
    /** User unique id */ 
    hashId: PropTypes.any,
    /** Whether an user has a special "expert" status or not */ 
    isExpert: PropTypes.any,
    /** User eloquence points total */ 
    points: PropTypes.any,
    /** User eloquence title */ 
    eloquenceTitle: PropTypes.any,
    /** User occupation as in profession */ 
    occupation: PropTypes.any,
    /** Should a click on the user redirect on his/her profile */ 
    disableLinks: PropTypes.any,
    /** Should user information be displayed to everybody */ 
    hideUserInfo: PropTypes.any,
    /** deprecated */ 
    linkClassName: PropTypes.any,
    /** Give information about the current status of the content displayed and whether to show the user as deleted or not */ 
    isDeleted: PropTypes.any
}