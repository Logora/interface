import React from 'react';
import { Tag } from './Tag';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';

export const ActiveTag = () => {
    return (
        <IconProvider library={regularIcons}>
            <Tag active text="Active" />
        </IconProvider>
    )
};

export const InactiveTag = () => {
    return (
        <IconProvider library={regularIcons}>
            <Tag active={false} text="Inactive" />
        </IconProvider>
    )
};