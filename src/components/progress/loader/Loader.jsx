import React from "react";
import styles from "./Loader.module.scss";

export const Loader = () => {
    return (<div className={styles.spinnerBox}>
        <div className={styles.spinnerBorder} role="status">
        </div>
    </div>);
};