import React from 'react';
import PropTypes from "prop-types";
import { FormattedMessage } from 'react-intl';
import { Link } from '@logora/debate.action.link';
import cx from 'classnames';
import styles from './EmbedHeader.module.scss';

export const EmbedHeader = ({ title, titleRedirectUrl, headerLabel, onlineUsersCount, textLeft, className, withLogo, altLogo }) => {
    return (
		<div className={cx(styles.headerBox, className)}>
			{ headerLabel &&
				<div className={styles.headerBoxLabel}>
					<Link to={titleRedirectUrl} target="_top" external data-tid="link_debate_index_embed">
						{ withLogo ?
							<img loading={"lazy"} className={styles.headerLogo} src={withLogo} width={100} height={40} alt={altLogo} />
						:
							<div className={styles.headerLabelText}>
								{ headerLabel }
							</div>
						}
					</Link>
					{ onlineUsersCount ?
						<div className={styles.headerLiveStat}>
							<div className={styles.headerLiveNow}></div>
							<span className={styles.headerLivePin} data-testid={"online-users-count"}>
								<FormattedMessage id={"embed.embed_header.online_users"} values={{ count: onlineUsersCount }} defaultMessage="{count} online users" />
							</span>
							<span className={styles.headerLivePinMobile} data-testid={"online-users-count-mobile"}>
								<FormattedMessage id={"embed.embed_header.online"} values={{ count: onlineUsersCount }} defaultMessage="{count} online" />
							</span>
						</div>
					: null}
				</div>
			}
			<div className={cx(styles.debateName, { [styles.left]: textLeft})} data-testid={"debate-name"}>
				<Link className={styles.debateLink} to={titleRedirectUrl} target="_top" external data-tid="link_debate_title_embed" rel="">
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
	/** Custom EmbedHeader styles */
    className: PropTypes.object,
	/** Link of the image to display */
    withLogo: PropTypes.string,
	/** Alt of the logo */
    altLogo: PropTypes.string,
};