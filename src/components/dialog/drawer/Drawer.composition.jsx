import React, { useState } from 'react';
import { Drawer } from './Drawer';
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "@logora/debate.data.config_provider";
import { AuthContext } from "@logora/debate.auth.use_auth";
import { ResponsiveProvider } from "@logora/debate.hooks.use_responsive";
import { IconProvider } from '@logora/debate.icons.icon_provider';
import { ModalProvider } from "@logora/debate.dialog.modal";
import { IntlProvider } from "react-intl";
import * as regularIcons from '@logora/debate.icons.regular_icons';
import { Location } from "@logora/debate.util.location";
import { faker } from '@faker-js/faker';


const mockUser = {
    id: faker.datatype.number(),
    full_name: faker.name.fullName(),
    image_url: faker.image.avatar(),
    hash_id: faker.lorem.slug(),
}
const config = {
    isDrawer: true,
    modules: {
        consultation: true,
        suggestions: { active: true },
    },
    actions: {
        hideLoginButton: false,
    },
    layout: {
        showNavbarButtonInDrawer: true
    }

};

const routes = {
    indexLocation: new Location("espace-debat", {}),
    debateShowLocation: new Location("espace-debat/debat/:debateSlug", { debateSlug: "" }),
    rootLocation: new Location("/", {}),
    consultationIndexLocation: new Location("espace-debat/consultations", {}),
    consultationShowLocation: new Location("espace-debat/consultations/:consultationSlug", { consultationSlug: "" }),
    suggestionLocation: new Location("espace-debat/suggestions", {}),
    userShowLocation: new Location("espace-debat/user/:userSlug", { userSlug: "" }),
    userEditLocation: new Location("espace-debat/user/:userSlug/edit", { userSlug: "" }),
};
export const DefaultDrawer = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState);
    };

    const closeDrawer = () => {
        const event = new CustomEvent("logora:drawer:close");
        window.dispatchEvent(event);
    }


    return (
        <BrowserRouter>
                <ConfigProvider routes={routes} config={config}>
                    <AuthContext.Provider value={{ currentUser: mockUser, isLoggedIn: true }}>
                        <ResponsiveProvider>
                            <IconProvider library={regularIcons}>
                            <IntlProvider locale="en">
                                <ModalProvider>
                                    <div onClick={toggleDrawer} data-testid="open-button">Click here to toggle drawer</div>
                                    <div onClick={closeDrawer} data-testid="close-button">Click here to close drawer</div>
                                    <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
                                        <div>Drawer content</div>
                                    </Drawer>
                                </ModalProvider>
                                </IntlProvider>
                            </IconProvider>
                        </ResponsiveProvider>
                    </AuthContext.Provider>
                </ConfigProvider>
        </BrowserRouter>
    )
};

export const DrawerWithOverlay = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState);
    };

    const closeDrawer = () => {
        const event = new CustomEvent("logora:drawer:close");
        window.dispatchEvent(event);
    }

    return (
        <BrowserRouter>
                <ConfigProvider routes={routes} config={config}>
                    <AuthContext.Provider value={{ currentUser: mockUser, isLoggedIn: true }}>
                        <ResponsiveProvider>
                            <IconProvider library={regularIcons}>
                            <IntlProvider locale="en">
                                <ModalProvider>
                                    <div onClick={toggleDrawer}>Click here to toggle drawer</div>
                                    <div onClick={closeDrawer} data-testid="close-button">Click here to close drawer</div>
                                    <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} enableOverlay>
                                        <div>Drawer content</div>
                                    </Drawer>
                                </ModalProvider>
                                </IntlProvider>
                            </IconProvider>
                        </ResponsiveProvider>
                    </AuthContext.Provider>
                </ConfigProvider>
        </BrowserRouter>
    )
};

export const DrawerWithTitle = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState);
    };

    return (
        <BrowserRouter>
                <ConfigProvider routes={routes} config={config}>
                    <AuthContext.Provider value={{ currentUser: mockUser, isLoggedIn: true }}>
                        <ResponsiveProvider>
                            <IconProvider library={regularIcons}>
                            <IntlProvider locale="en">
                                <ModalProvider>
                                    <div onClick={toggleDrawer}>Click here to toggle drawer</div>
                                    <Drawer isOpen={isOpen} title={"My drawer"} onClose={() => setIsOpen(false)}>
                                        <div>Drawer content</div>
                                    </Drawer>
                                </ModalProvider>
                                </IntlProvider>
                            </IconProvider>
                        </ResponsiveProvider>
                    </AuthContext.Provider>
                </ConfigProvider>
        </BrowserRouter>
    )
};

