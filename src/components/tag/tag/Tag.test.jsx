import { render } from "@testing-library/react";
import React from "react";
import { Tag } from "./Tag";
import styles from "./Tag.module.scss";

describe("Tag", () => {
	it("should render with the correct text", () => {
		const tag = render(<Tag text="my-text" />);
		const renderedTag = tag.getByText(/my-text/i);
		expect(renderedTag).toBeTruthy();
	});

	it("should render inactive with the correct style", () => {
		const { getByTestId } = render(<Tag text="my-text" />);
		expect(getByTestId("tag").className).toContain(styles.tag);
		expect(getByTestId("tag").className).not.toContain(styles.active);
	});

	it("should render active with the correct style", () => {
		const { getByTestId } = render(<Tag text="my-text" active />);
		expect(getByTestId("tag").className).toContain(styles.active);
	});
});
