import React, { lazy, Suspense } from "react";
import { useConfig } from '@logora/debate.data.config_provider';
import { useAuth } from "@logora/debate.auth.use_auth";
import { useInput } from "@logora/debate.input.input_provider";
import { useReportContent } from "@logora/debate.user_content.use_report_content";
import { useDeleteContent } from "@logora/debate.user_content.use_delete_content";
import { useIntl } from "react-intl";
import { useModal } from '@logora/debate.dialog.modal';
import { Dropdown } from '@logora/debate.dialog.dropdown';
import { Icon } from '@logora/debate.icons.icon';
import { ShareButton } from '@logora/debate.share.share_button';
import { useResponsive } from "@logora/debate.hooks.use_responsive";
const ShareModal = lazy(() => import('@logora/debate.share.share_modal'));
import cx from "classnames";
import styles from "./ContentFooter.module.scss";
import PropTypes from "prop-types";

export const ContentFooter = ({ resource,
    reportType,
    deleteType,
    deleteListId,
    softDelete = false,
    disabled = false,
    children,
    enableReply,
    handleReplyTo,
    showActions = true,
    showShareButton = true,
    shareModal,
    shareUrl,
    shareTitle,
    shareText,
    shareModalTitle,
    showShareCode,
    shareCode,
    showShareText,
    enableEdition = true,
    enableDeletion = true,
    enableReport = true,
    containerClassName,
    voteActionClassName,
    replyRedirectUrl
}) => {

    const intl = useIntl();
    const config = useConfig();
    const { currentUser } = useAuth();
    const { showModal } = useModal();
    const { setInputContent } = useInput() || {};
    const { reportContent } = useReportContent(reportType, resource.id);
    const { deleteContent } = useDeleteContent(resource, deleteType, deleteListId, softDelete);
    const { elementWidth } = useResponsive();

    const currentUserIsAuthor = () => {
        if (!currentUser?.id) {
            return false;
        }
        return resource.author?.id === currentUser?.id || resource.debate_suggestion?.author?.id === currentUser?.id;
    };

    const handleEdit = () => {
        setInputContent(resource);
    };

    const isEditable = () => {
        if (resource.created_at && config.actions?.editionTime) {
            const limitDate = new Date(new Date(resource.created_at).setSeconds(new Date(resource.created_at).getSeconds() + config.actions?.editionTime));
            const now = new Date();
            return now < limitDate;
        }
        return true;
    }

    const handleShowShareModal = () => {
        showModal(
            <Suspense fallback={null}>
                <ShareModal
                    shareUrl={shareUrl}
                    shareTitle={shareTitle}
                    shareText={shareText}
                    title={shareModalTitle}
                    showShareCode={showShareCode}
                    shareCode={shareCode}
                />
            </Suspense>
        );
    }

    const handleReplyClick = () => {

        if (replyRedirectUrl) {
            window.location.href = replyRedirectUrl;
        } else if (handleReplyTo) {
            handleReplyTo();
        }
    };

    return (
        <div className={cx(styles.container, containerClassName)}>
            <div className={cx(styles.voteAction, voteActionClassName)} data-tid={"action_vote_argument"}>
                {children}
            </div>
            {!disabled && enableReply &&
                <div data-tid={"action_reply_argument"} data-testid="reply-button">
                    <div
                        className={styles.replyAction}
                        tabIndex='0'
                        onClick={handleReplyClick}
                        data-testid="action-reply-button"
                    >
                        <Icon name="reply" data-tid={"action_reply_argument"} height={17} width={17} />
                        {!(elementWidth < 768) && <span className={styles.replyText}>{intl.formatMessage({ id: "user_content.content_footer.reply", defaultMessage: "Reply" })}</span>}
                    </div>
                </div>
            }
            {showShareButton &&
                <ShareButton
                    shareUrl={shareUrl}
                    shareTitle={shareTitle}
                    shareText={shareText}
                    showShareCode={showShareCode}
                    shareCode={shareCode}
                    showText={!(elementWidth < 768) && showShareText}
                    iconSize={17}
                />
            }
            {showActions &&
                <div className={styles.moreAction} title={intl.formatMessage({ id: "user_content.content_footer.more", defaultMessage: "More options" })}>
                    <Dropdown className={styles.moreActionDropdown} horizontalPosition={'right'}>
                        <Icon name="ellipsis" width={17} height={17} data-testid="dropdown" aria-label={intl.formatMessage({ id: "user_content.content_footer.menu.aria_label", defaultMessage: "opens menu" })}
                        />
                        <div>
                            {currentUserIsAuthor() &&
                                <>
                                    {!disabled && enableEdition && isEditable() &&
                                        <div data-tid={"action_edit_argument"} className={styles.dropdownItem} tabIndex='0' onClick={handleEdit}>
                                            {intl.formatMessage({ id: "user_content.content_footer.update", defaultMessage: "Update" })}
                                        </div>
                                    }
                                    {enableDeletion &&
                                        <div data-tid={"action_delete_argument"} className={styles.dropdownItem} tabIndex='0' onClick={deleteContent}>
                                            {intl.formatMessage({ id: "user_content.content_footer.delete", defaultMessage: "Delete" })}
                                        </div>
                                    }
                                </>
                            }
                            {enableReport &&
                                <div data-tid={"action_report_argument"} className={styles.dropdownItem} onClick={reportContent} data-testid="report-content">
                                    {intl.formatMessage({ id: "user_content.content_footer.report", defaultMessage: "Report" })}
                                </div>
                            }
                            {shareModal &&
                                <div data-tid={"action_share_argument"} className={styles.dropdownItem} onClick={handleShowShareModal}>
                                    {intl.formatMessage({ id: "user_content.content_footer.share", defaultMessage: "Share" })}
                                </div>
                            }
                        </div>
                    </Dropdown>
                </div>
            }
        </div>
    );
};

