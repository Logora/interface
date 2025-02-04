
import React from 'react';
import { render } from '@testing-library/react';
import { Link } from './Link';
import { MemoryRouter } from "react-router-dom";

describe('Link', () => {
    it('should render a link', () => {
        const { getByRole } = render(
            <MemoryRouter>
                <Link to="/" />
            </MemoryRouter>
        );
        expect(getByRole('link')).toBeInTheDocument();
    });

    it('should render a Link if external is true', () => {
        const { getByRole } = render(
            <Link to="/" external={true} />
        );
        expect(getByRole('link')).toBeInTheDocument();
    });

    it('should render a link with children', () => {
        const { getByText } = render(
            <MemoryRouter>
                <Link to="/">
                    my link
                </Link>
            </MemoryRouter>
        );
        expect(getByText('my link')).toBeTruthy();
    });

    it('should render a link with children when external', () => {
        const { getByText } = render(
            <Link to="/" external>
                my external link
            </Link>
        );
        expect(getByText('my external link')).toBeTruthy();
    });

    it('should render a Link with the correct to prop', () => {
        const toValue = '/about';
        const { getByRole } = render(<MemoryRouter><Link to={toValue} /></MemoryRouter>);
        expect(getByRole('link').getAttribute('href')).toEqual(toValue);
    });

    it('should render a Link with the correct to prop when external', () => {
        const toValue = '/about';
        const { getByRole } = render(<Link to={toValue} external />);
        expect(getByRole('link').getAttribute('href')).toEqual(toValue);
    });

    it('should render a Link with the correct className prop', () => {
        const className = 'link-class';
        const { getByRole } = render(<MemoryRouter><Link to="/" className={className} /></MemoryRouter>);
        expect(getByRole('link').getAttribute('class')).toEqual(className);
    });

    it('should render a Link with the correct className prop when external', () => {
        const className = 'link-class';
        const { getByRole } = render(<Link to="/" className={className} external />);
        expect(getByRole('link').getAttribute('class')).toEqual(className);
    });

    it('should render an anchor with the correct target prop', () => {
        const targetValue = '_blank';
        const { getByRole } = render(<MemoryRouter><Link to="/" target={targetValue} /></MemoryRouter>);
        expect(getByRole('link').getAttribute('target')).toEqual(targetValue);
    });

    it('should render an anchor with the correct target prop when external', () => {
        const targetValue = '_blank';
        const { getByRole } = render(<Link to="/" target={targetValue} external />);
        expect(getByRole('link').getAttribute('target')).toEqual(targetValue);
    });

    it('should render an anchor with the correct rel prop', () => {
        const relValue = 'noopener';
        const { getByRole } = render(<MemoryRouter><Link to="/" rel={relValue} /></MemoryRouter>);
        expect(getByRole('link').getAttribute('rel')).toEqual(relValue);
    });

    it('should render an anchor with the correct rel prop when external', () => {
        const relValue = 'noopener';
        const { getByRole } = render(<Link to="/" external={true} rel={relValue} />);
        expect(getByRole('link').getAttribute('rel')).toEqual(relValue);
    });
});