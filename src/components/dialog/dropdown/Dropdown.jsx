import cx from "classnames";
import React, { useState, useRef, useEffect } from "react";
import styles from "./Dropdown.module.scss";

export const Dropdown = ({
	onClick,
	horizontalPosition = "left",
	verticalPosition = "bottom",
	disabled = false,
	closeOnContentClick = false,
	className,
	dropdownClassName,
	children,
}) => {
	const [active, setActive] = useState(false);
	const dropdownRef = useRef(null);

	const onToggleClick = () => {
		if (!disabled) {
			if (onClick) {
				onClick();
			}
			setActive(!active);
		}
	};

	useEffect(() => {
		const handleMouseDown = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setActive(false);
			}
		};
		document.addEventListener("mousedown", handleMouseDown);
		return () => document.removeEventListener("mousedown", handleMouseDown);
	}, []);

	return (
		<div
			ref={dropdownRef}
			className={cx(styles.dropdownWrapper, { [className]: className })}
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
									[styles[verticalPosition]]: verticalPosition,
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
