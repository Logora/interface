import React, { useId, useState } from "react";
import styles from "./Tooltip.module.scss";
import cx from "classnames";

export const Tooltip = ({ position = "bottom", text, onClickText, children, className, variant = "info" }) => {
  const [clicked, setClicked] = useState(false);
  const tooltipId = useId();

  const switchText = () => {
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 5000);
  };

  if (text) {
    return (
      <div
        className={styles.tooltipChild}
        onClick={onClickText ? switchText : null}>
        <span aria-describedby={tooltipId}>
          {children}
        </span>
        <span id={tooltipId} role="tooltip" className={cx(className, styles.tooltipText, styles[variant], { [styles.tooltipTextTop]: position === "top", [styles.tooltipTextLeft]: position === "left", [styles.tooltipTextRight]: position === "right" })}>
          {clicked ? onClickText : text}
        </span>
      </div>
    );
  } else {
    return (
      <>
        {children}
      </>
    )
  }

};

