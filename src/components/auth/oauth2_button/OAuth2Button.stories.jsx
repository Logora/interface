import React from "react";
import { MemoryRouter } from "react-router-dom";
import { OAuth2Button } from "./OAuth2Button";

export default {
	title: "Auth/Oauth2 Button",
	component: OAuth2Button,
	args: {
		authDialogUrl: "https://www.example.com/dialog/oauth",
		clientId: "client-id",
		scope: "email,profile",
		provider: "my-oauth2-provider",
		redirectUri: "https://auth.redirect/uri",
		popup: true,
		children: "Click here to login !",
	},
	argTypes: {
		authDialogUrl: {
			control: "text",
		},
		clientId: {
			control: "text",
		},
		scope: {
			control: "text",
		},
		provider: {
			control: "text",
		},
		redirectUri: {
			control: "text",
		},
		popup: {
			control: "boolean",
		},
		children: {
			control: "text",
		},
	},
	render: ({ children, ...args }) => (
		<MemoryRouter>
			<OAuth2Button {...args}>{children}</OAuth2Button>
		</MemoryRouter>
	),
};

export const DefaultOAuth2Button = {};
