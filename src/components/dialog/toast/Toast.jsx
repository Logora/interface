import cx from "classnames";
import React from "react";
import { useIntl } from "react-intl";
import styles from "./Toast.module.scss";

export const Toast = ({ text, points, variant = "info", handleClose }) => {
	const intl = useIntl();
	return (
		<div
			className={cx(styles.container, styles[variant])}
			role={variant === "error" ? "alert" : "status"}
		>
			<div className={styles.body}>
				<div className={styles.message}>{text}</div>
				{points && (
					<div className={styles.points}>
						<span className={styles.textPoints}>{points}</span>
					</div>
				)}
			</div>
			<div className={styles.closeContainer}>
				<button
					type="button"
					className={styles.closeButton}
					onClick={handleClose}
					aria-label={intl.formatMessage({
						id: "modal.toast.aria_label",
						defaultMessage: "Close toast",
					})}
				>
					✕
				</button>
			</div>
		</div>
	);
};
