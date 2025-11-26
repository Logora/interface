import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
import { NavbarButton } from "./NavbarButton";

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

const Providers = ({ children }) => (
    <BrowserRouter>
    <IntlProvider locale="en">
        <ConfigProvider config={{ config }} routes={routes}>
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

const renderNavbarButton = (props = {}) =>
    render(
        <Providers>
            <NavbarButton {...props} />
        </Providers>
    );

describe("NavbarButton", () => {
    it("displays the button in the drawer (inDrawer = true)", () => {
        const { container } = renderNavbarButton({ inDrawer: true });
        const btn = container.querySelector('[data-tid="action_view_mobile_navigation"]');
        expect(btn).not.toBeNull();
        expect(btn).toBeInTheDocument();
        expect(btn.className).toMatch(/mobileIconDrawer/);
    });

    it("opens the NavbarModal when clicking the button", async () => {
        const { container } = renderNavbarButton({ inDrawer: true });
        const btn = container.querySelector('[data-tid="action_view_mobile_navigation"]');
        expect(btn).not.toBeNull();

        await userEvent.click(btn);

        expect(await screen.findByText("Navigation")).toBeInTheDocument();
    });
});