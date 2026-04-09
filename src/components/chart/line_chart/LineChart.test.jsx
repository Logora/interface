import { render, screen } from "@testing-library/react";
import React from "react";
import { DefaultLineChart } from "./LineChart.stories";

describe("LineChart", () => {
	it("renders LineChart component", () => {
		const container = render(<DefaultLineChart />);
		expect(screen.getByText("day")).toBeTruthy();
	});
});
