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
        <UserContentSkeleton numberLines={0} />
    );
};

export const UserContentSkeletonWithTwoLines = () => {
    return (
        <UserContentSkeleton numberLines={2} />
    );
};

export const UserContentSkeletonWithoutAnimation = () => {
    return (
        <UserContentSkeleton enableAnimation={false} />
    );
};

export const UserContentSkeletonWithTag = () => {
    return (
        <UserContentSkeleton tag={"Rock"} />
    );
};

export const UserContentSkeletonWithTagAndBorder = () => {
    return (
        <UserContentSkeleton border tag={"Rock"} />
    );
};

export const UserContentSkeletonWithChildren = () => {
    return (
        <UserContentSkeleton>
            <div>Some content</div>
        </UserContentSkeleton>
    );
};