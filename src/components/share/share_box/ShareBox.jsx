import { Tooltip } from "@logora/debate/dialog/tooltip";
import { Icon } from "@logora/debate/icons/icon";
import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useIntl } from "react-intl";
import styles from "./ShareBox.module.scss";

export const ShareBox = ({
	tooltipPosition,
	shareUrl,
	shareTitle,
	shareText,
	shareCode,
	showShareCode = false,
}) => {
	const intl = useIntl();

	const toggleSharing = (targetUrl) => {
		if (typeof window !== "undefined") {
			const newWindow = window.open();
			newWindow.opener = null;
			newWindow.referrer = null;
			newWindow.location = targetUrl;
		}
	};

	return (
		<div className={styles.shareBox}>
			<Tooltip
				text={intl.formatMessage({
					id: "share.share_box.copy_to_clipboard",
					defaultMessage: "Copy to clipboard",
				})}
				onClickText={intl.formatMessage({
					id: "share.share_box.link_copied",
					defaultMessage: "Link copied !",
				})}
				position={tooltipPosition}
			>
				<CopyToClipboard
					tabIndex="0"
					className={styles.linkCopyButton}
					text={shareUrl}
				>
					<div>
						<Icon
							name="link"
							role="button"
							className={styles.linkCopyIcon}
							data-tid={"action_embed_code_clipboard"}
							width={20}
							height={20}
						/>
					</div>
				</CopyToClipboard>
			</Tooltip>
			<Tooltip
				text={intl.formatMessage({
					id: "share.share_box.facebook_share",
					defaultMessage: "Share on Facebook",
				})}
				position={tooltipPosition}
			>
				<div
					onClick={() =>
						toggleSharing(
							"https://www.facebook.com/sharer/sharer.php?u=" +
								encodeURIComponent(shareUrl),
						)
					}
					className={styles.linkCopyButton}
					tabIndex={0}
				>
					<Icon
						name="facebook"
						role="button"
						data-tid={"action_share_debate_facebook"}
						width={20}
						height={20}
					/>
				</div>
			</Tooltip>
			<Tooltip
				text={intl.formatMessage({
					id: "share.share_box.twitter_share",
					defaultMessage: "Share on Twitter",
				})}
				position={tooltipPosition}
			>
				<div
					onClick={() =>
						toggleSharing(
							"https://twitter.com/intent/tweet?text=" +
								encodeURIComponent(shareTitle) +
								"&url=" +
								encodeURIComponent(shareUrl),
						)
					}
					className={styles.linkCopyButton}
					tabIndex={0}
				>
					<Icon
						name="twitter"
						className={styles.twitterIcon}
						role="button"
						data-tid={"action_share_debate_twitter"}
						width={20}
						height={20}
					/>
				</div>
			</Tooltip>
			<Tooltip
				text={intl.formatMessage({
					id: "share.share_box.mail_share",
					defaultMessage: "Share by email",
				})}
				position={tooltipPosition}
			>
				<div
					onClick={() =>
						toggleSharing(
							"mailto:?subject=" +
								shareTitle +
								"&body=" +
								shareText +
								"%0D%0A" +
								shareUrl,
						)
					}
					className={styles.linkCopyButton}
					tabIndex={0}
				>
					<Icon
						name="mail"
						role="button"
						data-tid={"action_share_debate_mail"}
						width={20}
						height={20}
					/>
				</div>
			</Tooltip>
			{showShareCode && (
				<Tooltip
					text={intl.formatMessage({
						id: "share.share_box.embed_code_to_clipboard",
						defaultMessage: "Copy embed code",
					})}
					onClickText={intl.formatMessage({
						id: "share.share_box.code_copied",
						defaultMessage: "Code copied !",
					})}
					position={tooltipPosition}
				>
					<CopyToClipboard
						tabIndex="0"
						className={styles.codeCopyButton}
						text={shareCode}
					>
						<div className={styles.codeIcon}>
							<Icon
								name="code"
								className={styles.codeIcon}
								role="button"
								data-tid={"action_embed_code_clipboard"}
								width={20}
								height={20}
							/>
						</div>
					</CopyToClipboard>
				</Tooltip>
			)}
		</div>
	);
};
