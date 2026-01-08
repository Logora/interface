import React, { useState, useRef } from "react";
import useOnClickOutside from 'use-onclickoutside';
import cx from "classnames";
import styles from "./Dropdown.module.scss";
import PropTypes from "prop-types";

export const Dropdown = ({ onClick, horizontalPosition = "left", disabled = false, className, dropdownClassName, children }) => {
    const [active, setActive] = useState(false);
    const dropdownRef = useRef(null);

	const onToggleClick = () => {
        if(!disabled) {
            if (onClick) {
                onClick();
            }
            setActive(!active);
        }
	};

    useOnClickOutside(dropdownRef, () => setActive(false));

	return (
        <div ref={dropdownRef} className={cx(styles.dropdownWrapper, { [className]: className })}>
            <button
                type='button'
                aria-expanded={active}
                className={styles.dropdownHeader}
                onClick={onToggleClick}
            >
                {children[0]}
            </button>
            { active && (
                <div className={dropdownClassName ? dropdownClassName : cx(
                        styles.dropdownList,
                        { [styles[horizontalPosition]]: horizontalPosition }
                    )}
                    onClick={() => setActive(false)}
                >
                    { children[1] }
                </div>
            )}
        </div>
    );
}

Dropdown.propTypes = {
    /** Callback triggered when clicking the dropdown button */
    onClick: PropTypes.func,
    /** Dropdown horizontal alignment, can be `left`, `center` or `right` */
    horizontalPosition: PropTypes.string,
    /** Disable dropdown */
    disabled: PropTypes.bool,
    /** Class name passed to the root container */
    className: PropTypes.string,
    /** Class name passed to the dropdown */
    dropdownClassName: PropTypes.string,
    /** Dropdown button and content of the dropdown */
    children: PropTypes.node,
};
