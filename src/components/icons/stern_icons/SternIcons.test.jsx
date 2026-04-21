import { render, screen } from "@testing-library/react";
import React from "react";
import { SternIconsLibrary } from "./SternIcons.stories";

describe("Stern icons", () => {
	it("renders SternIconsLibrary component", () => {
		render(<SternIconsLibrary />);

		const arrow = screen.getByTestId("arrow-icon");
		expect(arrow).toBeTruthy();

		const expertBadge = screen.getByTestId("expert-badge-icon");
		expect(expertBadge).toBeTruthy();
	});
});
