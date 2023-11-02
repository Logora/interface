import React from 'react';
import { Toast } from './Toast';

export const DefaultToast = () => {
    return (
        <Toast 
            text={"A message !"}
        />
    );
};

export const ToastSuccess = () => {
    return (
        <Toast 
            text={"A message !"}
            variant={"success"}
        />
    );
};

export const ToastError = () => {
    return (
        <Toast 
            text={"A message !"}
            variant={"error"}
        />
    );
};

export const ToastWithPoints = () => {
    return (
        <Toast 
            text={"A message !"}
            points={34}
            variant={"info"}
        />
    );
};