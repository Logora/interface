import React from "react";
import { PageSkeleton } from "./PageSkeleton";

const meta = {
	title: "Skeleton/Page Skeleton",
	component: PageSkeleton,
	args: {
		photo: "right",
		items: 3,
		tabs: false,
		enableAnimation: true,
	},
	argTypes: {
		photo: { control: "select", options: ["left", "right", null] },
		items: { control: "number" },
		tabs: { control: "boolean" },
		enableAnimation: { control: "boolean" },
	},
	render: (args) => (
		<div style={{ width: "900px" }}>
			<PageSkeleton {...args} />
		</div>
	),
};

export default meta;

export const DefaultPageSkeleton = {};

export const PageSkeletonWithTabs = {
	args: {
		tabs: true,
	},
};

export const PageSkeletonWithPhotoLeft = {
	args: {
		photo: "left",
		tabs: true,
	},
};

export const PageSkeletonWithoutPhoto = {
	args: {
		photo: null,
		tabs: true,
		items: 5,
	},
};

export const PageSkeletonWithoutAnimation = {
	args: {
		enableAnimation: false,
	},
};
