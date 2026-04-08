import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from '@logora/debate/action/link';
import cx from 'classnames';
import styles from './EmbedHeader.module.scss';

export const EmbedHeader = ({ title, titleRedirectUrl, headerLabel, onlineUsersCount, textLeft, className, logoUrl, logoAlt }) => {
    return (
		<div className={cx(styles.headerBox, className)}>
			{ headerLabel &&
				<div className={styles.headerBoxLabel}>
					<Link to={titleRedirectUrl} target="_top" external data-tid="link_debate_index_embed" rel="nofollow">
						{ logoUrl ?
							<img loading={"lazy"} className={styles.headerLogo} src={logoUrl} width={100} height={40} alt={logoAlt} />
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
			<div className={cx(styles.debateName, { [styles.left]: textLeft, [styles.debateNameWithLogo]: logoUrl})} data-testid={"debate-name"}>
				<Link className={styles.debateLink} to={titleRedirectUrl} target="_top" external data-tid="link_debate_title_embed" rel="nofollow">
					{ title }
				</Link>
			</div>
		</div>
    );
}

