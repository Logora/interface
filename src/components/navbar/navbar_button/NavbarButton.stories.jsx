export default {
	title: "Navbar/Navbar Button",
	component: NavbarButton,
	args: {
		inDrawer: true,
		isLoggedIn: false,
	},
	argTypes: {
		inDrawer: { control: "boolean" },
		isLoggedIn: { control: "boolean" },
	},
};

import { faker } from "@faker-js/faker";
import { AuthContext } from "@logora/debate/auth/use_auth";
import { ConfigProvider } from "@logora/debate/data/config_provider";
import { ModalProvider } from "@logora/debate/dialog/modal";
import { ResponsiveProvider } from "@logora/debate/hooks/use_responsive";
import { Location } from "@logora/debate/util/location";
import React from "react";
import { IntlProvider } from "react-intl";
import { BrowserRouter } from "react-router-dom";
import { NavbarButton } from "./NavbarButton";

const routes = {
	indexLocation: new Location("espace-debat", {}),
	debateShowLocation: new Location("espace-debat/debat/:debateSlug", {
		debateSlug: "",
	}),
	rootLocation: new Location("/", {}),
	consultationIndexLocation: new Location("espace-debat/consultations", {}),
	consultationShowLocation: new Location(
		"espace-debat/consultations/:consultationSlug",
		{ consultationSlug: "" },
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

const config = {
	isDrawer: true,
	modules: {
		consultation: true,
		suggestions: { active: true },
	},
	actions: {
		hideLoginButton: false,
	},
};

const Providers = ({
	children,
	config,
	currentUser = null,
	isLoggedIn = false,
}) => (
	<BrowserRouter>
		<ConfigProvider routes={routes} config={config}>
			<AuthContext.Provider value={{ currentUser, isLoggedIn }}>
				<ResponsiveProvider>
					<IntlProvider locale="en">
						<ModalProvider>{children}</ModalProvider>
					</IntlProvider>
				</ResponsiveProvider>
			</AuthContext.Provider>
		</ConfigProvider>
	</BrowserRouter>
);

const drawerConfigLoggedOut = { ...config, isDrawer: true };
export const NavbarButtonDrawerLoggedOut = () => (
	<div style={{ width: 120, height: 120 }}>
		<Providers config={drawerConfigLoggedOut} isLoggedIn={false}>
			<NavbarButton inDrawer />
		</Providers>
	</div>
);

const drawerConfigLoggedIn = { ...config, isDrawer: true };
export const NavbarButtonDrawerLoggedIn = () => (
	<div style={{ width: 120, height: 120 }}>
		<Providers
			config={drawerConfigLoggedIn}
			isLoggedIn={true}
			currentUser={loggedInUser}
		>
			<NavbarButton inDrawer />
		</Providers>
	</div>
);
