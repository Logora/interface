import React, { useState, useRef } from "react";
import { Icon } from "@logora/debate.icons.icon";
import { ShareBox } from "@logora/debate.share.share_box";
import { useIntl } from "react-intl";
import useOnClickOutside from 'use-onclickoutside';
import styles from "./ShareButton.module.scss";
import cx from "classnames";
import PropTypes from "prop-types";

export const ShareButton = ({ showText, shareUrl, shareTitle, shareText = false, shareCode, showShareCode = false, iconSize = 22, className, tooltipPosition = 'bottom' }) => {
	const popoverContentRef = useRef();
	const intl = useIntl();
	const [popoverActive, setPopoverActive] = useState(false);

	const buildShareLink = () => {
		let shareUrlBuild = shareUrl;
		if (typeof window !== 'undefined') {
			shareUrlBuild += "?redirect_url=" + window.location.protocol + "//" + window.location.hostname;
		}
		return shareUrlBuild;
	}

	const shareUrlBuild = buildShareLink();

	const handleClickOutsidePopover = (event) => {
		if (popoverContentRef && !popoverContentRef.current.contains(event.target)) {
			setPopoverActive(false);
		}
	};

	const handleShare = () => {
		if (typeof window !== 'undefined') {
			let mql = window.matchMedia("(max-width: 600px)");
			if ((typeof window !== 'undefined') && window.navigator.share && window.navigator.maxTouchPoints && window.navigator?.maxTouchPoints > 0 && mql.matches) {
				handleMobileShare();
			} else {
				setPopoverActive(true);
			}
		}
	};

	const handleMobileShare = () => {
		if (typeof window !== 'undefined') {
			window.navigator.share({
				text: shareText,
				title: shareTitle,
				url: shareUrlBuild
			}).catch(error => {
				// DO NOTHING
			});
		}
	}

	useOnClickOutside(popoverContentRef, handleClickOutsidePopover);

	return (
		<div
			tabIndex='0'
			title={intl.formatMessage({ id: "share.share_button.text", defaultMessage: "Share" })}
			className={cx(styles.shareButtonContainer, className)}
			onClick={handleShare}
			data-tid="action_share_button"
		>
			<div
				className={cx(styles.popoverWrapper, { [styles.popoverActive]: popoverActive })}
			>
				<Icon name="share" height={iconSize} width={iconSize} />
				{showText && <div className={styles.shareButtonText}>{intl.formatMessage({ id: "share.share_button.text", defaultMessage: "Share" })}</div>}
				<div ref={popoverContentRef} className={cx(styles.popoverContent, { [styles.popoverContentWithCode]: showShareCode })}>
					{popoverActive && <ShareBox shareUrl={shareUrlBuild} shareTitle={shareTitle} shareText={shareText} showShareCode={showShareCode} shareCode={shareCode} tooltipPosition={tooltipPosition} />}
				</div>
			</div>
		</div>
	);
}

ShareButton.propTypes = {
	/** If `true`, show "Share" text next to icon */
	showText: PropTypes.bool,
	/** Url to share */
	shareUrl: PropTypes.string.isRequired,
	/** Title of the content that will be shared */
	shareTitle: PropTypes.string.isRequired,
	/** Description of the shared content */
	shareText: PropTypes.string,
	/** Code to share */
	shareCode: PropTypes.string,
	/** If `true`, show copy code icon */
	showShareCode: PropTypes.bool,
	/** Size of icons */
	iconSize: PropTypes.number,
	/** Style to pass */
	className: PropTypes.string,
	/** Position of the tooltip */
	tooltipPosition: PropTypes.string,
};
