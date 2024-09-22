import React from 'react';
import cx from 'classnames';
import styles from './Tag.module.scss';
import PropTypes from "prop-types";
import { Icon } from "@logora/debate.icons.icon";

export const Tag = ({ active, text, className, ...rest }) => {
    return (
        <span data-testid="tag" className={cx(styles.tag, styles.className, className, { [styles.active]: active })} {...rest}>
			{ text } 
			{ active && <Icon name="close" height={10} width={10} /> }
		</span>
    )
}

Tag.propTypes = {
	/** If true, apply active style */
	active: PropTypes.bool,
	/** Text to display */
	text: PropTypes.string,
    /** Tag extra className */
	className: PropTypes.string,
};