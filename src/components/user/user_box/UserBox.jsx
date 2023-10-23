import React from 'react';
import { useRoutes } from '@logora/debate.data.config_provider';
import { FormattedMessage } from 'react-intl';
import { Avatar } from '@logora/debate.user.avatar';
import { Link } from 'react-router-dom';
import styles from './UserBox.module.scss';
import PropTypes from 'prop-types';

export const UserBox = ({ user }) => {
  const routes = useRoutes();

  return (
		<div className={styles.userBox}>
			<div className={styles.userBoxHeader}>
				<Link to={routes.userShowLocation.toUrl({userSlug: user.hash_id})}>
					<Avatar data-tid={"action_view_user_image"} userName={user.full_name} avatarUrl={user.image_url} isOnline={(new Date(user.last_activity) > Date.now() )} size={60} />
				</Link>
			</div>
			<div className={styles.userBoxDescription}>
				<Link to={routes.userShowLocation.toUrl({userSlug: user.hash_id})}>
					<div data-tid={"action_view_user_name"} className={styles.userBoxName} title={user.full_name}>
						{user.full_name}
					</div>
				</Link>
				<Link to={routes.userShowLocation.toUrl({userSlug: user.hash_id})} hash={"activity"}>
					<div className={styles.userBoxPoints}>
						<span>
							<FormattedMessage id="user.user_box.points" values={{ count: user.points }} defaultMessage="{count} points" />
						</span>
					</div>
				</Link>
				<Link to={routes.userShowLocation.toUrl({userSlug: user.hash_id})}>
					<div className={styles.userBoxStats}>
						<div className={styles.userDebates}>
							<FormattedMessage id="user.user_box.user_arguments" values={{ count: user.messages_count }} defaultMessage="{count} arguments" />
						</div>
						<div className={styles.userVotes}>
							<FormattedMessage id="user.user_box.user_votes" values={{ count: user.upvotes }} defaultMessage="{count} votes" />
						</div>
					</div>
				</Link>
			</div>
		</div>
	);
}

UserBox.propTypes = {
    /** User object, must contains : image_url, last_activity, full_name, points, hash_id, messages_count, upvotes */
    user: PropTypes.object,
}