import { Icon } from "@logora/debate/icons/icon";
import cx from "classnames";
import React, { useRef, useEffect } from "react";
import { useIntl } from "react-intl";
import styles from "./Modal.module.scss";
import { useModal } from "./useModal";

export const Modal = ({
	title,
	showCloseButton = false,
	fullScreen,
	children,
	disableClickOutside = false,
	...rest
}) => {
	const dialogRef = useRef();
	const intl = useIntl();
	const { hideModal } = useModal();

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;

		if (!dialog.open) dialog.showModal();
		dialog.focus();

		const prevHtmlOverflow = document.documentElement.style.overflow;
		const prevBodyOverflow = document.body.style.overflow;

		document.documentElement.style.overflow = "hidden";
		document.body.style.overflow = "hidden";

		return () => {
			document.documentElement.style.overflow = prevHtmlOverflow;
			document.body.style.overflow = prevBodyOverflow;

			if (dialog.open) dialog.close();
		};
	}, []);

	const handleClickBackdrop = (e) => {
		if (disableClickOutside) return;

		if (e.currentTarget !== e.target) return;

		hideModal();
	};

	const handleClose = () => {
		hideModal();
	};

	return (
		<dialog
			ref={dialogRef}
			className={cx(styles.modalDialog, {
				[styles.modalDialogFullScreen]: fullScreen,
			})}
			aria-labelledby={title ? "modal-title" : undefined}
			onClick={handleClickBackdrop}
			onClose={handleClose}
			{...rest}
		>
			<div className={cx(styles.modalContainer)}>
				<div
					className={cx(styles.modalHeader, {
						[styles.modalHeaderWithTitle]: title,
					})}
				>
					{title && <div id="modal-title">{title}</div>}
					{showCloseButton && (
						<button
							type="button"
							className={styles.modalExitButton}
							onClick={hideModal}
							aria-label={intl.formatMessage({
								id: "dialog.modal.aria_label",
								defaultMessage: "Close dialog",
							})}
							data-testid="close-button"
						>
							<Icon
								name="close"
								height={18}
								width={18}
								aria-hidden="true"
								focusable="false"
							/>
						</button>
					)}
				</div>
				<div className={styles.modalContent}>{children}</div>
			</div>
		</dialog>
	);
};
