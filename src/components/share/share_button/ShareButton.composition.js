import React from 'react';
import { ShareButton } from './ShareButton';
import { IntlProvider } from 'react-intl';
import { ConfigProvider } from '@logora/debate.data.config_provider';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';

export const DefaultShareButton = () => {
    return (
        <IntlProvider locale="en">
            <ConfigProvider config={{theme:{}}}>
                <IconProvider library={regularIcons}>
                    <ShareButton shareUrl={"https://example.fr/test/"} shareTitle="Share this !" shareText={"You should check this interesting link"} />
                </IconProvider>
            </ConfigProvider>
        </IntlProvider>
    );
};

export const ShareButtonWithText = () => {
    return (
        <IntlProvider locale="en">
            <ConfigProvider config={{theme:{}}}>
                <IconProvider library={regularIcons}>
                    <ShareButton showText shareUrl={"https://example.fr/test/"} shareTitle="Share this !" shareText={"You should check this interesting link"} />
                </IconProvider>
            </ConfigProvider>
        </IntlProvider>
    );
};