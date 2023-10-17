import React from 'react';
import { render, screen } from '@testing-library/react';
import { AnnouncementDialog } from './AnnouncementDialog';
import { Announcement } from '@logora/debate.icons.regular_icons';

describe('AnnouncementDialog', () => {
    it('should render with the correct text', () => {
        const dialog = render(
            <AnnouncementDialog 
                message={"An announcement message !"}
            />
        );
        expect(screen.getByText("An announcement message !")).toBeTruthy();
        expect(dialog.getByTestId('announcement-icon')).toBeTruthy();
        expect(dialog.queryByTestId('custom-icon')).toBeNull();
    });

    it('should render with the custom icon', () => {
        const dialog = render(
            <AnnouncementDialog 
                icon={Announcement}
                message={"An other announcement message !"}
            />
        );
        expect(screen.getByText("An other announcement message !")).toBeTruthy();
        expect(dialog.getByTestId('custom-icon')).toBeTruthy();
        expect(dialog.queryByTestId('announcement-icon')).toBeNull();
    });
});