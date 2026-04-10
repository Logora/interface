export default {
	title: "Input/Text Input",
	component: TextInput,
	args: {
		placeholder: "enter text...",
		activeLabel: true,
		value: undefined,
		filled: false,
		error: false,
		success: false,
		disabled: false,
		message: undefined,
	},
	argTypes: {
		placeholder: { control: "text" },
		activeLabel: { control: "boolean" },
		value: { control: "text" },
		filled: { control: "boolean" },
		error: { control: "boolean" },
		success: { control: "boolean" },
		disabled: { control: "boolean" },
		message: { control: "text" },
	},
};

import { Announcement } from "@logora/debate/icons/regular_icons";
import React from "react";
import { TextInput } from "./TextInput";

export const BasicTextInput = () => (
	<TextInput placeholder="enter text..." data-testid="test-input" />
);

export const TextInputWithoutLabel = () => (
	<TextInput
		placeholder="enter text..."
		activeLabel={false}
		data-testid="test-input"
	/>
);

export const FilledTextInput = () => (
	<TextInput value="some text" filled data-testid="test-input" />
);

export const ErrorTextInput = () => (
	<TextInput placeholder="placeholder" error data-testid="test-input" />
);

export const ErrorTextInputWithMessage = () => (
	<TextInput
		placeholder="placeholder"
		error
		data-testid="test-input"
		message="error to be displayed under the input"
	/>
);

export const SuccessTextInput = () => (
	<TextInput placeholder="placeholder" success data-testid="test-input" />
);

export const DisabledTextInput = () => {
	return (
		<TextInput placeholder="placeholder..." disabled data-testid="test-input" />
	);
};

export const TextInputWithRightIcon = () => (
	<TextInput
		placeholder="search..."
		iconRight={
			<Announcement
				style={{ cursor: "pointer" }}
				onClick={() => alert("on icon click")}
			/>
		}
	/>
);

export const TextInputWithLeftIcon = () => (
	<TextInput
		placeholder="search..."
		iconLeft={
			<Announcement
				style={{ cursor: "pointer" }}
				onClick={() => alert("on icon click")}
			/>
		}
	/>
);

export const TextInputWithImage = () => (
	<TextInput
		placeholder="search..."
		iconRight={
			<img
				src="https://via.placeholder.com/20"
				alt="icon"
				style={{ cursor: "pointer" }}
			/>
		}
	/>
);