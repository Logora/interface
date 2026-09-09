import React from "react";
import { DebateSkeleton } from "./DebateSkeleton";

const meta = {
	title: "Skeleton/Debate Skeleton",
	component: DebateSkeleton,
	args: {
		enableAnimation: true,
	},
	argTypes: {
		enableAnimation: { control: "boolean" },
	},
	render: (args) => (
		<div style={{ width: "900px" }}>
			<DebateSkeleton {...args} />
		</div>
	),
};

export default meta;

export const DefaultDebateSkeleton = {};

export const DebateSkeletonWithoutAnimation = {
	args: {
		enableAnimation: false,
	},
};
