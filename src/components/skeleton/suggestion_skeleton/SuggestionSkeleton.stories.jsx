import React from "react";
import { SuggestionSkeleton } from "./SuggestionSkeleton";

const meta = {
	title: "Skeleton/Suggestion Skeleton",
	component: SuggestionSkeleton,
	args: {
		enableAnimation: true,
		numberOfSuggestions: 4,
	},
	argTypes: {
		enableAnimation: { control: "boolean" },
		numberOfSuggestions: { control: "number" },
	},
	render: (args) => (
		<div style={{ width: "900px" }}>
			<SuggestionSkeleton {...args} />
		</div>
	),
};

export default meta;

export const DefaultSuggestionSkeleton = {};

export const SuggestionSkeletonWithoutAnimation = {
	args: {
		enableAnimation: false,
	},
};
