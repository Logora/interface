import { Button } from "@logora/debate/action/button";
import { Modal, useModal } from "@logora/debate/dialog/modal";
import cx from "classnames";
import React from "react";
import styles from "./ConfirmModal.module.scss";

export const ConfirmModal = ({
	title,
	question,
	confirmLabel,
	cancelLabel,
	onConfirmCallback,
	onCancelCallback,
	confirmButtonClass,
	cancelButtonClass,
}) => {
	const { hideModal } = useModal();

	const onConfirm = () => {
		hideModal();
		onConfirmCallback && onConfirmCallback();
	};

	const onCancel = () => {
		hideModal();
		onCancelCallback && onCancelCallback();
	};

	return (
		<Modal title={title}>
			<div>
				<div className={styles.modalContent}>{question}</div>
				<div className={styles.modalActions}>
					<Button
						type="button"
						className={cx(styles.modalActionLeft, confirmButtonClass)}
						handleClick={() => onConfirm()}
					>
						{confirmLabel}
					</Button>
					<Button
						type="button"
						className={cx(styles.modalActionRight, cancelButtonClass)}
						handleClick={() => onCancel()}
					>
						{cancelLabel}
					</Button>
				</div>
			</div>
		</Modal>
	);
};
