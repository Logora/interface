import React, { useState } from 'react';
import { Drawer } from './Drawer';
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "@logora/debate.data.config_provider";
import { AuthContext } from "@logora/debate.auth.use_auth";
import { ResponsiveProvider } from "@logora/debate.hooks.use_responsive";
import { IconProvider } from '@logora/debate.icons.icon_provider';
import { ModalProvider } from "@logora/debate.dialog.modal";
import { IntlProvider } from "react-intl";
import { ListProvider } from '@logora/debate.list.list_provider';
import { dataProvider, DataProviderContext } from '@logora/debate.data.data_provider';
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

const createNotification = () => {
    return {
        id: faker.datatype.number(10000000),
        created_at: faker.date.recent(),
        notify_type: "new_comment",
        is_opened: faker.datatype.boolean()
    };
};

const notificationDefinitions = {
    new_comment: {
        getRedirectUrl: () => '/comments/1',
        getImage: () => <img src={faker.image.abstract()} alt="notification-image" />,
        getContent: (notification) => faker.commerce.productDescription()
    },
}

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

const httpClient = {
    post: () => {
        return new Promise(function (resolve) {
            resolve({ data: { success: true, data: {} } });
        });
    },
    get: () => {
        return new Promise(function (resolve) {
            resolve({ data: { success: true, data: Array.from({ length: 5 }, createNotification) } });
        });
    }
};

const data = dataProvider(httpClient, "https://mock.example.api");

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
                <DataProviderContext.Provider value={{ dataProvider: data }}>
                    <ListProvider>
                        <AuthContext.Provider value={{ currentUser: mockUser, isLoggedIn: true }}>
                            <ResponsiveProvider>
                                <IconProvider library={regularIcons}>
                                    <IntlProvider locale="en">
                                        <ModalProvider>
                                            <div onClick={toggleDrawer} data-testid="open-button">Click here to toggle drawer</div>
                                            <div onClick={closeDrawer} data-testid="close-button">Click here to close drawer</div>
                                            <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} notificationDefinitions={notificationDefinitions}>
                                                <div>Drawer content</div>
                                            </Drawer>
                                        </ModalProvider>
                                    </IntlProvider>
                                </IconProvider>
                            </ResponsiveProvider>
                        </AuthContext.Provider>
                    </ListProvider>
                </DataProviderContext.Provider>
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
                <DataProviderContext.Provider value={{ dataProvider: data }}>
                    <ListProvider>
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
                    </ListProvider>
                </DataProviderContext.Provider>
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
                <DataProviderContext.Provider value={{ dataProvider: data }}>
                    <ListProvider>
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
                    </ListProvider>
                </DataProviderContext.Provider>
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
                <DataProviderContext.Provider value={{ dataProvider: data }}>
                    <ListProvider>
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
                    </ListProvider>
                </DataProviderContext.Provider>
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

                <DataProviderContext.Provider value={{ dataProvider: data }}>
                    <ListProvider>
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
                    </ListProvider>
                </DataProviderContext.Provider>
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
                <DataProviderContext.Provider value={{ dataProvider: data }}>
                    <ListProvider>
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
                    </ListProvider>
                </DataProviderContext.Provider>
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
            showProfileNotificationInDrawer: false
        }
    }

    return (
        <BrowserRouter>

            <ConfigProvider routes={routes} config={configHideIcon}>
                <DataProviderContext.Provider value={{ dataProvider: data }}>
                    <ListProvider>
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
                    </ListProvider>
                </DataProviderContext.Provider>
            </ConfigProvider>
        </BrowserRouter>
    )
};