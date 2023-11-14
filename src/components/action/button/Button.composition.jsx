import React from 'react';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';
import { Icon } from '@logora/debate.icons.icon';
import { Button } from './Button';
import { MemoryRouter } from "react-router";

export const ActiveButton = () => {
    return <Button active handleClick={() => null}>Active</Button>;
};

export const InactiveButton = () => {
    return <Button active={false} handleClick={null}>Inactive</Button>;
};

export const ButtonWithLeftIcon = () => {
    return <IconProvider library={regularIcons}><Button leftIcon={<Icon name="home" />} handleClick={null}>Home</Button></IconProvider>;
};

export const ButtonWithRightIcon = () => {
    return <IconProvider library={regularIcons}><Button rightIcon={<Icon name="send" />} handleClick={null}>Home</Button></IconProvider>;
};

export const ButtonWithIconOnly = () => {
    return <IconProvider library={regularIcons}><Button leftIcon={<Icon name="home" />} handleClick={null} /></IconProvider>;
};

export const ButtonWithSuccessAccent = () => {
    return <Button accent="success" handleClick={null}>Success</Button>;
};

export const ButtonWithDangerAccent = () => {
    return <Button accent="danger" handleClick={null}>Danger</Button>;
};

export const ButtonDisabledWithoutBorder = () => {
    return <Button border={false} disabled>Disabled</Button>;
};

export const ButtonWithoutBorder = () => {
    return <Button border={false} handleClick={null} active>No border</Button>;
};

export const ButtonWithLink = () => {
    return (
        <MemoryRouter>
            <Button to="/page">Link button</Button>
        </MemoryRouter>
    );
};

export const ButtonWithLinkAndIcon = () => {
    return (
        <IconProvider library={regularIcons}>
            <MemoryRouter>
                <Button rightIcon={<Icon name="send" />} to="/page">Link button</Button>
            </MemoryRouter>
        </IconProvider>
    );
};