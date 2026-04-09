import * as regularIcons from "@logora/debate/icons/regular_icons";
import { act, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { IconProvider } from "./IconProvider";

const ComponentWithIcons = () => {
	return <div>Hello world !</div>;
};

describe("IconProvider", () => {
	it("should render component with icon library", async () => {
		act(() => {
			render(
				<IconProvider library={regularIcons}>
					<ComponentWithIcons />
				</IconProvider>,
			);
		});

		await waitFor(() => {
			expect(screen.getByText(/hello world/i)).toBeTruthy();
		});
	});
});
