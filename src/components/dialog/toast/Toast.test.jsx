import { render, screen } from "@testing-library/react";
import React from "react";
import { DefaultToast, ToastWithPoints } from "./Toast.stories";

describe("Toast", () => {
	it("should render with the correct text", () => {
		const dialog = render(<DefaultToast />);
		expect(screen.getByText("A message !")).toBeTruthy();
	});

	it("should render with points", () => {
		const dialog = render(<ToastWithPoints />);

		expect(screen.getByText("A message !")).toBeTruthy();
		expect(screen.getByText(34)).toBeTruthy();
	});
});
