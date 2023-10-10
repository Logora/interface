import React, { useState } from "react";
import styles from "./Tooltip.module.scss";
import cx from "classnames";
import PropTypes from "prop-types";

export const Tooltip = ({ position = "bottom", text, onClickText, children }) => {
    const [clicked, setClicked] = useState(false);

    const switchText = () => {
        setClicked(true);
        setTimeout(() => {
            setClicked(false);
        }, 5000);
    };

    if(text) {
      return (
        <div className={styles.tooltipChild} onClick={onClickText ? switchText : null}>
          { children }
          <span className={cx(styles.tooltipText, { [styles.tooltipTextTop]: position === "top", [styles.tooltipTextLeft]: position === "left", [styles.tooltipTextRight]: position === "right" })}>
            { clicked ? onClickText : text }
          </span>
        </div>
      );
    } else {
      return (
        <>
          { children }
        </>
      )
    }
    
};

Tooltip.propTypes = {
    /** Tooltip text */
    text: PropTypes.string,
    /** Text displayed when tooltip is clicked */
    onClickText: PropTypes.string,
    /** Tooltip position, can be `top`, `bottom`, `left` or `right` */
    position: PropTypes.string,
    /**  Component on which the tooltip is displayed */
    children: PropTypes.node,
};