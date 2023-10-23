import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BackLink } from './BackLink';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';

describe('BackLink', () => {
    it('should render with correct text', () => {
        const container = render(
            <IconProvider library={regularIcons}>
                <BackLink text='Back to source' to='https://example.com/share-link' />
            </IconProvider>
        );
        expect(screen.getByText('Back to source')).toBeTruthy();
    });

    it('should render with correct link', () => {
        const container = render(
            <IconProvider library={regularIcons}>
                <BackLink text='Back to source' to='https://example.com/share-link' />
            </IconProvider>
        );
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', 'https://example.com/share-link');
    });

    it('should call onClick handler', () => {
        const onClick = jest.fn();
        render(
            <IconProvider library={regularIcons}>
                <BackLink
                    text='Back to source'
                    to='https://example.com/share-link'
                    onClick={onClick}
                />
            </IconProvider>
        );

        const link = screen.getByRole('link');
        fireEvent.click(link);
        expect(onClick).toHaveBeenCalled();
    });

    it('should render with correct className', () => {
        render(
            <IconProvider library={regularIcons}>
                <BackLink text='Back to source' to='https://example.com/share-link' className='foo' />
            </IconProvider>
        );
        const link = screen.getByRole('link');
        expect(link).toHaveClass('foo');
    });

    it('should render without duplicate className', () => {
        render(
            <IconProvider library={regularIcons}>
                <BackLink
                    text='Back to source'
                    to='https://example.com/share-link'
                    className='foo foo bar'
                />
            </IconProvider>
        );
        const link = screen.getByRole('link');
        const classList = Array.from(link.classList);
        const unique = classList.filter((v, i, a) => a.indexOf(v) === i);

        expect(classList.length).toEqual(unique.length);
    });

    it('should render with additional props', () => {
        render(
            <IconProvider library={regularIcons}>
                <BackLink
                    text='Back to source'
                    to='https://example.com/share-link'
                    data-testid='back-link'
                    aria-label='Go back to the source'
                />
            </IconProvider>
        );

        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('data-testid', 'back-link');
        expect(link).toHaveAttribute('aria-label', 'Go back to the source');
    });

    it('should render with custom styles', () => {
        render(
            <IconProvider library={regularIcons}>
                <BackLink
                    text='Back to source'
                    to='https://example.com/share-link'
                    className='custom-link'
                    style={{ color: 'red', fontWeight: 'bold' }}
                />
            </IconProvider>
        );

        const link = screen.getByRole('link');
        expect(link).toHaveClass('custom-link');
        expect(link).toHaveStyle({ color: 'red', fontWeight: 'bold' });
    });
});
