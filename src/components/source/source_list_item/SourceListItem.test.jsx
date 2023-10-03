import React from 'react';
import { render, screen } from '@testing-library/react';
import { SourceListItem } from './SourceListItem';

describe('SourceListItem', () => {
    it('should render with the correct text', () => {
        const item = render(
            <SourceListItem 
                publisher={"source.com"} 
                url={"https://source.com"} 
                title={"Source list item component"} 
                index={0}
            />
        );

        expect(screen.getByText(/source.com/i)).toBeTruthy();
        expect(screen.getByText(/Source list item component/i)).toBeTruthy();
        expect(screen.getByText("[ 1 ]")).toBeTruthy();
    });

    it('should render with the correct link', () => {
        const item = render(
            <SourceListItem 
                publisher={"source.com"} 
                url={"https://source.com"} 
                title={"Source list item component"} 
                index={0}
            />
        );

        expect(screen.getByRole('link')).toBeTruthy();
        expect(screen.getByText(/source.com/i).closest('a')).toHaveAttribute('href', 'https://source.com');
        expect(screen.getByRole('link')).toHaveAttribute('href', 'https://source.com');
    })
});