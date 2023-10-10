import React from "react";
import { Tooltip } from "./Tooltip";

export const DefaultTooltip = () => {
    return <Tooltip text="Tooltip text">
        <h3>Default tooltip</h3>
    </Tooltip>;
};

export const TooltipWithoutText = () => {
    return <Tooltip text="Tooltip text">
        <h3>Default tooltip</h3>
    </Tooltip>;
};

export const HoverAndClickTooltip = () => {
    return <Tooltip text="Hover tooltip" onClickText="Clicked!">
        <h4>Hover and click tooltip</h4>
    </Tooltip>;
};

export const TopTooltip = () => {
    return <Tooltip text="Top text" position="top">
        <h3>Top tooltip</h3>
    </Tooltip>;
};

export const LeftTooltip = () => {
    return <Tooltip text="Left text" position="left">
        <h3>Left tooltip</h3>
    </Tooltip>;
};

export const RightTooltip = () => {
    return <Tooltip text="Right text" position="right">
        <h3>Right tooltip</h3>
    </Tooltip>;
};