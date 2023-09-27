import React, { memo } from "react";
import styles from "./Loader.module.scss";

export const Loader = memo(() => {
    return (<div className={styles.spinnerBox}>
        <div className={styles.spinnerBorder} role="status">
        </div>
    </div>);
});


