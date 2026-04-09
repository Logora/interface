import React, { useState } from "react";
import { HiddenCheckbox } from "./hidden-checkbox";

const meta = {
	title: "Input/Checkbox/Hidden",
	component: HiddenCheckbox,
	args: {
		defaultChecked: false,
	},
	argTypes: {
		defaultChecked: {
			control: "boolean",
		},
	},
	render: ({ defaultChecked }) => {
		const [active, setActive] = useState(defaultChecked);
		const [focused, setFocused] = useState(false);

		return (
			<div>
				<HiddenCheckbox
					defaultChecked={defaultChecked}
					onChange={(e) => setActive(e.currentTarget.checked)}
					onFocus={() => setFocused(true)}
					onBlur={() => setFocused(false)}
				/>
				<div>
					{active ? "checked" : "unchecked"} {focused ? "· focused" : ""}
				</div>
			</div>
		);
	},
};

export default meta;

export const Preview = () => {
	const [active, setActive] = useState(false);
	const [focused, setFocused] = useState(false);

	return (
		<div>
			<HiddenCheckbox
				onChange={(e) => setActive(e.currentTarget.checked)}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
			/>
			<div>
				{active ? "checked" : "unchecked"} {focused ? "· focused" : ""}
			</div>
		</div>
	);
};

export const Checked = () => {
	const [active, setActive] = useState(true);
	const [focused, setFocused] = useState(false);

	return (
		<div>
			<HiddenCheckbox
				defaultChecked={true}
				onChange={(e) => setActive(e.currentTarget.checked)}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
			/>
			<div>
				{active ? "checked" : "unchecked"} {focused ? "· focused" : ""}
			</div>
		</div>
	);
};
