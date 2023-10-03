import React from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import PropTypes from "prop-types";

export const BoxSkeleton = ({ enableAnimation = true, boxHeight = 200, onlyEdgeBox = false, className }) => {
  return (
    <div className={className} data-testid={"box-skeleton"}>
      <div style={{ marginRight: ".5em" }}>
        <Skeleton enableAnimation={enableAnimation} height={boxHeight} />
        {!onlyEdgeBox && 
          <>
            <Skeleton enableAnimation={enableAnimation} height={20} style={{margin: "1em 0"}} />
            <div style={{ display: "flex", flexDirection: "row", justifycontent: "flex-start" }}>
              <Skeleton enableAnimation={enableAnimation} circle={true} height={40} width={40} style={{marginRight: "15px"}} />
              <Skeleton enableAnimation={enableAnimation} circle={true} height={40} width={40} style={{marginRight: "15px"}} />
              <Skeleton enableAnimation={enableAnimation} circle={true} height={40} width={40} style={{marginRight: "15px"}} />
              <div style={{ marginLeft: "auto", alignSelf: "flex-end", marginRight: "5px" }}>
                <Skeleton enableAnimation={enableAnimation} height={10} width={70} />
              </div>
            </div>
          </>
        }
      </div>
    </div>
  )
};

BoxSkeleton.propTypes = {
  /** Enable skeleton animation */
  enableAnimation: PropTypes.bool,
  /** Height of the main box in pixels */
  boxHeight: PropTypes.number,
  /** If `true`, will not show the footer */
  onlyEdgeBox: PropTypes.bool,
  /** Skeleton class name */
  className: PropTypes.string,
};

BoxSkeleton.defaultProps = {
  enableAnimation: true,
  boxHeight: 200,
  onlyEdgeBox: false
};