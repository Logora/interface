import React from "react";
import { useIntl } from 'react-intl';
import { useRoutes } from '@logora/debate.data.config_provider';
import { Link } from '@logora/debate.action.link';
import { Avatar } from '@logora/debate.user.avatar';
import styles from "./UserBoxSmall.module.scss";
import PropTypes from 'prop-types';
import cx from 'classnames';

export const UserBoxSmall = ({ userName, avatarUrl, userSlug }) => {
    const intl = useIntl();
    const routes = useRoutes();

    return (
        <div className={cx(styles.authorContainer, "author-box")}>
            <Link to={routes.userShowLocation.toUrl({ userSlug: userSlug })} className={styles.authorLink} target="_top" aria-label={intl.formatMessage({ id: "user.user_box_small.author_link.aria_label", defaultMessage: "View profile" })}
 >
                <Avatar avatarUrl={avatarUrl} userName={userName} size={25}  />
            </Link>
            <div className={styles.authorName}>
                <Link to={routes.userShowLocation.toUrl({ userSlug: userSlug })} className={styles.authorLink} target="_top" aria-label={intl.formatMessage({ id: "user.user_box_small.author_link.aria_label", defaultMessage: "View profile" })}>
                    { userName }
                </Link>
            </div>
        </div>
    )
}

UserBoxSmall.propTypes = {
    /** User name */
    userName: PropTypes.string,
    /** User avatar URL */
    avatarUrl: PropTypes.string,
    /** User slug to be used in the link */
    userSlug: PropTypes.string
}