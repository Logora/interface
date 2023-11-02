import React from 'react';
import toast, { Toaster, resolveValue, useToasterStore } from 'react-hot-toast';
import { ToastContext } from './ToastContext';
import { Toast } from '@logora/debate.dialog.toast';
import styles from './ToastProvider.module.scss';

export const ToastProvider = ({ children }) => {
    const { toasts } = useToasterStore();
    
    return (
        <ToastContext.Provider value={{ toast, toasts }}>
            <>
                { children }
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
            </>
        </ToastContext.Provider>
    );
};