import React, { useState, useEffect } from "react";
import { LightArrowIcon, CheckboxIcon } from '@logora/debate.icons';
import { Dropdown } from '@logora/debate.dialog.dropdown';
import styles from "./Select.module.scss";
import cx from "classnames";
import PropTypes from "prop-types";

export const Select = ({ options, defaultOption, onChange, resetSelect = false, disabled = false, className }) => {
	const defaultOptionValue = defaultOption ? options.filter(elm => elm.name == defaultOption)[0] : options[0];
	const [currentOption, setCurrentOption] = useState(defaultOptionValue);
	
	useEffect(() => {
		if (resetSelect === true) {
			setCurrentOption(defaultOptionValue);
		}
	}, [resetSelect]);

	useEffect(() => {
        if (defaultOption) {
		    setCurrentOption(options.filter(elm => elm.name == defaultOption)[0]);
        }
	}, [defaultOption]);

	const handleSelectOption = (option) => {
		setCurrentOption(option);
		if (onChange) {
			onChange(option);
		}
	};

	const displayOption = (option) => {
		return (
			option.name != "" &&
			<div
				className={cx(styles.selectOption, { [styles.selectOptionActive]: (currentOption.name == option.name) })}
				key={option.value}
				value={option.value}
				data-tid={option.dataTid}
				onClick={() => handleSelectOption(option)}
			>
				{option.text}
				{currentOption.value == option.value && option.value != "" ? <CheckboxIcon className={styles.checkBox} width={16} height={16} />  : null}
			</div>
		);
	};
	
	return (
		<div className={styles.selectContainer}>
			<Dropdown>
				<div className={cx(styles.selectInput, { [className]: className, [styles.disabled]: disabled })}>
					<span className={styles.currentOptionText}>{currentOption.text}</span>{" "}
					<LightArrowIcon className={styles.arrowDown} height={10} width={10} />
				</div>
				{ !disabled && options.map(displayOption) }
			</Dropdown>
		</div>
	);
};

Select.propTypes = {
	/** An array of options to select */
	options: PropTypes.array.isRequired,
	/** Option to display as default */
	defaultOption: PropTypes.any,
	/** Callback function triggered when clicking on an option */
	onChange: PropTypes.func,
	/** If `true`, will reset to default option */
	resetSelect: PropTypes.bool,
	/** Disable input */
	disabled: PropTypes.bool,
	/**  Class name to style the input */
	className: PropTypes.string
};

Select.defaultProps = {
	resetSelect: false,
	disabled: false
}