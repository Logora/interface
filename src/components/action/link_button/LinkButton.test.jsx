import React from 'react';
import { MemoryRouter } from 'react-router';
import { render } from '@testing-library/react';
import { LinkButton } from './LinkButton';

const callback = jest.fn();

describe('LinkButton', () => {
    it('should render with the correct text', () => {
        const linkButton = render(
            <MemoryRouter>
                <LinkButton to={'/page'}>Click Me</LinkButton>
            </MemoryRouter>
        );
        const renderedButton = linkButton.getByText(/click me/i);
        expect(renderedButton).toBeTruthy();
    });

    it('renders LinkButton with external link', () => {
        const linkButton = render(
            <MemoryRouter>
                <LinkButton to='https://example.com' external>
                    External Link
                </LinkButton>
            </MemoryRouter>
        );
        const renderedButton = linkButton.getByText('External Link');
        expect(renderedButton).toBeInTheDocument();
        expect(renderedButton).toHaveAttribute('href', 'https://example.com');
    });

    it('renders LinkButton with custom className', () => {
        const linkButton = render(
            <MemoryRouter>
                <LinkButton to='/page' className='custom-link'>
                    Custom Link
                </LinkButton>
            </MemoryRouter>
        );
        const renderedButton = linkButton.getByText('Custom Link');
        expect(renderedButton).toBeInTheDocument();
        expect(renderedButton).toHaveClass('custom-link');
    });

    it('renders LinkButton with additional props', () => {
        const linkButton = render(
            <MemoryRouter>
                <LinkButton
                    to='/page'
                    data-testid='link-button'
                    aria-label='Link button'
                    onClick={callback}
                >
                    Additional Props
                </LinkButton>
            </MemoryRouter>
        );
        const renderedButton = linkButton.getByText('Additional Props');
        expect(renderedButton).toBeInTheDocument();
        expect(renderedButton).toHaveAttribute('data-testid', 'link-button');
        expect(renderedButton).toHaveAttribute('aria-label', 'Link button');
    });

    it('renders LinkButton without external link', () => {
        const linkButton = render(
            <MemoryRouter>
                <LinkButton to='/page'>Internal Link</LinkButton>
            </MemoryRouter>
        );
        const renderedButton = linkButton.getByText('Internal Link');
        expect(renderedButton).toBeInTheDocument();
        expect(renderedButton).toHaveAttribute('href', '/page');
    });
});
