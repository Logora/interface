import React from "react";
import { render, screen } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import { BrowserRouter } from "react-router-dom";
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

const config = {
    isDrawer: false,
    modules: {
        consultation: true,
        suggestions: { active: true },
    },
    actions: {
        hideLoginButton: false,
    },
};

const loggedInUser = {
    id: faker.datatype.number(),
    full_name: faker.name.fullName(),
    image_url: faker.image.avatar(),
    hash_id: faker.lorem.slug(),
};

const ProvidersLoggedOut = ({ children, customConfig = config }) => (
    <BrowserRouter>
        <IntlProvider locale="en">
            <ConfigProvider config={customConfig} routes={routes}>
                <AuthContext.Provider value={{ currentUser: null, isLoggedIn: false }}>
                    <ResponsiveProvider>
                        <IconProvider library={regularIcons}>
                            <ModalProvider>
                                {children}
                            </ModalProvider>
                        </IconProvider>
                    </ResponsiveProvider>
                </AuthContext.Provider>
            </ConfigProvider>
        </IntlProvider>
    </BrowserRouter>
);

const ProvidersLoggedIn = ({ children }) => (
    <BrowserRouter>
        <IntlProvider locale="en">
            <ConfigProvider config={config} routes={routes}>
                <AuthContext.Provider value={{ currentUser: loggedInUser, isLoggedIn: true }}>
                    <ResponsiveProvider>
                        <IconProvider library={regularIcons}>
                            <ModalProvider>
                                {children}
                            </ModalProvider>
                        </IconProvider>
                    </ResponsiveProvider>
                </AuthContext.Provider>
            </ConfigProvider>
        </IntlProvider>
    </BrowserRouter>
);

const renderNavbarModalLoggedOut = (customConfig) =>
    render(
        <ProvidersLoggedOut customConfig={customConfig}>
            <NavbarModal />
        </ProvidersLoggedOut>
    );

const renderNavbarModalLoggedIn = () =>
    render(
        <ProvidersLoggedIn>
            <NavbarModal />
        </ProvidersLoggedIn>
    );

describe("NavbarModal", () => {
    it("displays the menu with 'Debates', 'Consultations', 'Suggestions' and 'Sign in' when user is logged out", () => {
        renderNavbarModalLoggedOut();
        expect(screen.getByText("Navigation")).toBeInTheDocument();
        expect(screen.getByText("Debates")).toBeInTheDocument();
        expect(screen.getByText("Consultations")).toBeInTheDocument();
        expect(screen.getByText("Suggestions")).toBeInTheDocument();
        expect(screen.getByText("Sign in")).toBeInTheDocument();
    });

    it("displays 'Profile' and not 'Sign in' when user is logged in", () => {
        renderNavbarModalLoggedIn();
        expect(screen.getByText("Profile")).toBeInTheDocument();
        expect(screen.queryByText("Sign in")).not.toBeInTheDocument();
    });

    it("does not display 'Consultations' when the consultation module is disabled", () => {
        const configWithoutConsultations = {
            ...config,
            modules: {
                ...config.modules,
                consultation: false,
            },
        };

        renderNavbarModalLoggedOut(configWithoutConsultations);
        expect(screen.queryByText("Consultations")).not.toBeInTheDocument();
        expect(screen.getByText("Debates")).toBeInTheDocument();
    });

    it("does not display 'Suggestions' when suggestions.active === false", () => {
        const configWithoutSuggestions = {
            ...config,
            modules: {
                ...config.modules,
                suggestions: { active: false },
            },
        };

        renderNavbarModalLoggedOut(configWithoutSuggestions);
        expect(screen.queryByText("Suggestions")).not.toBeInTheDocument();
        expect(screen.getByText("Debates")).toBeInTheDocument();
    });

    it("does not display 'Sign in' when hideLoginButton === true", () => {
        const configWithoutLoginButton = {
            ...config,
            actions: {
                ...config.actions,
                hideLoginButton: true,
            },
        };

        renderNavbarModalLoggedOut(configWithoutLoginButton);
        expect(screen.queryByText("Sign in")).not.toBeInTheDocument();
    });
});