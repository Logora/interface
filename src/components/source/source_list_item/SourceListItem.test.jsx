import React from 'react';
import { render, screen } from '@testing-library/react';
import { SourceListItem } from './SourceListItem';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';

describe('SourceListItem', () => {
    it('should render with the correct text', () => {
        const item = render(
            <IconProvider library={regularIcons}>
                <SourceListItem 
                    publisher={"source.com"} 
                    url={"https://source.com"} 
                    title={"Source list item component"} 
                    index={0}
                />
            </IconProvider>
        );

        expect(screen.getByText(/source.com/i)).toBeTruthy();
        expect(screen.getByText(/Source list item component/i)).toBeTruthy();
        expect(screen.getByText("[ 1 ]")).toBeTruthy();
    });

    it('should render with the correct link', () => {
        const item = render(
            <IconProvider library={regularIcons}>
                <SourceListItem 
                    publisher={"source.com"} 
                    url={"https://source.com"} 
                    title={"Source list item component"} 
                    index={0}
                />
            </IconProvider>
        );

        expect(screen.getByRole('link')).toBeTruthy();
        expect(screen.getByText(/source.com/i).closest('a')).toHaveAttribute('href', 'https://source.com');
        expect(screen.getByRole('link')).toHaveAttribute('href', 'https://source.com');
    })
});