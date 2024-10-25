import React from 'react';
import { Tag } from './Tag';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';
import { Icon } from "@logora/debate.icons.icon";

export const DefaultTag = () => {
    return (
        <Tag text="Default" />
    )
};

export const ActiveTag = () => {
    return (
        <Tag text="Active" active={true} />
    )
};

export const TagWithLeftIcon = () => {
    return (
        <IconProvider library={regularIcons}>
            <Tag text="Left icon" leftIcon={<Icon name="home" width="15" height="15" />} />
        </IconProvider>
    )
}

export const TagWithRightIcon = () => {
    return (
        <IconProvider library={regularIcons}>
            <Tag text="Right icon" rightIcon={<Icon name="close" width="10" height="10" />} />
        </IconProvider>
    )
}

export const ActiveTagWithRightIcon = () => {
    return (
        <IconProvider library={regularIcons}>
            <Tag text="Right icon" active rightIcon={<Icon name="close" width="10" height="10" />} />
        </IconProvider>
    )
}