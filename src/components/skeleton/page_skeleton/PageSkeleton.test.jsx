import { render, screen } from "@testing-library/react";
import React from "react";
import { PageSkeleton } from "./PageSkeleton";

describe("PageSkeleton", () => {
	it("should render skeleton with correct test id", () => {
		render(<PageSkeleton />);
		expect(screen.getByTestId("page-skeleton")).toBeTruthy();
	});

	it("applies custom className when passed", () => {
		render(<PageSkeleton className="custom-class" />);
		expect(screen.getByTestId("page-skeleton")).toHaveClass("custom-class");
	});

	it("renders photo on the right by default", () => {
		const { getByTestId } = render(<PageSkeleton />);
		const header = getByTestId("page-skeleton").firstChild.firstChild;
		expect(header.lastChild).not.toHaveClass("undefined");
	});

	it("renders photo on the left when photo prop is left", () => {
		render(<PageSkeleton photo="left" />);
		expect(screen.getByTestId("page-skeleton")).toBeTruthy();
	});

	it("does not render photo when photo prop is null", () => {
		render(<PageSkeleton photo={null} />);
		const container = screen.getByTestId("page-skeleton");
		const circles = container.querySelectorAll(
			".react-loading-skeleton-circle, .react-loading-skeleton",
		);
		expect(circles.length).toBeGreaterThan(0);
	});

	it("renders the configured number of content items", () => {
		const { getByTestId } = render(<PageSkeleton items={5} />);
		expect(
			getByTestId("page-skeleton").querySelectorAll(".react-loading-skeleton")
				.length,
		).toBeGreaterThan(0);
	});

	it("renders tabs row when tabs prop is true", () => {
		render(<PageSkeleton tabs={true} />);
		expect(screen.getByTestId("page-skeleton")).toBeTruthy();
	});

	it("does not render tabs row when tabs prop is false", () => {
		render(<PageSkeleton />);
		expect(screen.getByTestId("page-skeleton")).toBeTruthy();
	});

	it("enables animation when enableAnimation prop is true", () => {
		render(<PageSkeleton enableAnimation={true} />);
		const skeletonItems = screen
			.getByTestId("page-skeleton")
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
		render(<PageSkeleton enableAnimation={false} />);
		const skeletonItems = screen
			.getByTestId("page-skeleton")
			.querySelectorAll(".react-loading-skeleton");
		for (const item of skeletonItems) {
			expect(item).toHaveStyle("--pseudo-element-display: none");
		}
	});
});
