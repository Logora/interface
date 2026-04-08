import React from 'react';
import { IntlProvider } from "react-intl";
import { Toast } from './Toast';

export default {
    title: 'Dialog/Toast',
    component: Toast,
    args: {
        text: 'A message !',
        variant: 'info',
        points: null
    },
    argTypes: {
        text: {
            control: 'text'
        },
        variant: {
            control: 'select',
            options: ['info', 'success', 'error']
        },
        points: {
            control: 'number'
        }
    },
    render: (args) => (
        <IntlProvider locale="en">
            <Toast {...args} />
        </IntlProvider>
    )
};

export const DefaultToast = {};

export const ToastSuccess = {
    args: {
        variant: 'success'
    }
};

export const ToastError = {
    args: {
        variant: 'error'
    }
};

export const ToastWithPoints = {
    args: {
        points: 34
    }
};
