import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProgressBar } from './ProgressBar';

describe('ProgressBar', () => {
    it('should render progressBar with children', () => {
        const progressBar = render(
            <ProgressBar 
                progress={25} 
                goal={100}
                className={"myClass"} 
                innerClassName={"myInnerClass"}
                subtitleClassName={"subtitleClassName"}
            >
                My progress bar
            </ProgressBar>
        );

        expect(screen.getByText("My progress bar")).toBeTruthy();
        expect(screen.getByRole("progressbar")).toBeTruthy();
    });

    it('should render progressBar with title', () => {
        const progressBar = render(
            <ProgressBar 
                progress={25} 
                goal={100} 
                title={"Title"}
            >
                My progress bar
            </ProgressBar>
        );

        expect(screen.getByText("Title")).toBeTruthy();
        expect(screen.getByText("My progress bar")).toBeTruthy();
        expect(screen.getByRole("progressbar")).toBeTruthy();
    });

    it('should render progressBar with progress subtitle', () => {
        const progressBar = render(
            <ProgressBar 
                progress={25} 
                goal={100} 
                showProgressSubtitle={true}
                progressUnit={"votes"}
            />
        );

        expect(screen.getByText("25 / 100 votes (25%)")).toBeTruthy();
        expect(screen.getByRole("progressbar")).toBeTruthy();
    });

    it('should render progressBar with progress subtitle without unit', () => {
        const progressBar = render(
            <ProgressBar 
                progress={25} 
                goal={100} 
                showProgressSubtitle={true}
            />
        );

        expect(screen.getByText("25 / 100 (25%)")).toBeTruthy();
        expect(screen.getByRole("progressbar")).toBeTruthy();
    });

    it('should render progressBar with full progress subtitle', () => {
        const progressBar = render(
            <ProgressBar 
                progress={25} 
                goal={100} 
                showProgressSubtitle={true}
                barFull={true}
                progressUnit={"votes"}
            />
        );

        expect(screen.getByText("25 votes")).toBeTruthy();
        expect(screen.getByRole("progressbar")).toBeTruthy();
    });

    it('should render progressBar with percentage subtitle', () => {
        const progressBar = render(
            <ProgressBar 
                progress={25} 
                goal={100} 
                showPercentageSubtitle={true}
            />
        );

        expect(screen.getByText("25%")).toBeTruthy();
        expect(screen.getByRole("progressbar")).toBeTruthy();
    });

    it('should render progressBar even if goal is 0', () => {
        const progressBar = render(
            <ProgressBar 
                progress={25} 
                goal={0} 
                title={"Title"}
                showPercentageSubtitle={true}
            >
                My progress bar
            </ProgressBar>
        );

        expect(screen.getByText("Title")).toBeTruthy();
        expect(screen.getByText("My progress bar")).toBeTruthy();
        expect(screen.getByRole("progressbar")).toBeTruthy();
        expect(screen.getByText("0%")).toBeTruthy();
    });
});