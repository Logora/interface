import React from 'react';
import { ShareBox } from './ShareBox';
import { IntlProvider } from 'react-intl';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';

export const DefaultShareBox = () => {
    return (
        <IntlProvider locale="en">
            <IconProvider library={regularIcons}>
                <ShareBox shareUrl={"https://example.fr/test/"} shareTitle="Share this !" shareText={"You should check this interesting link"} />
            </IconProvider>
        </IntlProvider>
    );
};

export const ShareBoxWithCodeShare = () => {
    return (
        <IntlProvider locale="en">
            <IconProvider library={regularIcons}>
                <ShareBox showShareCode shareUrl={"https://example.fr/test/"} shareTitle="Share this !" shareText={"You should check this interesting link"} />
            </IconProvider>
        </IntlProvider>
    );
};