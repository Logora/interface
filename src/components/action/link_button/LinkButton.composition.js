import React from 'react';
import { MemoryRouter } from "react-router";
import { LinkButton } from './LinkButton';

export const DefaultLinkButton = () => {
    return (
        <MemoryRouter>
            <LinkButton to="/page">Default</LinkButton>
        </MemoryRouter>
    );
};

export const SuccessLinkButton = () => {
    return (
        <MemoryRouter>
            <LinkButton to="/page" accent="success">Success link button</LinkButton>
        </MemoryRouter>
    );
};