import { render, screen } from "@testing-library/react";
import React from "react";
import { DebateSkeleton } from "./DebateSkeleton";

describe("DebateSkeleton", () => {
	it("should render skeleton with correct test id", () => {
		render(<DebateSkeleton />);
		expect(screen.getByTestId("debate-skeleton")).toBeTruthy();
	});

	it("applies custom className when passed", () => {
		render(<DebateSkeleton className="custom-class" />);
		expect(screen.getByTestId("debate-skeleton")).toHaveClass("custom-class");
	});

	it("enables animation when enableAnimation prop is true", () => {
		render(<DebateSkeleton enableAnimation={true} />);
		const skeletonItems = screen
			.getByTestId("debate-skeleton")
			.querySelectorAll(".react-loading-skeleton");
		expect(skeletonItems.length).toBeGreaterThan(0);
		for (const item of skeletonItems) {
			expect(item).toHaveClass("react-loading-skeleton");
			expect(
				getComputedStyle(item, ":after").visibility === "visible",
			).toBeTruthy();
		}
	});

	it("disables animation when enableAnimation prop is false", () => {
		render(<DebateSkeleton enableAnimation={false} />);
		const skeletonItems = screen
			.getByTestId("debate-skeleton")
			.querySelectorAll(".react-loading-skeleton");
		for (const item of skeletonItems) {
			expect(item).toHaveClass("react-loading-skeleton");
			expect(item).toHaveStyle("--pseudo-element-display: none");
		}
	});
});
