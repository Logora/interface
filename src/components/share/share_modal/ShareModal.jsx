import React from "react";
import { Modal } from '@logora/debate/dialog/modal';
import { ShareBox } from "@logora/debate/share/share_box";
import styles from "./ShareModal.module.scss";

export const ShareModal = ({ shareUrl, title, shareTitle, shareText, showShareCode = false, shareCode }) => {
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
                        showShareCode={showShareCode}
                        shareCode={shareCode}
                    />
                </div>
            </Modal>
        </div>
    )
}

