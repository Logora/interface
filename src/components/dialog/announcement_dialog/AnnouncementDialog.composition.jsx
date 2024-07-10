import React from 'react';
import { AnnouncementDialog } from './AnnouncementDialog';
import HomeIcon from './HomeIcon.dev';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';

export const DefaultAnnouncementDialog = () => {
    return (
        <IconProvider library={regularIcons}>
            <AnnouncementDialog 
                message={"An announcement message !"}
            />
        </IconProvider>
    );
};

export const AnnouncementDialogCustomIcon = () => {
    return (
        <IconProvider library={regularIcons}>
            <AnnouncementDialog 
                icon={HomeIcon}
                message={"An announcement message width custom icon !"}
            />
        </IconProvider>
    );
};

export const AnnouncementDialogFullWidth = () => {
    return (
        <IconProvider library={regularIcons}>
            <AnnouncementDialog 
                message={"An announcement message with full width !"}
                fullWidth
            />
        </IconProvider>
    );
};