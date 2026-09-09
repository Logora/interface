import { render, screen } from "@testing-library/react";
import React from "react";
import { SuggestionSkeleton } from "./SuggestionSkeleton";

describe("SuggestionSkeleton", () => {
	it("should render skeleton with correct test id", () => {
		render(<SuggestionSkeleton />);
		expect(screen.getByTestId("suggestion-skeleton")).toBeTruthy();
	});

	it("applies custom className when passed", () => {
		render(<SuggestionSkeleton className="custom-class" />);
		expect(screen.getByTestId("suggestion-skeleton")).toHaveClass(
			"custom-class",
		);
	});

	it("renders the default number of suggestion items", () => {
		render(<SuggestionSkeleton />);
		const items = screen
			.getByTestId("suggestion-skeleton")
			.querySelectorAll(".suggestionItem");
		expect(items.length).toBe(4);
	});

	it("renders the requested number of suggestion items", () => {
		render(<SuggestionSkeleton numberOfSuggestions={2} />);
		const items = screen
			.getByTestId("suggestion-skeleton")
			.querySelectorAll(".suggestionItem");
		expect(items.length).toBe(2);
	});

	it("enables animation when enableAnimation prop is true", () => {
		render(<SuggestionSkeleton enableAnimation={true} />);
		const skeletonItems = screen
			.getByTestId("suggestion-skeleton")
			.querySelectorAll(".react-loading-skeleton");
		expect(skeletonItems.length).toBeGreaterThan(0);
		for (const item of skeletonItems) {
			expect(item).not.toHaveStyle("--pseudo-element-display: none");
		}
	});

	it("disables animation when enableAnimation prop is false", () => {
		render(<SuggestionSkeleton enableAnimation={false} />);
		const skeletonItems = screen
			.getByTestId("suggestion-skeleton")
			.querySelectorAll(".react-loading-skeleton");
		expect(skeletonItems.length).toBeGreaterThan(0);
		for (const item of skeletonItems) {
			expect(item).toHaveStyle("--pseudo-element-display: none");
		}
	});
});
