import { render, screen } from "@testing-library/react";
import React from "react";
import { UserPageSkeleton } from "./UserPageSkeleton";

describe("UserPageSkeleton", () => {
	it("should render skeleton with correct test id", () => {
		render(<UserPageSkeleton />);
		expect(screen.getByTestId("user-page-skeleton")).toBeTruthy();
	});

	it("applies custom className when passed", () => {
		render(<UserPageSkeleton className="custom-class" />);
		expect(screen.getByTestId("user-page-skeleton")).toHaveClass(
			"custom-class",
		);
	});

	it("renders the default number of content items", () => {
		render(<UserPageSkeleton />);
		const items = screen
			.getByTestId("user-page-skeleton")
			.querySelectorAll(".contentItem");
		expect(items.length).toBe(3);
	});

	it("renders the requested number of content items", () => {
		render(<UserPageSkeleton numberOfContentItems={1} />);
		const items = screen
			.getByTestId("user-page-skeleton")
			.querySelectorAll(".contentItem");
		expect(items.length).toBe(1);
	});

	it("disables animation when enableAnimation prop is false", () => {
		render(<UserPageSkeleton enableAnimation={false} />);
		const skeletonItems = screen
			.getByTestId("user-page-skeleton")
			.querySelectorAll(".react-loading-skeleton");
		expect(skeletonItems.length).toBeGreaterThan(0);
		for (const item of skeletonItems) {
			expect(item).toHaveStyle("--pseudo-element-display: none");
		}
	});
});
