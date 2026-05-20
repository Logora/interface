import cx from "classnames";
import React, { useState, useRef } from "react";
import useOnClickOutside from "use-onclickoutside";
import styles from "./Dropdown.module.scss";

export const Dropdown = ({
	onClick,
	horizontalPosition = "left",
	disabled = false,
	closeOnContentClick = false,
	className,
	dropdownClassName,
	children,
}) => {
	const [active, setActive] = useState(false);
	const dropdownRef = useRef(null);
	const mouseDownInsideRef = useRef(false);

	const onToggleClick = () => {
		if (!disabled) {
			if (onClick) {
				onClick();
			}
			setActive(!active);
		}
	};

	useOnClickOutside(dropdownRef, () => {
		if (!mouseDownInsideRef.current) setActive(false);
		mouseDownInsideRef.current = false;
	});

	return (
		<div
			ref={dropdownRef}
			className={cx(styles.dropdownWrapper, { [className]: className })}
			onMouseDown={() => { mouseDownInsideRef.current = true; }}
		>
			<button
				type="button"
				aria-expanded={active}
				className={styles.dropdownHeader}
				onClick={onToggleClick}
			>
				{children[0]}
			</button>
			{active && (
				<div
					className={
						dropdownClassName
							? dropdownClassName
							: cx(styles.dropdownList, {
									[styles[horizontalPosition]]: horizontalPosition,
								})
					}
					onClick={(e) => { if (closeOnContentClick || e.target === e.currentTarget) setActive(false); }}
				>
					{children[1]}
				</div>
			)}
		</div>
	);
};
