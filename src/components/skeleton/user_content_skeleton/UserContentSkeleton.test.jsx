import React from 'react';
import { render, screen } from '@testing-library/react';
import { UserContentSkeleton } from './UserContentSkeleton';

describe('UserContentSkeleton', () => {
    it('should render skeleton with correct test id', () => {
        const container = render(
            <UserContentSkeleton />
        );
        expect(container.getByTestId('user-content-skeleton')).toBeTruthy();
    });

    it('hides the body when numberLines prop is 0', () => {
        const container = render(<UserContentSkeleton numberLines={0} />);

        expect(screen.getByTestId('user-content-skeleton')).toBeTruthy();
        expect(screen.queryByTestId('skeleton-body')).toBeNull();
    });

    it('enables animation when enableAnimation prop is true', () => {
        const { getByTestId } = render(<UserContentSkeleton enableAnimation={true} />);
        const skeletonContainer = getByTestId('user-content-skeleton');
        const skeletonItems = skeletonContainer.querySelectorAll('.react-loading-skeleton');
        skeletonItems.forEach((item) => {
            expect(item).toHaveClass('react-loading-skeleton');
            expect(getComputedStyle(item, ':after')['visibility'] == "visible").toBeTruthy();
        });
    });

    it('disables animation when enableAnimation prop is false', () => {
        const { getByTestId } = render(<UserContentSkeleton enableAnimation={false} />);
        const skeletonContainer = getByTestId('user-content-skeleton');
        const skeletonItems = skeletonContainer.querySelectorAll('.react-loading-skeleton');
        skeletonItems.forEach((item) => {
            expect(item).toHaveClass('react-loading-skeleton');
            expect(item).toHaveStyle('--pseudo-element-display: none');
        });
    });

    it('displays children if passed', () => {
        const { getByTestId, getByText } = render(
            <UserContentSkeleton enableAnimation={false}>
                <div>My child</div>
            </UserContentSkeleton>
        );
        expect(getByTestId('user-content-skeleton')).toBeTruthy();
        expect(getByText('My child')).toBeTruthy();
    });

    it('displays tag if passed', () => {
        const { getByTestId, getByText } = render(<UserContentSkeleton tag={"Music"} />);
        expect(getByTestId('user-content-skeleton')).toBeTruthy();
        expect(getByText('Music')).toBeTruthy();
    });
});