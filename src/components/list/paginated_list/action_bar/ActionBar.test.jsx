import { render, fireEvent } from "@testing-library/react";
import React from "react";
import { IntlProvider } from "react-intl";
import { MemoryRouter } from "react-router-dom";
import { ResponsiveProvider } from "@logora/debate/hooks/use_responsive";
import { ActionBar } from "./ActionBar";

const tagList = [
	{ id: 1, display_name: "Politics" },
	{ id: 2, display_name: "Economy" },
	{ id: 3, display_name: "Environment" },
	{ id: 4, display_name: "Education" },
];

const renderActionBar = (props) => {
	return render(
		<MemoryRouter>
			<IntlProvider locale="en">
				<ResponsiveProvider>
					<ActionBar
						title="Consultations"
						tagList={tagList}
						onSearch={() => {}}
						onSortChange={() => {}}
						onTagChange={() => {}}
						{...props}
					/>
				</ResponsiveProvider>
			</IntlProvider>
		</MemoryRouter>,
	);
};

describe("ActionBar", () => {
	it("renders pinned tags first in pinnedTagList order", () => {
		const { getAllByTestId } = renderActionBar({ pinnedTagList: [3, 1] });
		const renderedTags = getAllByTestId("tag").map((tag) => tag.textContent);

		expect(renderedTags).toEqual([
			"Environment",
			"Politics",
			"Economy",
			"Education",
		]);
	});

	it("ignores unknown pinned tag ids", () => {
		const { getAllByTestId } = renderActionBar({ pinnedTagList: [42, 2] });
		const renderedTags = getAllByTestId("tag").map((tag) => tag.textContent);

		expect(renderedTags).toEqual([
			"Economy",
			"Politics",
			"Environment",
			"Education",
		]);
	});

	it("accepts a single pinned tag id", () => {
		const { getAllByTestId } = renderActionBar({
			tagList: {
				success: true,
				data: [
					{ id: 135, display_name: "test" },
					{ id: 138, display_name: "politique" },
				],
			},
			pinnedTagList: 138,
		});
		const renderedTags = getAllByTestId("tag").map((tag) => tag.textContent);

		expect(renderedTags).toEqual(["politique", "test"]);
	});

	it("calls onTagChange when clicking a pinned tag", () => {
		const onTagChange = vi.fn();
		const { getByText } = renderActionBar({
			pinnedTagList: [3],
			onTagChange,
		});

		fireEvent.click(getByText("Environment"));

		expect(onTagChange).toHaveBeenCalledWith(3);
	});
});
