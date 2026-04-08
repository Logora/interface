import React from 'react';
import { Dropdown } from './Dropdown';

export default {
    title: 'Dialog/Dropdown',
    component: Dropdown,
    args: {
        disabled: false,
        horizontalPosition: 'left',
        triggerText: 'Left'
    },
    argTypes: {
        disabled: { control: 'boolean' },
        horizontalPosition: { control: 'select', options: ['left', 'center', 'right'] },
        triggerText: { control: 'text' }
    },
    render: ({ triggerText, ...args }) => (
        <Dropdown {...args}>
            <div style={{ padding: '5px 15px', border: '1px solid black', borderRadius: '6px' }}>{triggerText}</div>
            <div>
                <p>Child 1</p>
                <p>Child 2</p>
            </div>
        </Dropdown>
    )
};

export const DefaultDropdown = {};

export const DisabledDropdown = {
    args: {
        disabled: true,
        triggerText: 'Disabled'
    }
};

export const RightDropdown = {
    args: {
        horizontalPosition: 'right',
        triggerText: 'Right'
    }
};
