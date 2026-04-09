import { render, screen } from "@testing-library/react";
import React from "react";
import { BildIconsLibrary } from "./BildIcons.stories";

describe("Bild icons", () => {
	it("renders BildIconsLibrary component", () => {
		render(<BildIconsLibrary />);

		const versusIcon = screen.getByTestId("versus-icon");
		expect(versusIcon).toBeTruthy();

		const alarmIcon = screen.getByTestId("alarm-icon");
		expect(alarmIcon).toBeTruthy();
	});
});
