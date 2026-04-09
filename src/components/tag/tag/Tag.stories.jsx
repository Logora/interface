import { Icon } from "@logora/debate/icons/icon";
import React from "react";
import { Tag } from "./Tag";

export default {
	title: "Tag/Tag",
	component: Tag,
	args: {
		text: "default",
		active: false,
		leftIcon: false,
		rightIcon: false,
	},
	argTypes: {
		text: {
			control: "text",
		},
		active: {
			control: "boolean",
		},
		leftIcon: {
			control: "boolean",
		},
		rightIcon: {
			control: "boolean",
		},
	},
	render: ({ leftIcon, rightIcon, ...args }) => (
		<Tag
			{...args}
			leftIcon={leftIcon ? <Icon name="home" width="15" height="15" /> : null}
			rightIcon={
				rightIcon ? <Icon name="close" width="10" height="10" /> : null
			}
		/>
	),
};

export const DefaultTag = {};

export const ActiveTag = {
	args: {
		text: "active",
		active: true,
	},
};

export const TagWithLeftIcon = {
	args: {
		text: "left icon",
		leftIcon: true,
	},
};

export const TagWithRightIcon = {
	args: {
		text: "right icon",
		rightIcon: true,
	},
};

export const ActiveTagWithRightIcon = {
	args: {
		text: "right icon",
		active: true,
		rightIcon: true,
	},
};
