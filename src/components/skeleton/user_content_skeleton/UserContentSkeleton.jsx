import React from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const UserContentSkeleton = (props) => {
  return (
    <div style={{ marginTop: "1em" }} data-testid={"user-content-skeleton"}>
      <div style={{ marginRight:".325em" }}>
        <div style={{ display: "flex", flexDirection: "row", justifycontent: "flex-start" }}>
          <Skeleton enableAnimation={props.enableAnimation} circle={true} height={60} width={60} />
          <div style={{ display: "flex", flexDirection: "column", justifycontent: "flex-start", width: "100%", margin: "5px" }}>
            <Skeleton enableAnimation={props.enableAnimation} />
            <Skeleton enableAnimation={props.enableAnimation} width={100} />
          </div>
        </div>
        { props.hideBody ? null :
          <>
            <div data-testid={"skeleton-body"} style={{ margin: "10px 0", minHeight: "160px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <Skeleton enableAnimation={props.enableAnimation} count={6}  style={{ marginBottom: "5px" }}/>
            </div>
            <Skeleton enableAnimation={props.enableAnimation} />
          </>
        }
      </div>
    </div>
  )
};