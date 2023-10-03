import React from 'react';
import { MemoryRouter } from 'react-router';
import { render, screen } from '@testing-library/react';
import { IconTextLink } from './IconTextLink';

describe('IconTextLink', () => {
    it('renders IconTextLink with icon and text', () => {
        const icon = () => <svg>SVG</svg>;
        const text = 'Text';
        const { getByText, getByTestId } = render(<IconTextLink icon={icon} text={text} />);
        const iconTextContainer = getByTestId('iconTextContainer');
        expect(iconTextContainer).toBeInTheDocument();
        expect(getByText(text)).toBeInTheDocument();
        expect(iconTextContainer).toContainElement(getByText(text));
    });

    it('renders IconTextLink with children', () => {
        const children = <div data-testid='children'>Children</div>;
        const text = 'Text';
        const { getByTestId, getByText } = render(
            <IconTextLink text={text}>{children}</IconTextLink>
        );
        const iconTextContainer = getByTestId('iconTextContainer');
        expect(iconTextContainer).toBeInTheDocument();
        expect(iconTextContainer).toContainElement(getByTestId('children'));
        expect(getByText(text)).toBeInTheDocument();
    });

    it('renders Link with to prop and text', () => {
        const to = '/home';
        const text = 'Text';
        const { getByText, getByTestId } = render(
            <MemoryRouter>
                <IconTextLink to={to} text={text} />
            </MemoryRouter>
        );
        const iconTextContainer = getByTestId('iconTextLink');
        expect(iconTextContainer).toBeInTheDocument();
        expect(iconTextContainer).toHaveAttribute('href', '/home');
        expect(getByText(text)).toBeInTheDocument();
    });

    it('renders IconTextLink with icon and pin', () => {
        const icon = () => <svg>SVG</svg>;
        const text = 'Text';
        const { getByText, getByTestId } = render(
            <IconTextLink icon={icon} text={text} pin={true} pinText={"I'm a pin"} />
        );
        const iconTextContainer = getByTestId('iconTextContainer');
        expect(iconTextContainer).toBeInTheDocument();
        expect(getByText(text)).toBeInTheDocument();
        expect(iconTextContainer).toContainElement(getByText(text));
        expect(screen.getByText("I'm a pin")).toBeTruthy();
    });

    it('renders IconTextLink with active state', () => {
        const icon = () => <svg>SVG</svg>;
        const text = 'Text';
        const { getByTestId } = render(<IconTextLink icon={icon} text={text} active={true} />);
        const iconTextContainer = getByTestId('iconTextContainer');
        expect(iconTextContainer).toBeInTheDocument();
        expect(iconTextContainer).toHaveClass('active');
    });

    it('renders Link with additional props', () => {
        const to = '/home';
        const text = 'Text';
        const { getByText, getByTestId } = render(
            <MemoryRouter>
                <IconTextLink
                    to={to}
                    text={text}
                    data-testid='iconTextLink'
                    aria-label='Icon text link'
                    className='foo'
                />
            </MemoryRouter>
        );
        const iconTextContainer = getByTestId('iconTextLink');
        expect(iconTextContainer).toBeInTheDocument();
        expect(iconTextContainer).toHaveAttribute('href', '/home');
        expect(iconTextContainer).toHaveAttribute('data-testid', 'iconTextLink');
        expect(iconTextContainer).toHaveAttribute('aria-label', 'Icon text link');
        expect(iconTextContainer).toHaveClass('foo');
        expect(getByText(text)).toBeInTheDocument();
    });

    it('renders IconTextLink', () => {
        const icon = () => <svg>SVG</svg>;
        const text = 'Text';
        const { getByTestId } = render(<IconTextLink icon={icon} text={text} className='foo' />);
        const iconTextContainer = getByTestId('iconTextContainer');
        expect(iconTextContainer).toBeInTheDocument();
    });

    it('renders IconTextLink with custom styles', () => {
        const icon = () => <svg>SVG</svg>;
        const text = 'Text';
        const { getByTestId } = render(
            <IconTextLink icon={icon} text={text} style={{ color: 'red', fontWeight: 'bold' }} />
        );
        const iconTextContainer = getByTestId('iconTextContainer');
        expect(iconTextContainer).toBeInTheDocument();
        expect(iconTextContainer).toHaveStyle({ color: 'red', fontWeight: 'bold' });
    });

    it('renders IconTextLink with pin and pin text', () => {
        const icon = () => <svg>SVG</svg>;
        const text = 'Text';
        const pinText = "I'm a pin";
        const { getByText, getByTestId } = render(
            <IconTextLink icon={icon} text={text} pin={true} pinText={pinText} />
        );
        const iconTextContainer = getByTestId('iconTextContainer');
        expect(iconTextContainer).toBeInTheDocument();
        expect(getByText(text)).toBeInTheDocument();
        expect(iconTextContainer).toContainElement(getByText(text));
        expect(screen.getByText(pinText)).toBeTruthy();
    });

    it('renders IconTextLink without pin when pin prop is false', () => {
        const icon = () => <svg>SVG</svg>;
        const text = 'Text';
        const { getByText, getByTestId, queryByText } = render(
            <IconTextLink icon={icon} text={text} pin={false} pinText="I'm a pin" />
        );
        const iconTextContainer = getByTestId('iconTextContainer');
        expect(iconTextContainer).toBeInTheDocument();
        expect(getByText(text)).toBeInTheDocument();
        expect(iconTextContainer).toContainElement(getByText(text));
        expect(queryByText("I'm a pin")).toBeNull();
    });
});
