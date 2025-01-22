import React from 'react';
import cx from 'classnames';
import styles from './Tag.module.scss';
import PropTypes from "prop-types";

export const Tag = ({ text, active = false, leftIcon, rightIcon, className, ...rest }) => {
	return (
		<div data-testid="tag" className={cx(
			styles.tag,
			className,
			(leftIcon || rightIcon) && styles.withIcon,
			leftIcon && styles.withLeftIcon,
			rightIcon && styles.withRightIcon,
			active && styles.active
		)} {...rest}>
			{leftIcon}
			{text}
			{active}
			{rightIcon}
		</div>
	)
}

Tag.propTypes = {
	/** Text to display */
	text: PropTypes.string,
	/** If true, apply active style */
	active: PropTypes.bool,
	/** Left icon */
	leftIcon: PropTypes.node,
	/** Right icon */
	rightIcon: PropTypes.node,
	/** Tag extra className */
	className: PropTypes.string,
};