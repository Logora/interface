import React from 'react';
import { MemoryRouter } from "react-router";
import { Link } from './Link';

export const DefaultLinkButton = () => {
    return (
        <MemoryRouter>
            <Link to="/page">Default</Link>
        </MemoryRouter>
    );
};

export const ExternalLinkButton = () => {
    return (
        <Link to="/page" external>External</Link>
    );
};