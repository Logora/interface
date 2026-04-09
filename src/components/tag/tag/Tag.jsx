import cx from "classnames";
import React from "react";
import styles from "./Tag.module.scss";

export const Tag = ({
	text,
	active = false,
	leftIcon,
	rightIcon,
	className,
	...rest
}) => {
	return (
		<div
			data-testid="tag"
			className={cx(
				styles.tag,
				className,
				(leftIcon || rightIcon) && styles.withIcon,
				leftIcon && styles.withLeftIcon,
				rightIcon && styles.withRightIcon,
				active && styles.active,
			)}
			{...rest}
		>
			{leftIcon}
			{text}
			{active}
			{rightIcon}
		</div>
	);
};
