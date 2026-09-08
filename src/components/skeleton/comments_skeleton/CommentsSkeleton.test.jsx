import { render, screen } from "@testing-library/react";
import React from "react";
import { CommentsSkeleton } from "./CommentsSkeleton";

describe("CommentsSkeleton", () => {
	it("should render skeleton with correct test id", () => {
		render(<CommentsSkeleton />);
		expect(screen.getByTestId("comments-skeleton")).toBeTruthy();
	});

	it("applies custom className when passed", () => {
		render(<CommentsSkeleton className="custom-class" />);
		expect(screen.getByTestId("comments-skeleton")).toHaveClass("custom-class");
	});

	it("renders the default number of comment items", () => {
		render(<CommentsSkeleton />);
		const items = screen
			.getByTestId("comments-skeleton")
			.querySelectorAll(".commentItem");
		expect(items.length).toBe(3);
	});

	it("renders the requested number of comment items", () => {
		render(<CommentsSkeleton numberOfComments={5} />);
		const items = screen
			.getByTestId("comments-skeleton")
			.querySelectorAll(".commentItem");
		expect(items.length).toBe(5);
	});

	it("enables animation when enableAnimation prop is true", () => {
		render(<CommentsSkeleton enableAnimation={true} />);
		const skeletonItems = screen
			.getByTestId("comments-skeleton")
			.querySelectorAll(".react-loading-skeleton");
		expect(skeletonItems.length).toBeGreaterThan(0);
		for (const item of skeletonItems) {
			expect(
				getComputedStyle(item, ":after").visibility === "visible",
			).toBeTruthy();
		}
	});
});
