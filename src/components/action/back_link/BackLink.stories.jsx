import React from 'react';
import { BackLink } from './BackLink';
import { IconProvider } from '@logora/debate/icons/icon_provider';
import * as regularIcons from '@logora/debate/icons/regular_icons';

export default {
    title: 'Action/Back Link',
    component: BackLink,
    args: {
        to: '#',
        text: 'Back to article'
    },
    argTypes: {
        to: {
            control: 'text'
        },
        text: {
            control: 'text'
        }
    },
    render: (args) => (
        <IconProvider library={regularIcons}>
            <BackLink {...args} />
        </IconProvider>
    )
};

export const DefaultBackLink = {};
