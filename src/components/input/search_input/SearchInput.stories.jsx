import React from 'react';
import { IntlProvider } from 'react-intl';
import { SearchInput } from './SearchInput';
import { IconProvider } from '@logora/debate/icons/icon_provider';
import * as regularIcons from '@logora/debate/icons/regular_icons';

const noop = () => {};

export default {
    title: 'Input/Search Input',
    component: SearchInput,
    args: {
        onSearchSubmit: noop,
        placeholder: 'Search',
        reducedByDefault: false,
        disabled: false
    },
    argTypes: {
        onSearchSubmit: { control: false },
        placeholder: { control: 'text' },
        reducedByDefault: { control: 'boolean' },
        disabled: { control: 'boolean' }
    },
    render: (args) => (
        <IntlProvider locale="en">
            <IconProvider library={regularIcons}>
                <SearchInput {...args} />
            </IconProvider>
        </IntlProvider>
    )
};

export const DefaultSearchInput = {};

export const ReducedByDefaultSearchInput = {
    args: {
        reducedByDefault: true
    }
};

export const DisabledSearchInput = {
    args: {
        disabled: true
    }
};
