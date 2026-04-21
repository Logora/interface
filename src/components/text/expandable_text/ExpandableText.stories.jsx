import { faker } from "@faker-js/faker";
import React from "react";
import { ExpandableText } from "./ExpandableText";

const text = faker.lorem.paragraph(35);

const defaultArgs = {
	expandable: true,
	expandText: "Read more",
	collapseText: "Read less",
	maxHeight: "100",
	showIcon: true,
	backgroundColor: "var(--background-color-primary)",
	className: undefined,
	isReply: false,
	onCollapse: () => {},
	onExpand: () => {},
};

export default {
	title: "Text/Expandable Text",
	component: ExpandableText,
	args: defaultArgs,
	argTypes: {
		expandable: { control: "boolean" },
		expandText: { control: "text" },
		collapseText: { control: "text" },
		maxHeight: { control: "text" },
		showIcon: { control: "boolean" },
		backgroundColor: { control: "color" },
		className: { control: "text" },
		isReply: { control: "boolean" },
		onCollapse: { control: false },
		onExpand: { control: false },
		children: { control: false },
	},
	render: (args) => (
		<ExpandableText {...args}>
			<div>{text}</div>
		</ExpandableText>
	),
};

export const DefaultExpandableText = {};

export const ExpandableTextWithDarkBackground = {
	args: {
		backgroundColor: "#000",
	},
	render: (args) => (
		<div style={{ background: "#000", padding: "50px" }}>
			<ExpandableText {...args}>
				<div style={{ color: "#FFF" }}>{text}</div>
			</ExpandableText>
		</div>
	),
};

export const ExpandableTextWithoutIcon = {
	args: {
		showIcon: false,
	},
};
