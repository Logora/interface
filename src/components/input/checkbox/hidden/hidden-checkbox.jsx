import classnames from "classnames";
import React from "react";
import styles from "./hidden-checkbox.module.scss";

/** Hidden but interactive checkbox */
export function HiddenCheckbox({ className, type = "checkbox", ...rest }) {
	return (
		<input
			{...rest}
			type={type}
			className={classnames(className, styles.hidden)}
		/>
	);
}
