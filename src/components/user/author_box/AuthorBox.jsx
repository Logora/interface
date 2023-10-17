import React from 'react';
import { useRoutes } from '@logora/debate.data.config_provider';
import { useIntl } from 'react-intl';
import { Avatar } from '@logora/debate.user.avatar';
import { PointIcon } from '@logora/debate.icons';
import { Link } from '@logora/debate.action.link';
import { ExpertBadgeIcon } from '@logora/debate.icons';
import styles from './AuthorBox.module.scss';
import cx from 'classnames';

export const AuthorBox = ({ author, disableLinks, hideUserInfo, showDescription, isReply, isDeleted = false }) => {
    const intl = useIntl();
    const routes = useRoutes();
    const isOnline = (new Date(author.last_activity) > Date.now());

    return (
        <div className={styles.authorBox}>
            { disableLinks || !author.slug  || isDeleted ?
                <Avatar data-tid={"action_view_argument_author_image"} avatarUrl={isDeleted ? null : author.image_url} userName={author.full_name} isOnline={isOnline} size={48} />
            :
                <Link to={routes.userShowLocation.toUrl({userSlug: author.hash_id})} className={cx(styles.authorLink, {[styles.isReply]: isReply})}>
                    <Avatar data-tid={"action_view_argument_author_image"} avatarUrl={author.image_url} userName={author.full_name} isOnline={isOnline} size={48} />
                </Link>
            }
            { (hideUserInfo !== true) &&
                <div className={styles.authorNameBox}>
                    <div className={styles.authorName}>
                        <div className={styles.authorNameLine}>
                            { disableLinks || !author.slug || isDeleted ?
                                <span className={styles.linkDisabled}>
                                    {isDeleted ? intl.formatMessage({ id: "info.deleted" }) : author.full_name}
                                </span>
                            :
                                <div className={cx(styles.authorLink, {[styles.isReply]: isReply})}>
                                    <Link data-tid={"action_view_argument_author_name"} to={routes.userShowLocation.toUrl({userSlug: author.hash_id})}>
                                        { author.full_name }
                                    </Link>
                                </div>
                            }
                            { author.is_expert && !isDeleted &&
                                <div className={styles.expertContainer}>
                                    <span className={styles.expertBadge}>{ intl.formatMessage({ id: "user.is_expert", defaultMessage: "Journalist" }) }</span>
                                    <ExpertBadgeIcon width={16} />
                                </div>
                            }
                        </div>
                    </div>
                    { !isDeleted &&
                        <div className={styles.authorPointsBox}>
                            { showDescription ?
                                <>
                                    { author.description }
                                </>
                            :  
                                <>
                                    <div className={styles.authorPoints}>
                                        <span>{author.points ? intl.formatNumber(author.points, { notation: 'compact', maximumFractionDigits: 1, roundingMode: "floor" }) : "0"}</span>
                                        <PointIcon width={15} height={15} className={styles.pointIcon} />
                                    </div>
                                    { author.eloquence_title &&
                                        <div className={styles.authorPoints}>
                                            <span>{ intl.formatMessage({ id: "badge." + author.eloquence_title + ".reward", defaultMessage: "Eloquence title" }) }</span>
                                        </div>
                                    }
                                </>
                            }
                        </div>
                    }
                    { author.occupation && !isDeleted &&
                        <div className={styles.occupationBox}>
                            <span className={styles.authorPoints}>
                                { author.occupation }
                            </span>
                        </div>
                    }
                </div>
            }
        </div>
    )
}