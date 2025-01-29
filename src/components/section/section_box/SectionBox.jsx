import React from 'react';
import styles from './SectionBox.module.scss';


export const SectionBox = (props) => {
  return (
    <div className={styles.sectionBoxContainer}>
      <div className={styles.headerBox}>
        {props.titleText}
      </div>

      {props.children}
    </div>
  );
}
