import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { ConfigProvider } from "@logora/debate.data.config_provider";
import { AuthContext } from "@logora/debate.auth.use_auth";
import { ModalProvider } from "@logora/debate.dialog.modal";
import { ResponsiveProvider } from "@logora/debate.hooks.use_responsive";
import { IconProvider } from "@logora/debate.icons.icon_provider";
import * as regularIcons from "@logora/debate.icons.regular_icons";
import { Location } from "@logora/debate.util.location";

import { NavbarButton } from "./NavbarButton";

jest.mock("@logora/debate.hooks.use_auth_required", () => ({
    useAuthRequired: () => () => {},
}));

const routes = {
    indexLocation: new Location("espace-debat", {}),
    debateShowLocation: new Location("espace-debat/debat/:debateSlug", { debateSlug: "" }),
    rootLocation: new Location("/", {}),
};

const baseConfig = {
    isDrawer: false,
    modules: {
        consultation: true,
        suggestions: { active: true },
    },
    actions: { hideLoginButton: false },
};

const Providers = ({ children }) => (
    <BrowserRouter>
        <ConfigProvider routes={routes} config={baseConfig}>
            <AuthContext.Provider value={{ currentUser: null, isLoggedIn: false }}>
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

const renderNavbarButton = (props = {}) => {
    return render(
        <Providers>
            <NavbarButton {...props} />
        </Providers>
    );
};

describe("NavbarButton", () => {
    it("renders inside drawer when inDrawer = true", () => {
        const { container } = renderNavbarButton({ inDrawer: true });

        const btn = container.querySelector('[data-tid="action_view_mobile_navigation"]');
        expect(btn).not.toBeNull();
    });

    it("returns null if inDrawer=true and showInDrawer=false", () => {
        const { container } = renderNavbarButton({ inDrawer: true, showInDrawer: false });

        const btn = container.querySelector('[data-tid="action_view_mobile_navigation"]');
        expect(btn).toBeNull();
    });
});
