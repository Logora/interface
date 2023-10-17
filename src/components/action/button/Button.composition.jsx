import React from 'react';
import { Home, Send } from '@logora/debate.icons.regular_icons';
import { Button } from './Button';

export const ActiveButton = () => {
    return <Button active handleClick={() => null}>Active</Button>;
};

export const InactiveButton = () => {
    return <Button active={false} handleClick={null}>Inactive</Button>;
};

export const ButtonWithLeftIcon = () => {
    return <Button leftIcon={<Home />} handleClick={null}>Home</Button>;
};

export const ButtonWithRightIcon = () => {
    return <Button rightIcon={<Send />} handleClick={null}>Home</Button>;
};

export const ButtonWithIconOnly = () => {
    return <Button leftIcon={<Home />} handleClick={null} />;
};

export const ButtonWithSuccessAccent = () => {
    return <Button accent="success" handleClick={null}>Success</Button>;
};

export const ButtonWithDangerAccent = () => {
    return <Button accent="danger" handleClick={null}>Danger</Button>;
};

export const ButtonWithoutBorder = () => {
    return <Button border={false} handleClick={null} active>No border</Button>;
};
