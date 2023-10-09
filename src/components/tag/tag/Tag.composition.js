import React from 'react';
import { Tag } from './Tag';

export const ActiveTag = () => {
    return <Tag active text="Active" />;
};

export const InactiveTag = () => {
    return <Tag active={false} text="Inactive" />;
};