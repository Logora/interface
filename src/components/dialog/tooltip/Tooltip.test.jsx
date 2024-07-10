import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { Tooltip } from "./Tooltip";

describe('Tooltip', () => {
    it('should render with the correct text', async () => {
        const tooltip = render(<Tooltip text={"hover tooltip"} onClickText={"click"}>Child</Tooltip>);
        expect(tooltip.getByText(/child/i)).toBeTruthy();

        fireEvent.mouseOver(tooltip.getByText(/child/i));
        expect(tooltip.getByText(/hover tooltip/i)).toBeTruthy();
    });

    it('should render children only if no text is passed', () => {
        const tooltip = render(<Tooltip>Child</Tooltip>);
        expect(tooltip.getByText(/child/i)).toBeTruthy();

        fireEvent.mouseOver(tooltip.getByText(/child/i));
        expect(tooltip.queryByText(/hover tooltip/i)).toBeNull();
    });

    it('calls onClickText props when clicked', () => {
        const tooltip = render(<Tooltip text={"hover tooltip"} onClickText={"click"}>Child</Tooltip>);
        fireEvent.click(document.querySelector('.tooltipChild'));
        expect(tooltip.getByText(/click/i)).toBeTruthy();
    });

    it('should be at the props position', () => {
        render(<Tooltip text={"hover tooltip"} onClickText={"click"} position={"top"}>Child</Tooltip>);
        const renderedTooltip = document.querySelector('.tooltipText.tooltipTextTop');
        expect(renderedTooltip).toBeTruthy();
    });
});




