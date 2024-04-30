import React from 'react';
import cx from 'classnames';
import styles from './Tag.module.scss';
import PropTypes from "prop-types";
import { Icon } from "@logora/debate.icons.icon";

export const Tag = ({ dataTid, active, text, className }) => {
    return (
        <span data-testid="tag" data-tid={dataTid ? dataTid : null} className={cx(styles.tag, styles.className, className, { [styles.active]: active })}>
			{ text } 
			{ active && <Icon name="close" height={10} width={10} /> }
		</span>
    )
}

Tag.propTypes = {
	/** Used for tracking purposes */
	dataTid: PropTypes.string,
	/** If true, apply active style */
	active: PropTypes.bool,
	/** Text to display */
	text: PropTypes.string,
    /** Tag extra className */
	className: PropTypes.string,
};