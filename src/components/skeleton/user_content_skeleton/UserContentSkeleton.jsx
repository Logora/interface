import React from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './UserContentSkeleton.module.scss';
import cx from 'classnames';
import PropTypes from "prop-types";

export const UserContentSkeleton = ({ enableAnimation = true, hideBody = false, border = false, children}) => {
  return (
    <div data-testid={"user-content-skeleton"} className={cx(styles.skeletonContainer, { [styles.border]: border })}>
      <div style={{ display: "flex", flexDirection: "row", justifycontent: "flex-start" }}>
        <Skeleton enableAnimation={enableAnimation} circle={true} height={60} width={60} />
        <div style={{ display: "flex", flexDirection: "column", justifycontent: "flex-start", width: "100%", margin: "5px" }}>
          <Skeleton enableAnimation={enableAnimation} />
          <Skeleton enableAnimation={enableAnimation} width={120} />
        </div>
      </div>
      { hideBody ? null :
        <>
          <div data-testid={"skeleton-body"} style={{ minHeight: "100px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Skeleton enableAnimation={enableAnimation} count={3} style={{ marginBottom: "5px" }}/>
          </div>
          <Skeleton enableAnimation={enableAnimation} />
        </>
      }
      { children &&
        <div className={styles.childrenLayer}>
          { children }
        </div>
      }
    </div>
  )
};

UserContentSkeleton.propTypes = {
  /** Enable skeleton animation */
  enableAnimation: PropTypes.bool,
  /** Hide skeleton body */
  hideBody: PropTypes.bool,
  /** Will add a border to the box if `true` */
  border: PropTypes.bool,
  /** Children displayed at the center of the skeleton */
  children: PropTypes.node,
};

UserContentSkeleton.defaultProps = {
  enableAnimation: true,
  hideBody: false,
  border: false
};