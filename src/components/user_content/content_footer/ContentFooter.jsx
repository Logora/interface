import React, { lazy, Suspense } from "react";
import { useConfig } from '@logora/debate.data.config_provider';
import { useAuth } from "@logora/debate.auth.use_auth";
import { useInput } from "@logora/debate.input.input_provider";
import { useReportContent } from "@logora/debate.user_content.use_report_content";
import { useDeleteContent } from "@logora/debate.user_content.use_delete_content";
import { useIntl } from "react-intl";
import { useModal } from '@logora/debate.dialog.modal';
import { Dropdown } from '@logora/debate.dialog.dropdown';
import { VoteButton } from '@logora/debate.vote.vote_button';
import { Icon } from '@logora/debate.icons.icon';
import { ShareButton } from '@logora/debate.share.share_button';
import { UpDownVoteBox } from "@logora/debate.vote.up_down_vote_box";
const ShareModal = lazy(() => import('@logora/debate.share.share_modal'));
import cx from "classnames";
import styles from "./ContentFooter.module.scss";
import PropTypes from "prop-types";

export const ContentFooter = ({ resource, 
    reportType, 
    deleteType, 
    deleteListId, 
    disabled = false, 
    leftReply, 
    positionIndex, 
    enableReply, 
    handleReplyTo, 
    showActions = true, 
    voteButton, 
    upDownVoteBox, 
    voteableType, 
    shareButton, 
    shareModal,
    shareUrl,
    shareTitle,
    shareText,
    shareModalTitle,
    showShareCode,
    shareCode,
    showShareText }) => {
	const intl = useIntl();
	const config = useConfig();
	const { currentUser } = useAuth();
    const { showModal } = useModal();
	const { setInputContent } = useInput() || {};
	const { reportContent } = useReportContent(reportType, resource.id);
	const { deleteContent } = useDeleteContent(resource, deleteType, deleteListId);

	const currentUserIsAuthor = () => {
		return resource.author.id === currentUser.id;
	};

	const handleEdit = () => {
		setInputContent(resource);
	};

	const isEditable = () => {
        if (resource.created_at && config.actions?.editionTime) {
            let limitDate = new Date(new Date(resource.created_at).setSeconds(new Date(resource.created_at).getSeconds() + config.actions?.editionTime));
			let now = new Date();
            return now < limitDate;
        } else { return true; }
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

	return (
		<div className={styles.container}>
			<div className={styles.voteAction} data-tid={"action_vote_argument"}>
                { voteButton &&
                    <VoteButton
                        voteableType={voteableType}
                        voteableId={resource.id}
                        totalUpvote={resource.upvotes}
                        totalDownvote={0}
                        activeClassName={styles[`position-${positionIndex}`]}
                        disabled={disabled}
                    />
                }
                { upDownVoteBox &&
                    <UpDownVoteBox 
                        voteableType={voteableType} 
                        voteableId={resource.id} 
                        totalUpvote={resource.total_upvotes} 
                        totalDownvote={resource.total_downvotes} 
                        disabled={disabled} 
                    />
                }
			</div>
			{ !disabled && enableReply &&
				<div className={cx({[styles.leftReply]: leftReply})} data-tid={"action_reply_argument"}>
					<div
						className={styles.replyAction}
						tabIndex='0'
						onClick={handleReplyTo}
					>
						<Icon name="reply" data-tid={"action_reply_argument"} height={17} width={17} />
						<span className={styles.replyText}>{intl.formatMessage({ id:"action.reply", defaultMessage: "Reply" })}</span>
					</div>
				</div>
			}
			{ shareButton && 
				<ShareButton 
					shareUrl={shareUrl} 
					shareTitle={shareTitle}
					shareText={shareText}
					showShareCode={showShareCode}
					shareCode={shareCode}
					showText={showShareText}
					iconSize={17}
				/>
			}
			{ !disabled && showActions && 
				<div className={styles.moreAction} title={intl.formatMessage({ id: "alt.more", defaultMessage: "More options" })}>
					<Dropdown horizontalPosition={'right'}>
						<Icon name="ellipsis" width={25} height={25} />
						<div>
							{currentUserIsAuthor() &&
								<>
									{ isEditable() &&
										<div data-tid={"action_edit_argument"} className={styles.dropdownItem} tabIndex='0' onClick={handleEdit}>
                                            { intl.formatMessage({ id: "action.", defaultMessage: "Update" }) }
										</div>
									}
									<div data-tid={"action_delete_argument"} className={styles.dropdownItem} tabIndex='0' onClick={deleteContent}>
                                        { intl.formatMessage({ id: "action.delete", defaultMessage: "Delete" }) }
									</div>
								</>
							}
							{ currentUser.is_banned !== true &&
								<div data-tid={"action_report_argument"} className={styles.dropdownItem} onClick={reportContent}>
                                    { intl.formatMessage({ id: "action.report", defaultMessage: "Report" }) }
								</div>
							}
                            { shareModal &&
                                <div data-tid={"action_share_argument"} className={styles.dropdownItem} onClick={handleShowShareModal}>
                                    { intl.formatMessage({ id: "action.share", defaultMessage: "Share" }) }
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
    /** If true, disabled replies and dropdown actions */
    disabled: PropTypes.bool, 
    /** If true, the reply button will be as far to the left as possible and the elements will no longer be in space-between */
    leftReply: PropTypes.bool, 
    /** Changes the colour of the voting buttons according to position */
    positionIndex: PropTypes.number, 
    /** Show reply button */
    enableReply: PropTypes.bool, 
    /** Callback function */
    handleReplyTo: PropTypes.func, 
    /** If true, show dropdown actions */
    showActions: PropTypes.bool, 
    /** If true, show voteButton action */
    voteButton: PropTypes.bool, 
    /** If true, show upDownVoteBox action */
    upDownVoteBox: PropTypes.bool, 
    /** Voteable type */
    voteableType: PropTypes.string, 
    /** If true, show share button action */
    shareButton: PropTypes.bool, 
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
    showShareText: PropTypes.bool
};

ContentFooter.defaultProps = {
    disabled: false, 
    showActions: true,
};