import React from 'react';
import styles from './SectionHeader.module.scss';

export const SectionHeader = (props) => {
    return (
        <div className={styles.headerBox}>
            {props.titleText}
        </div>
    )
}
