import React from 'react';
import { ShareButton } from './ShareButton';
import { IntlProvider } from 'react-intl';
import { ConfigProvider } from '@logora/debate.data.config_provider';

export const DefaultShareButton = () => {
    return (
        <IntlProvider locale="en">
            <ConfigProvider config={{theme:{}}}>
                <ShareButton shareUrl={"https://example.fr/test/"} shareTitle="Share this !" shareText={"You should check this interesting link"} />
            </ConfigProvider>
        </IntlProvider>
    );
};

export const ShareButtonWithText = () => {
    return (
        <IntlProvider locale="en">
            <ConfigProvider config={{theme:{}}}>
                <ShareButton showText shareUrl={"https://example.fr/test/"} shareTitle="Share this !" shareText={"You should check this interesting link"} />
            </ConfigProvider>
        </IntlProvider>
    );
};