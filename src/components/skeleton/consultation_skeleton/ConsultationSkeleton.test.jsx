import { render, screen } from "@testing-library/react";
import React from "react";
import { ConsultationSkeleton } from "./ConsultationSkeleton";

describe("ConsultationSkeleton", () => {
	it("should render skeleton with correct test id", () => {
		render(<ConsultationSkeleton />);
		expect(screen.getByTestId("consultation-skeleton")).toBeTruthy();
	});

	it("applies custom className when passed", () => {
		render(<ConsultationSkeleton className="custom-class" />);
		expect(screen.getByTestId("consultation-skeleton")).toHaveClass(
			"custom-class",
		);
	});

	it("renders the default number of proposal items", () => {
		render(<ConsultationSkeleton />);
		const items = screen
			.getByTestId("consultation-skeleton")
			.querySelectorAll(".proposalItem");
		expect(items.length).toBe(4);
	});

	it("renders the requested number of proposal items", () => {
		render(<ConsultationSkeleton numberOfProposals={2} />);
		const items = screen
			.getByTestId("consultation-skeleton")
			.querySelectorAll(".proposalItem");
		expect(items.length).toBe(2);
	});

	it("disables animation when enableAnimation prop is false", () => {
		render(<ConsultationSkeleton enableAnimation={false} />);
		const skeletonItems = screen
			.getByTestId("consultation-skeleton")
			.querySelectorAll(".react-loading-skeleton");
		expect(skeletonItems.length).toBeGreaterThan(0);
		for (const item of skeletonItems) {
			expect(item).toHaveStyle("--pseudo-element-display: none");
		}
	});
});
