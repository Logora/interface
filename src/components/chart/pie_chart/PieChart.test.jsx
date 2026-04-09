import { render, screen } from "@testing-library/react";
import React from "react";
import { DefaultPieChart } from "./PieChart.stories";

describe("PieChart", () => {
	it("renders PieChart component", () => {
		const container = render(<DefaultPieChart />);
		expect(screen.getByTestId("pieChartCanvas")).toBeTruthy();
	});
});
