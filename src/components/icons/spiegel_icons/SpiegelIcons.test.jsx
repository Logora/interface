import { render, screen } from "@testing-library/react";
import React from "react";
import { SpiegelIconsLibrary } from "./SpiegelIcons.stories";

describe("Spiegel icons", () => {
	it("renders SpiegelIconsLibrary component", () => {
		render(<SpiegelIconsLibrary />);

		const alarmIcon = screen.getByTestId("alarm-icon");
		expect(alarmIcon).toBeTruthy();
	});
});
