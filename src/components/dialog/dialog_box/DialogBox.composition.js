import React from 'react';
import { IntlProvider } from 'react-intl';
import { DialogBox } from './DialogBox';

export const DefaultDialogBox = () => {
    return (
        <div style={{ width: "200px", height: "200px"}}>
            <IntlProvider locale='en'>
                <DialogBox 
                    isBottom
                    titleKey={"info.debates"} 
                    contentKey={"info.debate.first_time"}
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
                isBottom
                titleKey={"info.debates"} 
                contentKey={"info.debate.first_time"}
                isHidden={true}
            >
                <span>React child</span>
            </DialogBox>
        </IntlProvider>
    )
};