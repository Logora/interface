import React from "react";
import { MemoryRouter } from "react-router-dom";
import { GoogleLoginButton } from "./GoogleLoginButton";

export default {
	title: "Auth/Google Login Button",
	component: GoogleLoginButton,
	args: {
		text: "Sign in with Google",
		googleClientId: "client-id",
		redirectUri: "https://auth.redirect/uri",
	},
	argTypes: {
		text: {
			control: "text",
		},
		googleClientId: {
			control: "text",
		},
		redirectUri: {
			control: "text",
		},
	},
	render: (args) => (
		<MemoryRouter>
			<GoogleLoginButton {...args} />
		</MemoryRouter>
	),
};

export const DefaultGoogleLoginButton = {};
