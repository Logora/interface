import { render, screen } from "@testing-library/react";
import React from "react";
import { HeroIconsLibrary } from "./HeroIcons.stories";

describe("Hero icons", () => {
	it("renders HeroIconsLibrary component", () => {
		render(<HeroIconsLibrary />);

		const alarmIcon = screen.getByTestId("alarm-icon");
		expect(alarmIcon).toBeTruthy();
	});
});
