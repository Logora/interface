import React from 'react';
import PropTypes from "prop-types";
import { FormattedMessage } from 'react-intl';
import { Link } from '@logora/debate.action.link';
import cx from 'classnames';
import styles from './EmbedHeader.module.scss';

export const EmbedHeader = ({title, titleRedirectUrl, headerLabel, onlineUsersCount, textLeft, isSmallPadding}) => {
    return (
		<div className={styles.headerBox}>
			<div className={styles.headerBoxLabel}>
				<Link to={titleRedirectUrl} target="_top" external data-tid="link_debate_index_embed">
					<div className={styles.headerLabelText}>
                        {headerLabel}
					</div>
				</Link>
				{ onlineUsersCount ?
					<div className={styles.headerLiveStat}>
						<div className={styles.headerLiveNow}></div>
						<span className={styles.headerLivePin} data-testid={"online-users-count"}>
							{onlineUsersCount} <FormattedMessage id={"info.online_users"} values={{ count: onlineUsersCount }} defaultMessage="utilisateurs en ligne" />
						</span>
						<span className={styles.headerLivePinMobile} data-testid={"online-users-count-mobile"}>
							{onlineUsersCount} <FormattedMessage id={"info.online"} values={{ variable: onlineUsersCount }} defaultMessage="utilisateurs en ligne" />
						</span>
					</div>
				: null}
			</div>
			<div className={cx(styles.debateName, { [styles.left]: textLeft, [styles.smallPadding]: isSmallPadding })} data-testid={"debate-name"}>
				<Link className={styles.debateLink} to={titleRedirectUrl} target="_top" external data-tid="link_debate_title_embed">
					{ title }
				</Link>
			</div>
		</div>
    );
}

EmbedHeader.propTypes = {
    /** EmbedHeader title */
    title: PropTypes.string,
    /**  EmbedHeader url redirect */
    titleRedirectUrl: PropTypes.string,
    /** HeaderLabel text */
    headerLabel: PropTypes.string,
    /** Number of online users */
    onlineUsersCount: PropTypes.number,
    /** If true, title will be align with headerLabel text */
    textLeft: PropTypes.bool,
    /**  If true, title padding will be smaller */
    isSmallPadding: PropTypes.bool
};