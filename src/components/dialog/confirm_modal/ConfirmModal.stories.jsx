import React from 'react';
import { ConfirmModal } from './ConfirmModal';
import { ModalProvider } from '@logora/debate/dialog/modal';
import { IconProvider } from '@logora/debate/icons/icon_provider';
import { IntlProvider } from "react-intl";
import * as regularIcons from '@logora/debate/icons/regular_icons';

export default {
    title: 'Dialog/Confirm Modal',
    component: ConfirmModal,
    args: {
        title: 'Modal Title',
        question: 'Are you sure you want to start this debate ?',
        confirmLabel: 'Yes',
        cancelLabel: 'No'
    },
    argTypes: {
        title: { control: 'text' },
        question: { control: 'text' },
        confirmLabel: { control: 'text' },
        cancelLabel: { control: 'text' }
    },
    render: (args) => (
        <div style={{ width: '350px', height: '100px' }}>
            <IconProvider library={regularIcons}>
                <IntlProvider locale="en">
                    <ModalProvider>
                        <ConfirmModal {...args} />
                    </ModalProvider>
                </IntlProvider>
            </IconProvider>
        </div>
    )
};

export const DefaultConfirmModal = {};
