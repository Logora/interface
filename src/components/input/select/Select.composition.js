import React from 'react';
import { Select } from './Select';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';

const options = [
    {
        dataTid: "action_sort_arguments_newest",
        name: "recency",
        value: "trending",
        text: "Most recent"
    },
    {
        dataTid: "action_sort_arguments_relevant",
        name: "relevance",
        value: "-created_at",
        text: "Most relevant"
    },
    {
        dataTid: "action_sort_arguments_oldest",
        name: "oldest",
        value: "+created_at",
        text: "Oldest"
    }
]

export const DefaultSelect = () => {
    return (
        <IconProvider library={regularIcons}>
            <Select options={options} />
        </IconProvider>
    )
};

export const SelectWithDefault = () => {
    return (
        <IconProvider library={regularIcons}>
            <Select options={options} defaultOption={"relevance"} />
        </IconProvider>
    )
};

export const SelectWithRightOptions = () => {
    return (
        <IconProvider library={regularIcons}>
            <Select options={options} horizontalPosition={"right"} />
        </IconProvider>
    )
};

export const DisabledSelect = () => {
    return (
        <IconProvider library={regularIcons}>
            <Select options={options} disabled />
        </IconProvider>
    )
};
