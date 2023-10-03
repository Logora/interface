import React from 'react';
import { AnnouncementDialog } from './AnnouncementDialog';
import HomeIcon from './HomeIcon.dev'

export const DefaultAnnouncementDialog = () => {
    return (
        <AnnouncementDialog 
            message={"An announcement message !"}
        />
    );
};

export const AnnouncementDialogCustomIcon = () => {
    return (
        <AnnouncementDialog 
            icon={HomeIcon}
            message={"An announcement message width custom icon !"}
        />
    );
};

export const AnnouncementDialogFullWidth = () => {
    return (
        <AnnouncementDialog 
            message={"An announcement message with full width !"}
            fullWidth
        />
    );
};