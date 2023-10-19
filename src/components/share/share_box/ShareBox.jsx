import React from 'react';
import styles from './ShareBox.module.scss';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Tooltip } from '@logora/debate.dialog.tooltip';
import { Facebook, Twitter, Link, Mail, Code } from '@logora/debate.icons.regular_icons';
import { useIntl } from 'react-intl';
import PropTypes from "prop-types";

export const ShareBox = ({ tooltipPosition, shareUrl, shareTitle, shareText, shareCode, showShareCode }) => {
    const intl = useIntl();

    const toggleSharing = (targetUrl) => {
        if(typeof window !== 'undefined') {
            let newWindow = window.open();
            newWindow.opener = null;
            newWindow.referrer = null;
            newWindow.location = targetUrl;
        }
    }

    return (
        <div className={styles.shareBox}>
            <Tooltip text={intl.formatMessage({ id: "share.share_box.copy_to_clipboard", defaultMessage: "Copy to clipboard" })} onClickText={intl.formatMessage({ id: "share.share_box.link_copied", defaultMessage: "Link copied !" })} position={tooltipPosition}>
                <CopyToClipboard tabIndex="0" className={styles.linkCopyButton} text={shareUrl}>
                    <div>
                        <Link role="button" className={styles.linkCopyIcon} data-tid={"action_embed_code_clipboard"} width={20} height={20} />
                    </div>
                </CopyToClipboard>
            </Tooltip>
            <Tooltip text={intl.formatMessage({ id: "share.share_box.facebook_share", defaultMessage: "Share on Facebook" })} position={tooltipPosition}>
                <div onClick={() => toggleSharing("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(shareUrl))} className={styles.linkCopyButton} tabIndex={0}>
                    <Facebook role="button" data-tid={"action_share_debate_facebook"} width={20} height={20} />
                </div>
            </Tooltip>
            <Tooltip text={intl.formatMessage({ id: "share.share_box.twitter_share", defaultMessage: "Share on Twitter" })} position={tooltipPosition}>
                <div onClick={() => toggleSharing("https://twitter.com/intent/tweet?text=" + encodeURIComponent(shareTitle) + "&url=" + encodeURIComponent(shareUrl))} className={styles.linkCopyButton} tabIndex={0}>
                    <Twitter role="button" data-tid={"action_share_debate_twitter"} width={20} height={20} />
                </div>
            </Tooltip>
            <Tooltip text={intl.formatMessage({ id: "share.share_box.mail_share", defaultMessage: "Share by email" })} position={tooltipPosition}>
                <div onClick={() => toggleSharing("mailto:example@example.com?subject=" + shareTitle + "&body=" + shareText + "%0D%0A" + shareUrl)} className={styles.linkCopyButton} tabIndex={0}>
                    <Mail role="button" data-tid={"action_share_debate_mail"} width={20} height={20} />
                </div>
            </Tooltip>
            { showShareCode &&
                <Tooltip text={intl.formatMessage({ id:"share.share_box.embed_code_to_clipboard", defaultMessage: "Copy embed code" })} onClickText={intl.formatMessage({ id: "share.share_box.code_copied", defaultMessage: "Code copied !" })} position={tooltipPosition}>
                    <CopyToClipboard tabIndex="0" className={styles.codeCopyButton} text={shareCode}>
                        <div className={styles.codeIcon}>
                            <Code className={styles.codeIcon} role="button" data-tid={"action_embed_code_clipboard"} width={20} height={20} />
                        </div>
                    </CopyToClipboard>
                </Tooltip>
            }
        </div>
    );
};

ShareBox.propTypes = {
	/** Position of the tooltip */
	tooltipPosition: PropTypes.string,
	/** Url to share */
	shareUrl: PropTypes.string.isRequired,
	/** Title of the share */
	shareTitle: PropTypes.string.isRequired,
	/** Text of the share */
    shareText: PropTypes.string,
	/** Code to share */
	shareCode: PropTypes.string,
	/** If `true`, show copy code icon */
	showShareCode: PropTypes.bool,
};

ShareBox.defaultProps = {
	showShareCode: false,
}