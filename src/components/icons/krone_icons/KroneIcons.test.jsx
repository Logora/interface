import { render, screen } from "@testing-library/react";
import React from "react";
import { KroneIconsLibrary } from "./KroneIcons.stories";

describe("Krone icons", () => {
	it("renders KroneIconsLibrary component", () => {
		render(<KroneIconsLibrary />);

		const arrow = screen.getByTestId("arrow-icon");
		expect(arrow).toBeTruthy();

		const checkbox = screen.getByTestId("checkbox-icon");
		expect(checkbox).toBeTruthy();
	});
});
