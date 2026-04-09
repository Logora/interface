import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Link } from "./Link";

export default {
	title: "Action/Link",
	component: Link,
	args: {
		to: "/page",
		external: false,
		children: "Default",
	},
	argTypes: {
		to: {
			control: "text",
		},
		external: {
			control: "boolean",
		},
		children: {
			control: "text",
		},
	},
	render: ({ children, ...args }) => {
		if (args.external) {
			return <Link {...args}>{children}</Link>;
		}
		return (
			<MemoryRouter>
				<Link {...args}>{children}</Link>
			</MemoryRouter>
		);
	},
};

export const DefaultLinkButton = {};

export const ExternalLinkButton = {
	args: {
		external: true,
		children: "External",
	},
};
