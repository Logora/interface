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
};

export default meta;

export const DefaultDebateSkeleton = {};

export const DebateSkeletonWithoutAnimation = {
	args: {
		enableAnimation: false,
	},
};
