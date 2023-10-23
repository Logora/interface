import React from 'react';
import { Modal } from './Modal';
import { ModalProvider } from './ModalProvider';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';

export const DefaultModal = () => {
    return (
        <div style={{width: "150px", height: "80px"}}>
            <IconProvider library={regularIcons}>
                <ModalProvider>
                    <Modal>
                        <div>Are you sure you want to continue ?</div>
                    </Modal>
                </ModalProvider>
            </IconProvider>
        </div>
    );
};

export const ModalWithTitle = () => {
    return (
        <div style={{width: "150px", height: "80px"}}>
            <IconProvider library={regularIcons}>
                <ModalProvider>
                    <Modal title="Confirm your action">
                        <div>Are you sure you want to continue ?</div>
                    </Modal>
                </ModalProvider>
            </IconProvider>
        </div>
    );
};

export const ModalWithCloseButton = () => {
    return (
        <div style={{width: "150px", height: "80px"}}>
            <IconProvider library={regularIcons}>
                <ModalProvider>
                    <Modal title="Confirm your action" showCloseButton>
                        <div>Are you sure you want to continue ?</div>
                    </Modal>
                </ModalProvider>
            </IconProvider>
        </div>
    );
};

export const ModalFullScreen = () => {
    return (
        <div style={{width: "150px", height: "80px"}}>
            <IconProvider library={regularIcons}>
                <ModalProvider>
                    <Modal title="Confirm your action" fullScreen showCloseButton>
                        <div>Are you sure you want to continue ?</div>
                    </Modal>
                </ModalProvider>
            </IconProvider>
        </div>
    );
};