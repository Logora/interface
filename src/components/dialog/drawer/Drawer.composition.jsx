import React, { useState } from 'react';
import { Drawer } from './Drawer';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';

export const DefaultDrawer = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState);
    };

    return (
        <IconProvider library={regularIcons}>
            <div onClick={toggleDrawer} data-testid="open-button">Click here to toggle drawer</div>

            <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <div>Drawer content</div>
            </Drawer>
        </IconProvider>
    )
};

export const DrawerWithOverlay = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState);
    };

    return (
        <IconProvider library={regularIcons}>
            <div onClick={toggleDrawer}>Click here to toggle drawer</div>

            <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} enableOverlay>
                <div>Drawer content</div>
            </Drawer>
        </IconProvider>
    )
};

export const DrawerWithTitle = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState);
    };

    return (
        <IconProvider library={regularIcons}>
            <div onClick={toggleDrawer}>Click here to toggle drawer</div>

            <Drawer isOpen={isOpen} title={"My drawer"} onClose={() => setIsOpen(false)}>
                <div>Drawer content</div>
            </Drawer>
        </IconProvider>
    )
};

export const SmallDrawer = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState);
    };

    return (
        <IconProvider library={regularIcons}>
            <div onClick={toggleDrawer}>Click here to toggle drawer</div>

            <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} size={400}>
                <div>Drawer content</div>
            </Drawer>
        </IconProvider>
    )
};