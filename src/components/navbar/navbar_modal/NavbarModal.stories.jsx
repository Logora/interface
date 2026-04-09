import { faker } from "@faker-js/faker";
import { AuthContext } from "@logora/debate/auth/use_auth";
import { ConfigProvider } from "@logora/debate/data/config_provider";
import { ModalProvider } from "@logora/debate/dialog/modal";
import { ResponsiveProvider } from "@logora/debate/hooks/use_responsive";
import { Location } from "@logora/debate/util/location";
import React from "react";
import { IntlProvider } from "react-intl";
import { BrowserRouter } from "react-router-dom";
import { NavbarModal } from "./NavbarModal";

const routes = {
	indexLocation: new Location("espace-debat", {}),
	debateShowLocation: new Location("espace-debat/debat/:debateSlug", {
		debateSlug: "",
	}),
	rootLocation: new Location("/", {}),
	consultationIndexLocation: new Location("espace-debat/consultations", {}),
	consultationShowLocation: new Location(
		"espace-debat/consultations/:consultationSlug",
		{
			consultationSlug: "",
		},
	),
	suggestionLocation: new Location("espace-debat/suggestions", {}),
	userShowLocation: new Location("espace-debat/user/:userSlug", {
		userSlug: "",
	}),
	userEditLocation: new Location("espace-debat/user/:userSlug/edit", {
		userSlug: "",
	}),
};

const loggedInUser = {
	id: faker.number.int(),
	full_name: faker.person.fullName(),
	image_url: faker.image.avatarGitHub(),
	hash_id: faker.lorem.slug(),
};

const baseConfig = {
	isDrawer: false,
	modules: {
		consultation: true,
		suggestions: {
			active: true,
		},
	},
	actions: {
		hideLoginButton: false,
	},
};

const Providers = ({
	children,
	currentUser = null,
	isLoggedIn = false,
	config = baseConfig,
}) => (
	<BrowserRouter>
		<ConfigProvider routes={routes} config={config}>
			<AuthContext.Provider value={{ currentUser, isLoggedIn }}>
				<ResponsiveProvider>
					<ModalProvider>
						<IntlProvider locale="en">{children}</IntlProvider>
					</ModalProvider>
				</ResponsiveProvider>
			</AuthContext.Provider>
		</ConfigProvider>
	</BrowserRouter>
);

export default {
	title: "Navbar/Navbar Modal",
	component: NavbarModal,
	args: {
		isLoggedIn: false,
		currentUser: null,
		config: baseConfig,
		width: "400px",
		height: "600px",
	},
	argTypes: {
		isLoggedIn: { control: "boolean" },
		currentUser: { control: "object" },
		config: { control: "object" },
		width: { control: "text" },
		height: { control: "text" },
	},
	render: (args) => (
		<div style={{ width: args.width, height: args.height }}>
			<Providers
				isLoggedIn={args.isLoggedIn}
				currentUser={args.currentUser}
				config={args.config}
			>
				<NavbarModal />
			</Providers>
		</div>
	),
};

export const NavbarModalLoggedOut = {};

export const NavbarModalLoggedIn = {
	args: {
		isLoggedIn: true,
		currentUser: loggedInUser,
	},
};
