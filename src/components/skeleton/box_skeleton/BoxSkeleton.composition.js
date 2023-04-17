import React from 'react';
import { BoxSkeleton } from './BoxSkeleton';

export const DefaultBoxSkeleton = () => {
    return (
        <BoxSkeleton />
    );
};

export const BoxSkeletonLarge = () => {
    return (
        <BoxSkeleton boxHeight={400} />
    );
};

export const BoxSkeletonWithoutAnimation = () => {
    return (
        <BoxSkeleton enableAnimation={false} />
    );
};