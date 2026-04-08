import React from 'react';
import { MemoryRouter } from "react-router-dom";
import { IconTextLink } from './IconTextLink';
import HomeIcon from './HomeIcon.dev'

export default {
    title: 'Action/Icon Text Link',
    component: IconTextLink,
    args: {
        to: '/page',
        icon: HomeIcon,
        text: 'Home',
        active: false,
        pin: false,
        pinText: '23'
    },
    argTypes: {
        to: {
            control: 'text'
        },
        text: {
            control: 'text'
        },
        active: {
            control: 'boolean'
        },
        pin: {
            control: 'boolean'
        },
        pinText: {
            control: 'text'
        },
        icon: {
            control: false
        }
    },
    render: (args) => (
        <MemoryRouter>
            <IconTextLink {...args} />
        </MemoryRouter>
    )
};

export const DefaultIconTextLink = {};
