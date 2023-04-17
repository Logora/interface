import React from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const BoxSkeleton = (props) => {
  return (
    <div style={{ marginTop: "1em" }} data-testid={"box-skeleton"}>
      <div style={{ marginRight: ".5em" }}>
        <Skeleton enableAnimation={props.enableAnimation} height={props.boxHeight || 200} />
        <Skeleton enableAnimation={props.enableAnimation} height={20} style={{margin: "1em 0"}} />
        <div style={{ display: "flex", flexDirection: "row", justifycontent: "flex-start" }}>
          <Skeleton enableAnimation={props.enableAnimation} circle={true} height={40} width={40} style={{marginRight: "15px"}} />
          <Skeleton enableAnimation={props.enableAnimation} circle={true} height={40} width={40} style={{marginRight: "15px"}} />
          <Skeleton enableAnimation={props.enableAnimation} circle={true} height={40} width={40} style={{marginRight: "15px"}} />
          <div style={{ marginLeft: "auto", alignSelf: "flex-end", marginRight: "5px" }}>
            <Skeleton enableAnimation={props.enableAnimation} height={10} width={70} />
          </div>
        </div>
      </div>
    </div>
  )
};