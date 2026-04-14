import { Suggestion } from "@logora/debate/icons/regular_icons";
import React from "react";
import { PointBox } from "./PointBox";

const meta = {
	title: "Gamification/Point Box",
	component: PointBox,
	args: {
		text: "Your text",
		timeAgo: "12 days ago",
		showIcon: true,
	},
	argTypes: {
		text: { control: "text" },
		timeAgo: { control: "text" },
		showIcon: { control: "boolean" },
	},
	render: ({ showIcon, ...args }) => (
		<PointBox
			{...args}
			icon={
				showIcon ? (
					<Suggestion width={16} height={16} data-testid={"svg-icon"} />
				) : null
			}
		/>
	),
};

export default meta;

const renderStory = (overrides = {}) =>
	meta.render({ ...meta.args, ...overrides });

export const DefaultPointBox = (props) => renderStory(props);

export const PointBoxWithoutTimeAgo = (props) =>
	renderStory({ timeAgo: null, ...props });
