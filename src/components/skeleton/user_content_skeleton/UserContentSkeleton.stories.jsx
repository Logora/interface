import React from 'react';
import { UserContentSkeleton } from './UserContentSkeleton';

const meta = {
  title: 'Skeleton/User Content Skeleton',
  component: UserContentSkeleton,
  args: {
    border: false,
    numberLines: undefined,
    enableAnimation: true,
    tag: undefined,
    withChildren: false
  },
  argTypes: {
    border: { control: 'boolean' },
    numberLines: { control: 'number' },
    enableAnimation: { control: 'boolean' },
    tag: { control: 'text' },
    withChildren: { control: 'boolean' }
  },
  render: ({ withChildren, ...args }) => (
    <UserContentSkeleton {...args}>
      {withChildren ? <div>Some content</div> : null}
    </UserContentSkeleton>
  )
};

export default meta;

export const DefaultUserContentSkeleton = {};

export const UserContentSkeletonWithBorder = { args: { border: true } };

export const UserContentSkeletonWithoutBody = { args: { numberLines: 0 } };

export const UserContentSkeletonWithTwoLines = { args: { numberLines: 2 } };

export const UserContentSkeletonWithoutAnimation = { args: { enableAnimation: false } };

export const UserContentSkeletonWithTag = { args: { tag: 'Rock' } };

export const UserContentSkeletonWithTagAndBorder = { args: { border: true, tag: 'Rock' } };

export const UserContentSkeletonWithChildren = { args: { withChildren: true } };
