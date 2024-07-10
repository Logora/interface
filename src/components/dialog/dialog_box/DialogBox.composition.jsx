import React from 'react';
import { IntlProvider } from 'react-intl';
import { DialogBox } from './DialogBox';

export const DefaultDialogBox = () => {
    return (
        <div style={{ width: "400px", height: "200px"}}>
            <IntlProvider locale='en'>
                <DialogBox 
                    title="Debates"
                    content="Participate by writing your argument and earn eloquence points"
                >
                    <span>React child</span>
                </DialogBox>
            </IntlProvider>
        </div>
    )
};

export const HiddenDialogBox = () => {
    return (
        <IntlProvider locale='en'>
            <DialogBox 
                title="Debates"
                content="Participate by writing your argument and earn eloquence points"
                isHidden={true}
            >
                <span>React child</span>
            </DialogBox>
        </IntlProvider>
    )
};