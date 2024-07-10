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

export const BoxSkeletonOnlyEdgeBox = () => {
    return (
        <div style={{width: "200px"}}><BoxSkeleton boxHeight={200} onlyEdgeBox={true} /></div>
    );
};

export const BoxSkeletonWithoutAnimation = () => {
    return (
        <BoxSkeleton enableAnimation={false} />
    );
};