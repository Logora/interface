import { render, screen } from "@testing-library/react";
import React from "react";
import { RegularIconsLibrary } from "./RegularIcons.stories";

describe("regular icons", () => {
	it("renders RegularIconsLibrary component", () => {
		render(<RegularIconsLibrary />);

		const alarmIcon = screen.getByTestId("alarm-icon");
		expect(alarmIcon).toBeTruthy();
	});
});
