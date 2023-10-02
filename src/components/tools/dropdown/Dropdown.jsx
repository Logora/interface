import React, { useState, useEffect, useRef, isValidElement, cloneElement } from "react";
import cx from "classnames";
import useOnClickOutside from 'use-onclickoutside';
import styles from "./Dropdown.module.scss";

export const Dropdown = (props) => {
    const [show, setShow] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        setShow(props.show);
    }, [props.show]);

    useEffect(() => {
        if ((show || props.show) && props.backgroundFixed) {
            document.body.style.overflowY = "hidden";
        }
        return () => {
            document.body.style.overflowY = null;
        }
    }, [show, props.show])

	const handleClickOutside = () => {
        setShow(false);
	};

	const addPropsToListItem = (child) => {
		if (isValidElement(child)) {
			return cloneElement(child, { toggle: () => setShow(!show) });
		}
		return child;
	};

	const onToggleClick = () => {
        if (props.handleClick) {
			props.handleClick();
		}
		setShow(!show);
	};

    const onContentClick = () => {
        if(props.closeOnContentClick) {
            setShow(!show);
        }
    }

    useOnClickOutside(dropdownRef, handleClickOutside);

	return (
        <div ref={dropdownRef} className={cx(styles.dropdownWrapper, { [props.className]: props.className })}>
            <button
                type='button'
                className={styles.dropdownHeader}
                onClick={onToggleClick}
            >
                {props.children[0]}
            </button>
            {show && (
                <div className={props.dropdownClassName ? props.dropdownClassName : cx(
                        styles.dropdownList,
                        { [styles.dropdownListRight]: props.dropdownListRight },
                        { [styles.dropdownListMobile]: props.dropdownListMobile }
                    )}
                    onClick={onContentClick}
                >
                    {addPropsToListItem(props.children[1])}
                </div>
            )}
        </div>
    );
}