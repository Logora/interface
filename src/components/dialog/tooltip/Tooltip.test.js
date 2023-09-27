import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { Tooltip } from "./Tooltip";

describe('Tooltip', () => {
    it('should render with the correct text', () => {
        const tooltip = render(<Tooltip text={"hover tooltip"} onClickText={"click"}>Child</Tooltip>);
        const renderedTooltip = tooltip.getByText(/child/i);
        expect(renderedTooltip).toBeTruthy();
    });

    it('calls onClickText props when clicked', () => {
        const tooltip = render(<Tooltip text={"hover tooltip"} onClickText={"click"}>Child</Tooltip>);
        fireEvent.click(document.querySelector('.tooltipChild'));
        expect(tooltip.getByText(/click/i)).toBeTruthy();
    });

    it('calls text props when hover', () => {
        const tooltip = render(<Tooltip text={"hover tooltip"} onClickText={"click"}>Child</Tooltip>);
        const renderedTooltip = tooltip.getByText(/hover tooltip/i);
        fireEvent.mouseOver(renderedTooltip);
        expect(renderedTooltip).toBeTruthy();
    });

    it('should be at the props position', () => {
        render(<Tooltip text={"hover tooltip"} onClickText={"click"} position={"top"}>Child</Tooltip>);
        const renderedTooltip = document.querySelector('.tooltipText.tooltipTextTop');
        expect(renderedTooltip).toBeTruthy();
    });
});




