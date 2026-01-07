import React from 'react';
import { IntlProvider } from "react-intl";
import { Toast } from './Toast';

export const DefaultToast = () => {
    return (
        <IntlProvider locale="en">
            <Toast
                text={"A message !"}
            />
        </IntlProvider>
    );
};

export const ToastSuccess = () => {
    return (
        <IntlProvider locale="en">
            <Toast
                text={"A message !"}
                variant={"success"}
            />
        </IntlProvider>
    );
};

export const ToastError = () => {
    return (
        <IntlProvider locale="en">
            <Toast
                text={"A message !"}
                variant={"error"}
            />
        </IntlProvider>
    );
};

export const ToastWithPoints = () => {
    return (
        <IntlProvider locale="en">
            <Toast
                text={"A message !"}
                points={34}
                variant={"info"}
            />
        </IntlProvider>
    );
};