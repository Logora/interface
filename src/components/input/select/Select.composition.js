import React from 'react';
import { Select } from './Select';

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
        <Select options={options} />
    )
};

export const SelectWithDefault = () => {
    return (
        <Select options={options} defaultOption={"relevance"} />
    )
};

export const DisabledSelect = () => {
    return (
        <Select options={options} disabled />
    )
};
