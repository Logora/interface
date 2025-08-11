import React from "react";
import { IntlProvider } from 'react-intl';
import { ProgressBar } from "./ProgressBar";

export const DefaultProgressBar = () => {
    return (
        <IntlProvider locale="en">
        <ProgressBar
            progress={25}
            goal={100}
        >
            Nice progress !
        </ProgressBar>
        </IntlProvider>
    )
}

export const ProgressBarWithTitle = () => {
    return (
        <IntlProvider locale="en">
            <ProgressBar
                progress={25}
                goal={100}
                title="Progress title"
            >
                Nice progress !
            </ProgressBar>
        </IntlProvider>
    )
}

export const ProgressBarWithPercentageSubtitle = () => {
    return (
        <IntlProvider locale="en">
            <ProgressBar
                progress={25}
                goal={100}
                title="Progress title"
                showPercentageSubtitle={true}
            >
                Nice progress !
            </ProgressBar>
        </IntlProvider>
    )
}

export const ProgressBarWithProgressSubtitle = () => {
    return (
        <IntlProvider locale="en">
            <ProgressBar
                progress={25}
                goal={100}
                title="Progress title"
                showProgressSubtitle={true}
                progressUnit={"votes"}
            >
                Nice progress !
            </ProgressBar>
        </IntlProvider>
    )
}

export const ProgressBarWithProgressSubtitleFullBar = () => {
    return (
        <IntlProvider locale="en">
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
        </IntlProvider>
    )
}

export const ProgressBarWithoutChildren = () => {
    return (
        <IntlProvider locale="en">
            <ProgressBar
                progress={25}
                goal={100}
            >
            </ProgressBar>
        </IntlProvider>
    )
}