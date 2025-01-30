import React, { useState } from 'react';
import styles from './SectionBox.module.scss';
import { Icon } from '@logora/debate.icons.icon';
import cx from "classnames";

export const SectionBox = ({ isCollapsible = false, isCollapsibleByDefault = false, title, subTitle = " ", className, titleClassName, children }) => {

  const [isExpanded, setIsExpanded] = useState(isCollapsibleByDefault);
  const toggleExpand = () => {
    if (isCollapsible) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className={styles.sectionBoxContainer}>
      <div className={styles.headerBox} onClick={toggleExpand}>
      <div className={styles.titleContainer}>
          <div className={cx(titleClassName, styles.title)}>{title}</div>
          {subTitle && <div className={cx(className, styles.subTitle)}>{subTitle}</div>}
        </div>
        {isCollapsible && (
          <Icon name="lightArrow" className={styles.arrowDown} height={15} width={15} />
        )}
      </div>

      {isExpanded && <div className={className}>{children}</div>}
    </div>
  );
}
