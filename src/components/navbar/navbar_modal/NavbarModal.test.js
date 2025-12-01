import React from "react";
import { render, screen } from "@testing-library/react";
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
jest.mock("@logora/debate.hooks.use_auth_required", () => ({
    useAuthRequired: () => () => { },
}));
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

const loggedInUser = {
    id: faker.datatype.number(),
    full_name: faker.name.fullName(),
    image_url: faker.image.avatar(),
    hash_id: faker.lorem.slug(),
};

const Providers = ({ children, config = baseConfig, currentUser = null, isLoggedIn = false }) => (
    <BrowserRouter>
        <ConfigProvider routes={routes} config={config}>
            <AuthContext.Provider value={{ currentUser, isLoggedIn }}>
                <ResponsiveProvider>
                    <ModalProvider>
                        <IconProvider library={regularIcons}>
                            <IntlProvider locale="en">{children}</IntlProvider>
                        </IconProvider>
                    </ModalProvider>
                </ResponsiveProvider>
            </AuthContext.Provider>
        </ConfigProvider>
    </BrowserRouter>
);

const renderNavbarModal = (options = {}) => {
    const { config = baseConfig, isLoggedIn = false, currentUser = null } = options;
    return render(
        <Providers config={config} isLoggedIn={isLoggedIn} currentUser={currentUser}>
            <NavbarModal />
        </Providers>
    );
};

describe("NavbarModal", () => {
    it("displays the menu with 'Debates', 'Consultations', 'Suggestions' and 'Sign in' when user is logged out", () => {
        renderNavbarModal({ isLoggedIn: false });
        expect(screen.getByText("Navigation")).toBeInTheDocument();
        expect(screen.getByText("Debates")).toBeInTheDocument();
        expect(screen.getByText("Consultations")).toBeInTheDocument();
        expect(screen.getByText("Suggestions")).toBeInTheDocument();
        expect(screen.getByText("Sign in")).toBeInTheDocument();
    });

    it("does not display 'Consultations' when the consultation module is disabled", () => {
        const configWithoutConsultations = {
            ...baseConfig,
            modules: {
                ...baseConfig.modules,
                consultation: false,
            },
        };

        renderNavbarModal({ config: configWithoutConsultations, isLoggedIn: false });
        expect(screen.queryByText("Consultations")).not.toBeInTheDocument();
        expect(screen.getByText("Debates")).toBeInTheDocument();
    });

    it("does not display 'Suggestions' when suggestions.active === false", () => {
        const configWithoutSuggestions = {
            ...baseConfig,
            modules: {
                ...baseConfig.modules,
                suggestions: { active: false },
            },
        };

        renderNavbarModal({ config: configWithoutSuggestions, isLoggedIn: false });
        expect(screen.queryByText("Suggestions")).not.toBeInTheDocument();
        expect(screen.getByText("Debates")).toBeInTheDocument();
    });

    it("does not display 'Sign in' when hideLoginButton === true", () => {
        const configWithoutLoginButton = {
            ...baseConfig,
            actions: {
                ...baseConfig.actions,
                hideLoginButton: true,
            },
        };

        renderNavbarModal({ config: configWithoutLoginButton, isLoggedIn: false });
        expect(screen.queryByText("Sign in")).not.toBeInTheDocument();
    });
});
