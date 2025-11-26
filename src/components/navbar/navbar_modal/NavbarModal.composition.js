import React from "react";
import { BrowserRouter } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { ConfigProvider } from "@logora/debate.data.config_provider";
import { AuthContext } from "@logora/debate.auth.use_auth";
import { ModalProvider } from "@logora/debate.dialog.modal";
import { ResponsiveProvider } from "@logora/debate.hooks.use_responsive";
import { IconProvider } from "@logora/debate.icons.icon_provider";
import * as regularIcons from "@logora/debate.icons.regular_icons";
import { Location } from "@logora/debate.util.location";
import { faker } from "@faker-js/faker";
import { NavbarModal } from "./NavbarModal";

const routes = {
    indexLocation: new Location("espace-debat", {}),
    debateShowLocation: new Location("espace-debat/debat/:debateSlug", { debateSlug: "" }),
    rootLocation: new Location("/", {}),
    consultationIndexLocation: new Location("espace-debat/consultations", {}),
    consultationShowLocation: new Location("espace-debat/consultations/:consultationSlug", {
        consultationSlug: "",
    }),
    suggestionLocation: new Location("espace-debat/suggestions", {}),
    userShowLocation: new Location("espace-debat/user/:userSlug", { userSlug: "" }),
    userEditLocation: new Location("espace-debat/user/:userSlug/edit", { userSlug: "" }),
};

const loggedInUser = {
    id: faker.datatype.number(),
    full_name: faker.name.fullName(),
    image_url: faker.image.avatar(),
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

const Providers = ({ children, currentUser = null, isLoggedIn = false }) => (
    <BrowserRouter>
        <ConfigProvider routes={routes} config={baseConfig}>
            <AuthContext.Provider value={{ currentUser, isLoggedIn }}>
                <ResponsiveProvider>
                    <ModalProvider>
                        <IconProvider library={regularIcons}>
                            <IntlProvider locale="en">
                                {children}
                            </IntlProvider>
                        </IconProvider>
                    </ModalProvider>
                </ResponsiveProvider>
            </AuthContext.Provider>
        </ConfigProvider>
    </BrowserRouter>
);

export const NavbarModalLoggedOut = () => (
    <div style={{ width: "400px", height: "600px" }}>
        <Providers isLoggedIn={false}>
            <NavbarModal />
        </Providers>
    </div>
);

export const NavbarModalLoggedIn = () => (
    <div style={{ width: "400px", height: "600px" }}>
        <Providers isLoggedIn={true} currentUser={loggedInUser}>
            <NavbarModal />
        </Providers>
    </div>
);
