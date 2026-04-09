import React from "react";
import { BoxSkeleton } from "./BoxSkeleton";

const meta = {
	title: "Skeleton/Box Skeleton",
	component: BoxSkeleton,
	args: {
		boxHeight: undefined,
		onlyEdgeBox: false,
		enableAnimation: true,
	},
	argTypes: {
		boxHeight: { control: "number" },
		onlyEdgeBox: { control: "boolean" },
		enableAnimation: { control: "boolean" },
	},
	render: (args) => {
		if (args.onlyEdgeBox) {
			return (
				<div style={{ width: "200px" }}>
					<BoxSkeleton {...args} />
				</div>
			);
		}
		return <BoxSkeleton {...args} />;
	},
};

export default meta;

export const DefaultBoxSkeleton = {};

export const BoxSkeletonLarge = {
	args: {
		boxHeight: 400,
	},
};

export const BoxSkeletonOnlyEdgeBox = {
	args: {
		boxHeight: 200,
		onlyEdgeBox: true,
	},
};

export const BoxSkeletonWithoutAnimation = {
	args: {
		enableAnimation: false,
	},
};
