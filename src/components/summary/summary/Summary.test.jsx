import { ResponsiveProvider } from "@logora/debate/hooks/use_responsive";
import { IconProvider } from "@logora/debate/icons/icon_provider";
import * as regularIcons from "@logora/debate/icons/regular_icons";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { IntlProvider } from "react-intl";
import { Summary } from "./Summary";
import styles from "./Summary.module.scss";

const renderSummary = (props) => {
	return render(
		<ResponsiveProvider>
			<IconProvider library={regularIcons}>
				<IntlProvider locale="en">
					<Summary
						title="Summary"
						subtitle="This is a summary"
						{...props}
					/>
				</IntlProvider>
			</IconProvider>
		</ResponsiveProvider>,
	);
};

describe("Summary Component", () => {
	const mockTags = [
		{ id: "tag1", name: "Tag 1" },
		{ id: "tag2", name: "Tag 2" },
	];

	it("renders with tags", () => {
		const summary = JSON.stringify({
			tag1: "Mocked argument 1\nMocked argument 2",
			tag2: "Mocked argument 3\nMocked argument 4",
		});

		renderSummary({
			summary,
			tags: mockTags,
			tagClassNames: styles.tag,
		});

		expect(screen.getByText("Summary")).toBeInTheDocument();

		fireEvent.click(screen.getByText("Summary"));

		expect(screen.getByText("Tag 1")).toBeInTheDocument();
		expect(screen.getByText("Tag 2")).toBeInTheDocument();
		expect(screen.getByText("Mocked argument 1")).toBeInTheDocument();
		expect(screen.getByText("Mocked argument 3")).toBeInTheDocument();
	});

	it("renders without tags", () => {
		const summary = JSON.stringify({
			global: "Mocked argument 1\nMocked argument 2",
		});

		renderSummary({
			summary,
			tags: [],
		});

		expect(screen.getByText("Summary")).toBeInTheDocument();

		fireEvent.click(screen.getByText("Summary"));

		expect(screen.getByText("Mocked argument 1")).toBeInTheDocument();
		expect(screen.getByText("Mocked argument 2")).toBeInTheDocument();
	});

	it("renders plain string summary", () => {
		renderSummary({
			summary: "Mocked argument 1\nMocked argument 2",
			tags: [],
		});

		fireEvent.click(screen.getByText("Summary"));

		expect(screen.getByText("Mocked argument 1")).toBeInTheDocument();
		expect(screen.getByText("Mocked argument 2")).toBeInTheDocument();
	});
});