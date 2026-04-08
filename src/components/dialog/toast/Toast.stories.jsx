import React from 'react';
import { IntlProvider } from "react-intl";
import { Toast } from './Toast';

const meta = {
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

export default meta;

const renderStory = (overrides = {}) => meta.render({ ...meta.args, ...overrides });

export const DefaultToast = (props) => renderStory(props);

export const ToastSuccess = (props) => renderStory({ variant: 'success', ...props });

export const ToastError = (props) => renderStory({ variant: 'error', ...props });

export const ToastWithPoints = (props) => renderStory({ points: 34, ...props });
