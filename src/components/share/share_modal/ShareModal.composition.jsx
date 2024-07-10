import React from 'react';
import { ShareModal } from './ShareModal';
import { ModalProvider } from '@logora/debate.dialog.modal';
import { IntlProvider } from 'react-intl';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';

export const DefaultShareModal = () => {
    return (
        <div style={{width:"300px", height: "300px"}}>
            <IntlProvider locale="en">
                <IconProvider library={regularIcons}>
                    <ModalProvider>
                        <ShareModal
                            title="Modal title"
                            shareUrl="https://app.logora.fr/share/p/48656"
                            shareText="Text"
                            shareTitle="Title"
                            shareCode='<iframe src="https://api.logora.fr/embed.html?shortname="[...]'
                            showShareCode={true}
                        />
                    </ModalProvider>
                </IconProvider>
            </IntlProvider>
        </div>
    );
};