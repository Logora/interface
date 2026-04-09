import { render, screen } from "@testing-library/react";
import React from "react";
import { DefaultDrawer } from "./Drawer.stories";

describe("Drawer", () => {
	it("should open drawer when clicking on button", async () => {
		render(<DefaultDrawer />);

		const openButton = screen.getByTestId("open-button");

		expect(openButton).toBeTruthy();
	});
});
