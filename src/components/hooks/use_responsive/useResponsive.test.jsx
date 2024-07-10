import React from 'react';
import { render, screen } from '@testing-library/react';
import { ResponsiveProvider } from './ResponsiveProvider';
import { useResponsive } from './useResponsive';

const ResponsiveComponent = () => {
    const { isMobile, isTablet, isDesktop } = useResponsive();

    return (
        <>
            { isMobile && <div>Shown in mobile container only</div> }
            { isTablet && <div>Shown in tablet container only</div> }
            { isDesktop && <div>Shown in desktop container only</div> }
        </>
    )
}

describe('useResponsive', () => {
    it('should display mobile component if container size is mobile', () => {
        render(
            <div id="rootContainer">
                <ResponsiveProvider containerPath={"#rootContainer"} containerWidth={400}>
                    <ResponsiveComponent />
                </ResponsiveProvider>
            </div>
        )

        expect(screen.getByText("Shown in mobile container only")).toBeTruthy();
    });

    it('should display tablet component if container size is tablet', () => {
        render(
            <div id="rootContainer">
                <ResponsiveProvider containerPath={"#rootContainer"} containerWidth={700}>
                    <ResponsiveComponent />
                </ResponsiveProvider>
            </div>
        )

        expect(screen.getByText("Shown in tablet container only")).toBeTruthy();
    });

    it('should display desktop component if container size is desktop', () => {
        render(
            <div id="rootContainer">
                <ResponsiveProvider containerPath={"#rootContainer"} containerWidth={1000}>
                    <ResponsiveComponent />
                </ResponsiveProvider>
            </div>
        )

        expect(screen.getByText("Shown in desktop container only")).toBeTruthy();
    });
});
