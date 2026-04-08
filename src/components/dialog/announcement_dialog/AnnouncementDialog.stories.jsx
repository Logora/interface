import React from 'react';
import { AnnouncementDialog } from './AnnouncementDialog';
import HomeIcon from './HomeIcon.dev';
import { IconProvider } from '@logora/debate/icons/icon_provider';
import * as regularIcons from '@logora/debate/icons/regular_icons';

export default {
    title: 'Dialog/Announcement Dialog',
    component: AnnouncementDialog,
    args: {
        message: 'An announcement message !',
        fullWidth: false,
        useCustomIcon: false
    },
    argTypes: {
        message: { control: 'text' },
        fullWidth: { control: 'boolean' },
        useCustomIcon: { control: 'boolean' }
    },
    render: ({ useCustomIcon, ...args }) => (
        <IconProvider library={regularIcons}>
            <AnnouncementDialog
                {...args}
                icon={useCustomIcon ? HomeIcon : undefined}
            />
        </IconProvider>
    )
};

export const DefaultAnnouncementDialog = {};

export const AnnouncementDialogCustomIcon = {
    args: {
        useCustomIcon: true,
        message: 'An announcement message width custom icon !'
    }
};

export const AnnouncementDialogFullWidth = {
    args: {
        fullWidth: true,
        message: 'An announcement message with full width !'
    }
};
