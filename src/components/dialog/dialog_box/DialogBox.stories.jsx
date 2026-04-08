import React from 'react';
import { IntlProvider } from 'react-intl';
import { DialogBox } from './DialogBox';

const meta = {
    title: 'Dialog/Dialog Box',
    component: DialogBox,
    args: {
        title: 'Debates',
        content: 'Participate by writing your argument and earn eloquence points',
        isHidden: false,
        children: 'React child'
    },
    argTypes: {
        title: {
            control: 'text'
        },
        content: {
            control: 'text'
        },
        isHidden: {
            control: 'boolean'
        },
        children: {
            control: 'text'
        }
    },
    render: ({ children, ...args }) => (
        <div style={{ width: '400px', height: '200px' }}>
            <IntlProvider locale='en'>
                <DialogBox {...args}>
                    <span>{children}</span>
                </DialogBox>
            </IntlProvider>
        </div>
    )
};

export default meta;

const renderStory = (overrides = {}) => meta.render({ ...meta.args, ...overrides });

export const DefaultDialogBox = (props) => renderStory(props);

export const HiddenDialogBox = (props) => renderStory({ isHidden: true, ...props });
