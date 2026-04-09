import React from "react";
import { MemoryRouter } from "react-router-dom";
import { BackLink } from "./BackLink";

export default {
	title: "Action/Back Link",
	args: {
		to: "#",
		text: "Back to article",
		external: true,
	},
	argTypes: {
		to: {
			control: "text",
		},
		text: {
			control: "text",
		},
		external: {
			control: "boolean",
		},
	},
	decorators: [
		(Story) => (
			<MemoryRouter>
				<Story />
			</MemoryRouter>
		),
	],
	render: (args) => <BackLink {...args} />,
};

export const DefaultBackLink = {};