ContentFooter.propTypes = {
    /** Resource object */
    resource: PropTypes.object,
    /** Report type */
    reportType: PropTypes.string,
    /** Delete type */
    deleteType: PropTypes.string,
    /** Delete list id */
    deleteListId: PropTypes.string,
    /** If true, will use PATCH method to delete content instead of DELETE */
    softDelete: PropTypes.bool,
    /** If true, disabled replies and dropdown actions */
    disabled: PropTypes.bool,
    /** Show reply button */
    enableReply: PropTypes.bool,
    /** Callback function */
    handleReplyTo: PropTypes.func,
    /** If true, show dropdown actions */
    showActions: PropTypes.bool,
    /** If true, show share button action */
    showShareButton: PropTypes.bool,
    /** If true, show share modal action in the dropdown */
    shareModal: PropTypes.bool,
    /** Url to share */
    shareUrl: PropTypes.string,
    /** Title of the content that will be shared */
    shareTitle: PropTypes.string,
    /** Description of the shared content */
    shareText: PropTypes.string,
    /** Title passed to the modal */
    shareModalTitle: PropTypes.string,
    /** If true, show copy code action */
    showShareCode: PropTypes.bool,
    /** Code to share */
    shareCode: PropTypes.string,
    /** If true, show "Share" text next to icon */
    showShareText: PropTypes.bool,
    /** Item to be displayed on the left */
    children: PropTypes.node,
    /** If true, content can be edited */
    enableEdition: PropTypes.bool,
    /** If true, content can be deleted */
    enableDeletion: PropTypes.bool,
    /** If true, content can be reported */
    enableReport: PropTypes.bool,
    /** Custom style for container */
    containerClassName: PropTypes.string,
    /** Custom style for children container */
    voteActionClassName: PropTypes.string,
    /** Clicking reply redirects to this URL instead of inline reply */
    replyRedirectUrl: PropTypes.string,
};