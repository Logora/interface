import React from 'react';
import { ConfirmModal } from './ConfirmModal';
import { ModalProvider } from '@logora/debate.dialog.modal';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';

export const DefaultConfirmModal = () => {
    return (
        <div style={{width: "350px", height: "100px"}}>
            <IconProvider library={regularIcons}>
                <ModalProvider>
                    <ConfirmModal 
                        title="Modal Title"
                        question="Are you sure you want to start this debate ?"
                        confirmLabel="Yes"
                        cancelLabel="No"
                    />
                </ModalProvider>
            </IconProvider>
        </div>
    );
};