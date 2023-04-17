import React from 'react';
import { UserContentSkeleton } from './UserContentSkeleton';

export const DefaultUserContentSkeleton = () => {
    return (
        <UserContentSkeleton />
    );
};

export const DefaultUserContentSkeletonWithoutBody = () => {
    return (
        <UserContentSkeleton hideBody />
    );
};

export const DefaultUserContentSkeletonWithoutAnimation = () => {
    return (
        <UserContentSkeleton enableAnimation={false} />
    );
};