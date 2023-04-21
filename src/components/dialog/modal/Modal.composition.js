import React from 'react';
import { Modal } from './Modal';
import { ModalProvider } from './ModalProvider';

export const DefaultModal = () => {
    return (
        <ModalProvider>
            <Modal>
                <div>Are you sure you want to continue ?</div>
            </Modal>
        </ModalProvider>
    );
};

export const ModalWithTitle = () => {
    return (
        <ModalProvider>
            <Modal title="Confirm your action">
                <div>Are you sure you want to continue ?</div>
            </Modal>
        </ModalProvider>
    );
};

export const ModalWithCloseButton = () => {
    return (
        <ModalProvider>
            <Modal title="Confirm your action" showCloseButton>
                <div>Are you sure you want to continue ?</div>
            </Modal>
        </ModalProvider>
    );
};

export const ModalFullScreen = () => {
    return (
        <ModalProvider>
            <Modal title="Confirm your action" fullScreen showCloseButton>
                <div>Are you sure you want to continue ?</div>
            </Modal>
        </ModalProvider>
    );
};