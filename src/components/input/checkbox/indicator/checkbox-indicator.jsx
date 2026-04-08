import React from 'react';
import classnames from 'classnames';
import styles from './checkbox-indicator.module.scss';

export const classes = {
	checkedIndicator: styles.checkedIndicator,
	defaultCheckbox: styles.defaultCheckbox,
};

/**
 * 'Vanilla' base component for checkbox indicator. Mirrors preceding checkbox.
 */
export function CheckboxIndicator(props) {
	const { className = classes.defaultCheckbox } = props;

	return <span {...props} className={classnames(className, classes.checkedIndicator)} />;
}
