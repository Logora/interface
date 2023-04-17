import React from 'react';
import { render } from '@testing-library/react';
import { BoxSkeleton } from './BoxSkeleton';

describe('BoxSkeleton', () => {
    it('should render skeleton with default props', () => {
        const container = render(
            <BoxSkeleton />
        );
        expect(container.getByTestId('box-skeleton')).toBeInTheDocument();
    });

    it('renders the component with custom box height', () => {
        const { getByTestId } = render(<BoxSkeleton boxHeight={300} />);
        const skeletonContainer = getByTestId('box-skeleton');
        const mainBoxItem = skeletonContainer.querySelectorAll('.react-loading-skeleton')[0];
        expect(mainBoxItem).toHaveStyle('height: 300px');
    });
    
    it('enables animation when enableAnimation prop is true', () => {
        const { getByTestId } = render(<BoxSkeleton enableAnimation={true} />);
        const skeletonContainer = getByTestId('box-skeleton');
        const skeletonItems = skeletonContainer.querySelectorAll('.react-loading-skeleton');
        skeletonItems.forEach((item) => {
            expect(item).toHaveClass('react-loading-skeleton');
            expect(getComputedStyle(item, ':after')['visibility'] == "visible").toBeTruthy();
        });
    });

    it('disables animation when enableAnimation prop is false', () => {
        const { getByTestId } = render(<BoxSkeleton enableAnimation={false} />);
        const skeletonContainer = getByTestId('box-skeleton');
        const skeletonItems = skeletonContainer.querySelectorAll('.react-loading-skeleton');
        skeletonItems.forEach((item) => {
            expect(item).toHaveClass('react-loading-skeleton');
            expect(item).toHaveStyle('--pseudo-element-display: none');
        });
    });
});