import React from "react";
import { UserPageSkeleton } from "./UserPageSkeleton";

const meta = {
	title: "Skeleton/User Page Skeleton",
	component: UserPageSkeleton,
	args: {
		enableAnimation: true,
		numberOfContentItems: 3,
	},
	argTypes: {
		enableAnimation: { control: "boolean" },
		numberOfContentItems: { control: "number" },
	},
	render: (args) => (
		<div style={{ width: "900px" }}>
			<UserPageSkeleton {...args} />
		</div>
	),
};

export default meta;

export const DefaultUserPageSkeleton = {};

export const UserPageSkeletonWithoutAnimation = {
	args: {
		enableAnimation: false,
	},
};
