import React from "react";
import { Modal } from '@logora/debate.dialog.modal';
import { ShareBox } from "@logora/debate.share.share_box";
import styles from "./ShareModal.module.scss";
import PropTypes from "prop-types";

export const ShareModal = ({ shareUrl, title, shareTitle, shareText, showShareCode, shareCode }) => {
    const buildShareLink = () => {
        let shareUrlBuild = shareUrl;
        if(typeof window !== 'undefined') {
            shareUrl += "?redirect_url=" + window.location.protocol + "//" + window.location.hostname;
        }
        return shareUrlBuild;
    }

    const shareUrlBuild = buildShareLink();

    return (
        <div>
            <Modal title={title}>
                <div className={styles.modalContainer}>
                    <ShareBox 
                        shareUrl={shareUrlBuild} 
                        shareTitle={shareTitle} 
                        shareText={shareText} 
                        tooltipPosition={"top"} 
                        showShareCode={showShareCode ? true : false}
                        shareCode={shareCode}
                    />
                </div>
            </Modal>
        </div>
    )
}

ShareModal.propTypes = {
	/** Url to share */
	shareUrl: PropTypes.string.isRequired,
	/** Description of the shared content */
	shareText: PropTypes.string,
	/** Title of the content that will be shared */
	shareTitle: PropTypes.string.isRequired,
	/** Title passed to the modal */
	title: PropTypes.string.isRequired,
	/** Code to share */
	shareCode: PropTypes.string,
	/** If `true`, show copy code icon */
	showShareCode: PropTypes.bool,
};

ShareModal.defaultProps = {
	showShareCode: false
}