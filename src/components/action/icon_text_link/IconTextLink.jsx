import { Link } from "@logora/debate/action/link";
import cx from "classnames";
import React from "react";
import styles from "./IconTextLink.module.scss";

export const IconTextLink = ({
	className,
	textClassName,
	to,
	icon: Icon,
	text,
	active = false,
	children,
	pin = false,
	pinText,
	...rest
}) => {
	const displayIconText = () => {
		return (
			<div
				data-testid={"iconTextContainer"}
				className={cx(styles.iconTextContainer, { [styles.active]: active })}
				{...(to ? {} : { ...rest })}
			>
				<div className={styles.iconPinContainer}>
					{pin && (
						<span
							className={cx(styles.pinWithText, { [styles.pin]: !pinText })}
							data-notification-count={pinText}
						>
							{pinText || ""}
						</span>
					)}
					{Icon ? <Icon height={24} width={24} /> : children}
				</div>
				<div className={cx(styles.iconText, textClassName)}>{text}</div>
			</div>
		);
	};

	return to ? (
		<Link
			data-testid={"iconTextLink"}
			to={to}
			className={cx(styles.iconTextLink, className)}
			{...rest}
		>
			{displayIconText()}
		</Link>
	) : (
		displayIconText()
	);
};
