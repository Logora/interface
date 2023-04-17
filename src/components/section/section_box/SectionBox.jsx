import React from 'react';
import styles from './SectionBox.module.scss';
import { SectionHeader } from '@logora/debate.section.section_header';

export const SectionBox = (props) => {
  return (
    <>
      <div className={styles.sectionBoxContainer}>
        <SectionHeader titleText={props.titleText} />
        {props.children}
      </div>
    </>
  )
}