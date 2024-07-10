import React from "react";
import { render } from "@testing-library/react";
import { DefaultPointBox,  PointBoxWithoutTimeAgo } from "./PointBox.composition";

describe("PointBox", () => {
    it("render correctly", () => {
        const { queryByText, getByTestId } = render(<DefaultPointBox />);

        expect(getByTestId("svg-icon")).toBeInTheDocument();
        expect(queryByText("Your text")).toBeInTheDocument();
        expect(queryByText("12 days ago")).toBeInTheDocument();
    });

    it("render without time ago", () => {
        const { queryByText, getByTestId } = render(<PointBoxWithoutTimeAgo />);
        
        expect(getByTestId("svg-icon")).toBeInTheDocument();
        expect(queryByText("Your text")).toBeInTheDocument();
        expect(queryByText("12 days ago")).not.toBeInTheDocument();
    });
});