export const SmallDrawer = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState);
    };

    return (
        <BrowserRouter>
                <ConfigProvider routes={routes} config={config}>
                    <AuthContext.Provider value={{ currentUser: mockUser, isLoggedIn: true }}>
                        <ResponsiveProvider>
                            <IconProvider library={regularIcons}>
                            <IntlProvider locale="en">
                                <ModalProvider>
                                    <div onClick={toggleDrawer}>Click here to toggle drawer</div>
                                    <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} size={400}>
                                        <div>Drawer content</div>
                                    </Drawer>
                                </ModalProvider>
                                </IntlProvider>
                            </IconProvider>
                        </ResponsiveProvider>
                    </AuthContext.Provider>
                </ConfigProvider>
        </BrowserRouter>
    )
};

export const DrawerWithScrollParagraphe = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState);
    };

    const generatedParagraph = faker.lorem.paragraphs(20, '\n');

    return (
        <BrowserRouter>
                <ConfigProvider routes={routes} config={config}>
                    <AuthContext.Provider value={{ currentUser: mockUser, isLoggedIn: true }}>
                        <ResponsiveProvider>
                            <IconProvider library={regularIcons}>
                            <IntlProvider locale="en">
                                <ModalProvider>
                                    <div onClick={toggleDrawer}>Click here to toggle drawer</div>
                                    <Drawer isOpen={isOpen} title={"My drawer"} onClose={() => setIsOpen(false)}>
                                        <div>
                                            <p>
                                                {generatedParagraph}
                                            </p>
                                        </div>
                                    </Drawer>
                                </ModalProvider>
                                </IntlProvider>
                            </IconProvider>
                        </ResponsiveProvider>
                    </AuthContext.Provider>
                </ConfigProvider>
        </BrowserRouter>
    )
};

export const DrawerWithPathParameter = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState);
    };

    return (
        <BrowserRouter>
                <ConfigProvider routes={routes} config={config}>
                    <AuthContext.Provider value={{ currentUser: mockUser, isLoggedIn: true }}>
                        <ResponsiveProvider>
                            <IconProvider library={regularIcons}>
                            <IntlProvider locale="en">
                                <ModalProvider>
                                    <div onClick={toggleDrawer}>Click here to toggle drawer</div>
                                    <Drawer isOpen={isOpen} pathParameter={"drawer_path"}>
                                        <div>Drawer content</div>
                                    </Drawer>
                                </ModalProvider>
                                </IntlProvider>
                            </IconProvider>
                        </ResponsiveProvider>
                    </AuthContext.Provider>
                </ConfigProvider>
        </BrowserRouter>
    )
};

export const DrawerWithoutNavbarButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState);
    };

    const closeDrawer = () => {
        const event = new CustomEvent("logora:drawer:close");
        window.dispatchEvent(event);
    }
    const configHideIcon = {
        layout: {
            showNavbarButtonInDrawer: false,
            showProfileInDrawer: false
        }
    }

    return (
        <BrowserRouter>

                <ConfigProvider routes={routes} config={configHideIcon}>
                    <AuthContext.Provider value={{ currentUser: mockUser, isLoggedIn: true }}>
                        <ResponsiveProvider>
                            <IconProvider library={regularIcons}>
                            <IntlProvider locale="en">
                                <ModalProvider>
                                    <div onClick={toggleDrawer} data-testid="open-button">Click here to toggle drawer</div>
                                    <div onClick={closeDrawer} data-testid="close-button">Click here to close drawer</div>

                                    <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
                                        <div>Drawer content</div>
                                    </Drawer>
                                </ModalProvider>
                                </IntlProvider>
                            </IconProvider>
                        </ResponsiveProvider>
                    </AuthContext.Provider>
                </ConfigProvider>
        </BrowserRouter>
    )
};