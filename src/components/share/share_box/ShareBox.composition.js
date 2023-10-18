import React from 'react';
import { ShareBox } from './ShareBox';
import { IntlProvider } from 'react-intl';

export const DefaultShareBox = () => {
    return (
        <IntlProvider locale="en">
            <ShareBox shareUrl={"https://example.fr/test/"} shareTitle="Share this !" shareText={"You should check this interesting link"} />
        </IntlProvider>
    );
};

export const ShareBoxWithCodeShare = () => {
    return (
        <IntlProvider locale="en">
            <ShareBox showShareCode shareUrl={"https://example.fr/test/"} shareTitle="Share this !" shareText={"You should check this interesting link"} />
        </IntlProvider>
    );
};