import { IconProvider } from "@logora/debate/icons/icon_provider";
import { Announcement } from "@logora/debate/icons/regular_icons";
import * as regularIcons from "@logora/debate/icons/regular_icons";
import { render, screen } from "@testing-library/react";
import React from "react";
import { AnnouncementDialog } from "./AnnouncementDialog";

describe("AnnouncementDialog", () => {
	it("should render with the correct text", () => {
		const dialog = render(
			<IconProvider library={regularIcons}>
				<AnnouncementDialog message={"An announcement message !"} />
			</IconProvider>,
		);
		expect(screen.getByText("An announcement message !")).toBeTruthy();
		expect(dialog.getByTestId("announcement-icon")).toBeTruthy();
		expect(dialog.queryByTestId("custom-icon")).toBeNull();
	});

	it("should render with the custom icon", () => {
		const dialog = render(
			<IconProvider library={regularIcons}>
				<AnnouncementDialog
					icon={Announcement}
					message={"An other announcement message !"}
				/>
			</IconProvider>,
		);
		expect(screen.getByText("An other announcement message !")).toBeTruthy();
		expect(dialog.getByTestId("custom-icon")).toBeTruthy();
		expect(dialog.queryByTestId("announcement-icon")).toBeNull();
	});
});
