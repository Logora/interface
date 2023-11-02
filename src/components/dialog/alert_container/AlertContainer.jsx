import React from 'react';
import { toast, Toaster, resolveValue } from 'react-hot-toast';
import { Toast } from '@logora/debate.dialog.toast';
import styles from './AlertContainer.module.scss';

export const AlertContainer = () => {
    return (
        <Toaster
            position="bottom-center"
            containerClassName={styles.toaster}
            toastOptions={{
                duration: 4000
            }}
        >
            {(t) => {
                return(
                    <Toast 
                        text={resolveValue(t.message, t)} 
                        points={t.points} 
                        variant={t.type} 
                        handleClose={() => toast.remove(t.id)}
                    />
                )
            }}
        </Toaster>
    );
}