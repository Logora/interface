import React from "react";
import { IntlProvider } from "react-intl";
import { SignupForm } from "./SignupForm";

const noop = () => false;

export default {
	title: "Auth/Signup Form",
	component: SignupForm,
	args: {
		onSubmit: noop,
		providerName: "Debate Inc.",
		error: false,
	},
	argTypes: {
		onSubmit: {
			control: false,
		},
		providerName: {
			control: "text",
		},
		error: {
			control: "boolean",
		},
	},
	render: (args) => (
		<IntlProvider locale="en">
			<SignupForm {...args} />
		</IntlProvider>
	),
};

export const DefaultSignupForm = {};

export const SignupFormWithError = {
	args: {
		providerName: "My company",
		error: true,
	},
};
