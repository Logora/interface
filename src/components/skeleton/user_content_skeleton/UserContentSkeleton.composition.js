import React from 'react';
import { UserContentSkeleton } from './UserContentSkeleton';

export const DefaultUserContentSkeleton = () => {
    return (
        <UserContentSkeleton />
    );
};

export const UserContentSkeletonWithBorder = () => {
    return (
        <UserContentSkeleton border />
    );
};

export const UserContentSkeletonWithoutBody = () => {
    return (
        <UserContentSkeleton hideBody />
    );
};

export const UserContentSkeletonWithoutAnimation = () => {
    return (
        <UserContentSkeleton enableAnimation={false} />
    );
};

export const UserContentSkeletonWithChildren = () => {
    return (
        <UserContentSkeleton>
            <div>Some content</div>
        </UserContentSkeleton>
    );
};