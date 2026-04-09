import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Button } from "./Button";

const meta = {
	title: "Action/Button",
	component: Button,
	args: {
		children: "Button",
		type: "button",
		active: false,
		border: true,
		accent: undefined,
		external: false,
	},
	argTypes: {
		children: { control: "text" },
		type: {
			control: "select",
			options: ["button", "submit", "reset"],
		},
		active: { control: "boolean" },
		border: { control: "boolean" },
		accent: {
			control: "select",
			options: [undefined, "success", "danger"],
		},
		to: { control: "text" },
		external: { control: "boolean" },
		leftIcon: { control: false },
		rightIcon: { control: false },
		handleClick: { action: "clicked" },
	},
	decorators: [
		(Story) => (
			<MemoryRouter>
				<Story />
			</MemoryRouter>
		),
	],
};

export default meta;

export const Primary = {
	args: {},
};

export const AsLink = {
	args: {
		children: "Link button",
		to: "/example-link",
	},
};
