import React from "react";
import { AnnouncementDialog } from "./AnnouncementDialog";
import HomeIcon from "./HomeIcon.dev";

export default {
	title: "Dialog/Announcement Dialog",
	component: AnnouncementDialog,
	args: {
		message: "An announcement message !",
		fullWidth: false,
		useCustomIcon: false,
	},
	argTypes: {
		message: { control: "text" },
		fullWidth: { control: "boolean" },
		useCustomIcon: { control: "boolean" },
	},
	render: ({ useCustomIcon, ...args }) => (
		<AnnouncementDialog {...args} icon={useCustomIcon ? HomeIcon : undefined} />
	),
};

export const DefaultAnnouncementDialog = {};

export const AnnouncementDialogCustomIcon = {
	args: {
		useCustomIcon: true,
		message: "An announcement message width custom icon !",
	},
};

export const AnnouncementDialogFullWidth = {
	args: {
		fullWidth: true,
		message: "An announcement message with full width !",
	},
};
