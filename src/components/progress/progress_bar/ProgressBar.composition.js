import React from "react";
import { ProgressBar } from "./ProgressBar";

export const DefaultProgressBar = () => {
    return (
        <ProgressBar 
            progress={25} 
            goal={100}
        >
            Nice progress !
        </ProgressBar>
    )
}

export const ProgressBarWithTitle = () => {
    return (
        <ProgressBar 
            progress={25} 
            goal={100}
            title="Progress title"
        >
            Nice progress !
        </ProgressBar>
    )
}

export const ProgressBarWithPercentageSubtitle = () => {
    return (
        <ProgressBar 
            progress={25} 
            goal={100}
            title="Progress title"
            showPercentageSubtitle={true}
        >
            Nice progress !
        </ProgressBar>
    )
}

export const ProgressBarWithProgressSubtitle = () => {
    return (
        <ProgressBar 
            progress={25} 
            goal={100}
            title="Progress title"
            showProgressSubtitle={true}
            progressUnit={"votes"}
        >
            Nice progress !
        </ProgressBar>
    )
}

export const ProgressBarWithProgressSubtitleFullBar = () => {
    return (
        <ProgressBar 
            progress={100} 
            goal={100}
            title="Progress title"
            showProgressSubtitle={true}
            barFull={true}
            progressUnit={"votes"}
        >
            Nice progress !
        </ProgressBar>
    )
}