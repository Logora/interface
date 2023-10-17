import React from "react";
import { useRoutes } from '@logora/debate.data.config_provider';
import { Link } from '@logora/debate.action.link';
import { Avatar } from '@logora/debate.user.avatar';
import styles from "./UserBoxSmall.module.scss";
import PropTypes from 'prop-types';

export const UserBoxSmall = ({ userName, avatarUrl, userSlug }) => {
    const routes = useRoutes();

    return (
        <div className={styles.authorContainer}>
            <Link to={routes.userShowLocation.toUrl({ userSlug: userSlug })} className={styles.authorLink} target="_top">
                <Avatar avatarUrl={avatarUrl} userName={userName} size={25} />
            </Link>
            <div className={styles.authorName}>
                <Link to={routes.userShowLocation.toUrl({ userSlug: userSlug })} className={styles.authorLink} target="_top">
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