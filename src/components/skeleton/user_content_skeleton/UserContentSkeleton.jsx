import React from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './UserContentSkeleton.module.scss';
import cx from 'classnames';
import PropTypes from "prop-types";

export const UserContentSkeleton = ({ enableAnimation = true, numberLines = 4, border = false, tag, tagClassName, children}) => {
  return (
    <SkeletonTheme baseColor="var(--background-color-secondary)" highlightColor="var(--text-tertiary)">
      <div data-testid={"user-content-skeleton"} className={cx(styles.skeletonContainer, { [styles.border]: border })}>
        <div className={styles.skeletonHeader}>
          <Skeleton enableAnimation={enableAnimation} circle={true} height={60} width={60} />
          <div className={styles.skeletonHeaderLines}>
            <Skeleton enableAnimation={enableAnimation} />
            <Skeleton enableAnimation={enableAnimation} />
          </div>
          { tag &&
              <div className={styles.tagContainer}>
                  <div className={cx(styles.tagBox, tagClassName)}>
                      <div className={styles.tag}>
                          { tag }
                      </div>
                  </div>
              </div>
          }
        </div>
        { numberLines > 0 &&
          <div data-testid={"skeleton-body"} className={styles.skeletonBody}>
            <Skeleton enableAnimation={enableAnimation} count={numberLines} />
          </div>
        }
        { children &&
          <div className={styles.childrenLayer}>
            { children }
          </div>
        }
      </div>
    </SkeletonTheme>
  )
};

UserContentSkeleton.propTypes = {
  /** Enable skeleton animation */
  enableAnimation: PropTypes.bool,
  /** Will add a border to the box if `true` */
  border: PropTypes.bool,
  /** Number of skeleton lines in the body */
  numberLines: PropTypes.number,
  /** Number of skeleton lines in the body */
  tag: PropTypes.string,
  /** Number of skeleton lines in the body */
  tagClassName: PropTypes.string,
  /** Children displayed at the center of the skeleton */
  children: PropTypes.node,
};

UserContentSkeleton.defaultProps = {
  enableAnimation: true,
  border: false,
  numberLines: 4
};