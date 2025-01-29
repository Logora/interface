import React, { useState } from 'react';
import styles from './SectionBox.module.scss';
import { Icon } from '@logora/debate.icons.icon';
import cx from "classnames";


export const SectionBox = ({ isCollapsible = false, isExpandedByDefault = false, title, className, titleClassName, children }) => {

  const [isExpanded, setIsExpanded] = useState(isExpandedByDefault);

  const toggleExpand = () => {
    if (isCollapsible) {
      setIsExpanded(!isExpanded);
    }
  };
  return (
    <div className={styles.sectionBoxContainer}>
      <div className={cx(titleClassName, styles.headerBox)} onClick={toggleExpand}>
        <span>{title}</span>
        {isCollapsible && (
          <Icon name="lightArrow" className={styles.arrowDown} height={20} width={20} />
        )}
      </div>

      {isExpanded && <div className={className}>{children}</div>}
    </div>
  );
}
