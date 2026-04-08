import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { BackLink } from './BackLink';
import { IconProvider } from '@logora/debate/icons/icon_provider';
import * as regularIcons from '@logora/debate/icons/regular_icons';

export default {
    title: 'Action/Back Link',
    args: {
        to: '#',
        text: 'Back to article',
        external: true
    },
    argTypes: {
        to: {
            control: 'text'
        },
        text: {
            control: 'text'
        },
        external: {
            control: 'boolean'
        }
    },
    decorators: [
        (Story) => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        )
    ],
    render: (args) => (
        <IconProvider library={regularIcons}>
            <BackLink {...args} />
        </IconProvider>
    )
};

export const DefaultBackLink = {};
