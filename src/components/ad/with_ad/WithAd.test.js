import React from 'react';
import { render, screen } from '@testing-library/react';
import { WithAd } from './WithAd';

describe('WithAd', () => {
    it('should render only children if path is empty', () => {
        render(
            <WithAd
                id={"ad-id"}
                adPath={""}
                sizes={[[300, 250]]}
            >
                <div>Hello world</div>
            </WithAd>
        );

        expect(screen.getByText("Hello world")).toBeTruthy();
        expect(screen.queryByTestId("ad-unit")).toBeNull();
    });

    it('should render children only if no index is passed', () => {
        render(
            <WithAd
                id={"ad-id"}
                adPath={"/path"}
                sizes={[[300, 250]]}
            >
                <div>Hello world</div>
            </WithAd>
        );

        expect(screen.getByText("Hello world")).toBeTruthy();
        expect(screen.queryByTestId("ad-unit")).toBeNull();
    });

    it('should render children and ad unit if index and frequency match', () => {
        const { container } = render(
            <WithAd
                id={"ad-id"}
                adPath={"/path"}
                sizes={[[300, 250]]}
                index={0}
                frequency={2}
            >
                <div>Hello world</div>
            </WithAd>
        );

        expect(screen.getByText("Hello world")).toBeTruthy();
        expect(document.getElementById('ad-id')).toBeTruthy();
    });

    it('should render children and ad unit with correct id', () => {
        render(
            <WithAd
                id={"ad-id"}
                adPath={"/path"}
                sizes={[[300, 250]]}
                index={12}
                frequency={4}
            >
                <div>Hello world</div>
            </WithAd>
        );

        expect(screen.getByText("Hello world")).toBeTruthy();
        expect(document.getElementById('ad-id-12')).toBeTruthy();
    });

    it('should render only children if index and frequency do not match', () => {
        render(
            <WithAd
                id={"ad-id"}
                adPath={"/path"}
                sizes={[[300, 250]]}
                index={1}
                frequency={2}
            >
                <div>Hello world</div>
            </WithAd>
        );

        expect(screen.getByText("Hello world")).toBeTruthy();
        expect(document.getElementById('ad-id')).toBeNull();
    });

    it('should pass extra props to children', () => {
        render(
            <WithAd
                id={"ad-id"}
                adPath={"/path"}
                sizes={[[300, 250]]}
                index={1}
                frequency={2}
                data-testid={"children-testid"}
            >
                <div>Hello world</div>
            </WithAd>
        );

        expect(screen.getByText("Hello world")).toBeTruthy();
        expect(screen.getByTestId("children-testid")).toHaveTextContent("Hello world");
    });
});