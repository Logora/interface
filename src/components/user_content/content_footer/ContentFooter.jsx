import { Link } from "@logora/debate/action/link";
import { useAuth } from "@logora/debate/auth/use_auth";
import { useConfig } from "@logora/debate/data/config_provider";
import { Dropdown } from "@logora/debate/dialog/dropdown";
import { useModal } from "@logora/debate/dialog/modal";
import { useResponsive } from "@logora/debate/hooks/use_responsive";
import { Icon } from "@logora/debate/icons/icon";
import { useInput } from "@logora/debate/input/input_provider";
import { ShareButton } from "@logora/debate/share/share_button";
import { useDeleteContent } from "@logora/debate/user_content/use_delete_content";
import { useReportContent } from "@logora/debate/user_content/use_report_content";
import React, { lazy, Suspense } from "react";
import { useIntl } from "react-intl";
const ShareModal = lazy(() => import("@logora/debate/share/share_modal").then(m => ({ default: m.ShareModal })));
import cx from "classnames";
import styles from "./ContentFooter.module.scss";

export const ContentFooter = ({
	resource,
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
	replyRedirectUrl,
}) => {
	const intl = useIntl();
	const config = useConfig();
	const { currentUser } = useAuth();
	const { showModal } = useModal();
	const { setInputContent } = useInput() || {};
	const { reportContent } = useReportContent(reportType, resource.id);
	const { deleteContent } = useDeleteContent(
		resource,
		deleteType,
		deleteListId,
		softDelete,
	);
	const { elementWidth } = useResponsive();

	const currentUserIsAuthor = () => {
		if (!currentUser?.id) {
			return false;
		}
		return (
			resource.author?.id === currentUser?.id ||
			resource.debate_suggestion?.author?.id === currentUser?.id
		);
	};

	const handleEdit = () => {
		setInputContent(resource);
	};

	const isEditable = () => {
		if (resource.created_at && config.actions?.editionTime) {
			const limitDate = new Date(
				new Date(resource.created_at).setSeconds(
					new Date(resource.created_at).getSeconds() +
						config.actions?.editionTime,
				),
			);
			const now = new Date();
			return now < limitDate;
		}
		return true;
	};

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
			</Suspense>,
		);
	};

	const onKeyActivate = (action) => (e) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			action();
		}
	};

	return (
		<div className={cx(styles.container, containerClassName)}>
			<div
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault();
						onClick();
					}
				}}
				className={cx(styles.voteAction, voteActionClassName)}
				data-tid={"action_vote_argument"}
			>
				{children}
			</div>
			{!disabled && enableReply && (
				<div data-tid={"action_reply_argument"} data-testid="reply-button">
					{replyRedirectUrl ? (
						<Link
							to={replyRedirectUrl}
							className={styles.replyAction}
							tabIndex="0"
							data-testid="action-reply-button"
						>
							<Icon
								name="reply"
								data-tid={"action_reply_argument"}
								height={17}
								width={17}
							/>
							{!(elementWidth < 768) && (
								<span className={styles.replyText}>
									{intl.formatMessage({
										id: "user_content.content_footer.reply",
										defaultMessage: "Reply",
									})}
								</span>
							)}
						</Link>
					) : (
						<button
							type="button"
							className={styles.replyAction}
							onClick={handleReplyTo}
							data-testid="action-reply-button"
						>
							<Icon
								name="reply"
								data-tid={"action_reply_argument"}
								height={17}
								width={17}
							/>
							{!(elementWidth < 768) && (
								<span className={styles.replyText}>
									{intl.formatMessage({
										id: "user_content.content_footer.reply",
										defaultMessage: "Reply",
									})}
								</span>
							)}
						</button>
					)}
				</div>
			)}
			{showShareButton && (
				<ShareButton
					shareUrl={shareUrl}
					shareTitle={shareTitle}
					shareText={shareText}
					showShareCode={showShareCode}
					shareCode={shareCode}
					showText={!(elementWidth < 768) && showShareText}
					iconSize={17}
				/>
			)}
			{showActions && (
				<div
					className={styles.moreAction}
					title={intl.formatMessage({
						id: "user_content.content_footer.more",
						defaultMessage: "More options",
					})}
				>
					<Dropdown
						className={styles.moreActionDropdown}
						horizontalPosition={"right"}
					>
						<Icon
							name="ellipsis"
							width={17}
							height={17}
							data-testid="dropdown"
							aria-label={intl.formatMessage({
								id: "user_content.content_footer.menu.aria_label",
								defaultMessage: "opens menu",
							})}
						/>
						<div>
							{currentUserIsAuthor() && (
								<>
									{!disabled && enableEdition && isEditable() && (
										<div
											data-tid={"action_edit_argument"}
											className={styles.dropdownItem}
											tabIndex="0"
											onClick={handleEdit}
											onKeyDown={onKeyActivate(handleEdit)}
										>
											{intl.formatMessage({
												id: "user_content.content_footer.update",
												defaultMessage: "Update",
											})}
										</div>
									)}
									{enableDeletion && (
										<div
											data-tid={"action_delete_argument"}
											className={styles.dropdownItem}
											tabIndex="0"
											onClick={deleteContent}
											onKeyDown={onKeyActivate(deleteContent)}
										>
											{intl.formatMessage({
												id: "user_content.content_footer.delete",
												defaultMessage: "Delete",
											})}
										</div>
									)}
								</>
							)}
							{enableReport && (
								<div
									data-tid={"action_report_argument"}
									className={styles.dropdownItem}
									tabIndex="0"
									onClick={reportContent}
									data-testid="report-content"
									onKeyDown={onKeyActivate(reportContent)}
								>
									{intl.formatMessage({
										id: "user_content.content_footer.report",
										defaultMessage: "Report",
									})}
								</div>
							)}
							{shareModal && (
								<div
									data-tid={"action_share_argument"}
									className={styles.dropdownItem}
									tabIndex="0"
									onClick={handleShowShareModal}
									onKeyDown={onKeyActivate(handleShowShareModal)}
								>
									{intl.formatMessage({
										id: "user_content.content_footer.share",
										defaultMessage: "Share",
									})}
								</div>
							)}
						</div>
					</Dropdown>
				</div>
			)}
		</div>
	);
};
