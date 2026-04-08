import React from 'react';
import { Modal } from './Modal';
import { ModalProvider } from './ModalProvider';
import { IconProvider } from '@logora/debate/icons/icon_provider';
import { IntlProvider } from "react-intl";
import * as regularIcons from '@logora/debate/icons/regular_icons';

export default {
    title: 'Dialog/Modal',
    component: Modal,
    args: {
        title: null,
        showCloseButton: false,
        fullScreen: false,
        children: 'Are you sure you want to continue ?'
    },
    argTypes: {
        title: { control: 'text' },
        showCloseButton: { control: 'boolean' },
        fullScreen: { control: 'boolean' },
        children: { control: 'text' }
    },
    render: ({ children, ...args }) => (
        <div style={{ width: '150px', height: '80px' }}>
            <IconProvider library={regularIcons}>
                <IntlProvider locale="en">
                    <ModalProvider>
                        <Modal {...args}>
                            <div>{children}</div>
                        </Modal>
                    </ModalProvider>
                </IntlProvider>
            </IconProvider>
        </div>
    )
};

export const DefaultModal = {};

export const ModalWithCloseButton = {
    args: {
        title: 'Confirm your action',
        showCloseButton: true
    }
};

export const ModalFullScreen = {
    args: {
        title: 'Confirm your action',
        fullScreen: true,
        showCloseButton: true
    }
};
