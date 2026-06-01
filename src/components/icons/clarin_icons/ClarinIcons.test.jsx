import { render, screen } from "@testing-library/react";
import React from "react";
import { ClarinIconsLibrary } from "./ClarinIcons.stories";

describe("Clarin icons", () => {
	it("renders ClarinIconsLibrary component", () => {
		render(<ClarinIconsLibrary />);

		const alarm = screen.getByTestId("alarm-icon");
		expect(alarm).toBeTruthy();

		const upvote = screen.getByTestId("upvote-icon");
		expect(upvote).toBeTruthy();
	});
});
