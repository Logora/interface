import React from "react";
import { Tooltip } from "./Tooltip";

export default {
    title: 'Dialog/Tooltip',
    component: Tooltip,
    args: {
        text: 'Tooltip text',
        onClickText: null,
        position: 'bottom',
        variant: 'info',
        children: 'Default tooltip'
    },
    argTypes: {
        text: {
            control: 'text'
        },
        onClickText: {
            control: 'text'
        },
        position: {
            control: 'select',
            options: ['top', 'right', 'bottom', 'left']
        },
        variant: {
            control: 'select',
            options: ['info', 'success', 'error']
        },
        children: {
            control: 'text'
        }
    },
    render: ({ children, ...args }) => (
        <Tooltip {...args}>
            <h3>{children}</h3>
        </Tooltip>
    )
};

export const DefaultTooltip = {};

export const TooltipWithoutText = {
    args: {
        text: null
    }
};

export const HoverAndClickTooltip = {
    args: {
        text: 'Hover tooltip',
        onClickText: 'Clicked!',
        children: 'Hover and click tooltip'
    },
    render: ({ children, ...args }) => (
        <Tooltip {...args}>
            <h4>{children}</h4>
        </Tooltip>
    )
};

export const SuccessTooltip = {
    args: {
        text: 'Success Tooltip!',
        variant: 'success',
        children: 'Success tooltip'
    }
};

export const ErrorTooltip = {
    args: {
        text: 'Error Tooltip!',
        variant: 'error',
        children: 'Error tooltip'
    }
};

