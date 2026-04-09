import React from "react";
import { MemoryRouter } from "react-router-dom";
import { FacebookLoginButton } from "./FacebookLoginButton";

export default {
	title: "Auth/Facebook Login Button",
	component: FacebookLoginButton,
	args: {
		text: "Sign in with Facebook",
		facebookClientId: "client-id",
		redirectUri: "https://auth.redirect/uri",
	},
	argTypes: {
		text: {
			control: "text",
		},
		facebookClientId: {
			control: "text",
		},
		redirectUri: {
			control: "text",
		},
	},
	render: (args) => (
		<MemoryRouter>
			<FacebookLoginButton {...args} />
		</MemoryRouter>
	),
};

export const DefaultFacebookLoginButton = {};
