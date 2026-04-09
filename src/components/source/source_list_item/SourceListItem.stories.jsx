import React from "react";
import { SourceListItem } from "./SourceListItem";

export default {
	title: "Source/Source List Item",
	component: SourceListItem,
	args: {
		publisher: "source.com",
		url: "https://source.com",
		title: "Source list item component",
		index: 0,
		containerWidth: "auto",
	},
	argTypes: {
		publisher: { control: "text" },
		url: { control: "text" },
		title: { control: "text" },
		index: { control: "number" },
		containerWidth: { control: "text" },
	},
	render: ({ containerWidth, ...args }) => (
		<div style={{ width: containerWidth }}>
			<SourceListItem {...args} />
		</div>
	),
};

export const DefaultSourceListItem = {};

export const LineClampedSourceListItem = {
	args: {
		containerWidth: "250px",
		title:
			"Super long title article, Super long title article, Super long title article, Super long title article, Super long title article, Super long title article",
	},
};
