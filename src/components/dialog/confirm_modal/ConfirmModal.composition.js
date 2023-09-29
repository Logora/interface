import React from 'react';
import { ConfirmModal } from './ConfirmModal';
import { ModalProvider } from '@logora/debate.dialog.modal';

export const DefaultConfirmModal = () => {
    return (
        <ModalProvider>
            <ConfirmModal 
                title="Modal Title"
                question="Are you sure you want to start this debate ?"
                confirmLabel="Yes"
                cancelLabel="No"
            />
        </ModalProvider>
    );
};