import React from 'react';
import { InformationBox } from './InformationBox';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from "react-router-dom";
import { Suggestion } from '@logora/debate/icons/regular_icons';
import { IconProvider } from '@logora/debate/icons/icon_provider';
import * as regularIcons from '@logora/debate/icons/regular_icons';

export default {
    title: 'Information/Information Box',
    component: InformationBox,
    args: {
        title: 'Suggestion',
        points: 100,
        description: 'Propose debate questions and support user suggestions that you find relevant.',
        textLink: 'View suggestions',
        link: 'https://example.fr/test/',
        isActive: true,
        withIcon: true
    },
    argTypes: {
        title: { control: 'text' },
        points: { control: 'number' },
        description: { control: 'text' },
        textLink: { control: 'text' },
        link: { control: 'text' },
        isActive: { control: 'boolean' },
        withIcon: { control: 'boolean' }
    },
    render: ({ withIcon, ...args }) => (
        <MemoryRouter>
            <IntlProvider locale="en">
                <IconProvider library={regularIcons}>
                    <InformationBox
                        {...args}
                        icon={withIcon ? <Suggestion /> : null}
                    />
                </IconProvider>
            </IntlProvider>
        </MemoryRouter>
    )
};

export const DefaultInformationBox = {};

export const DefaultInformationBoxWithDisabledModule = {
    args: {
        isActive: false
    }
};
