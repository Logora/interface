import React, { useState } from 'react';
import styles from './SectionBox.module.scss';
import { Icon } from '@logora/debate.icons.icon';
import cx from "classnames";
import { useResponsive } from "@logora/debate.hooks.use_responsive";

export const SectionBox = ({ isCollapsible = false, isCollapsedByDefault = false, title, subtitle = "", className, titleClassName, children }) => {
  const [isCollapsed, setIsCollapsed] = useState(isCollapsedByDefault);
  const { isMobile } = useResponsive();

  const toggleExpand = () => {
    if (isCollapsible) {
      setIsCollapsed(isCollapsed => !isCollapsed);
    }
  }

  return (
    <div className={cx(styles.sectionBoxContainer, { [styles.isMobile]: isMobile })}>
      <div className={cx(styles.header, { [styles.collapsible]: isCollapsible })} onClick={isCollapsible ? toggleExpand : null}>
        <div className={styles.titleContainer}>
          <div className={cx(titleClassName, styles.title)}>{title}</div>
          {subtitle && <div className={cx(className, styles.subtitle)}>{subtitle}</div>}
        </div>
        {isCollapsible && (
          <Icon name="lightArrow" className={cx(styles.iconLightArrow, { [styles.iconRotated]: !isCollapsed })} height={15} width={15} />
        )}
      </div>

      {(!isCollapsed || !isCollapsible) && <div className={cx(styles.body, className)}>{children}</div>}
    </div>
  );
}
