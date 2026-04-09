export default {
	title: "Input/Toggle",
	component: Toggle,
	args: {
		label: undefined,
		message: undefined,
		disabled: false,
		checked: false,
	},
	argTypes: {
		label: { control: "text" },
		message: { control: "text" },
		disabled: { control: "boolean" },
		checked: { control: "boolean" },
	},
};

import React from "react";
import { Toggle } from "./Toggle";

export function BasicToggle() {
	return <Toggle onInputChanged={(e) => console.log("e", e.target.checked)} />;
}

export function ToggleWithLabel() {
	return (
		<Toggle
			label={"Yes or no ?"}
			onInputChanged={(e) => console.log("e", e.target.checked)}
		/>
	);
}

export function DisabledToggle() {
	return <Toggle disabled />;
}

export function DisabledAndCheckedToggle() {
	return <Toggle disabled checked />;
}

export function ToggleWithErrorMessage() {
	return <Toggle label={"Yes or no ?"} message={"Error !"} />;
}
