import React from 'react';
import { BackLink } from './BackLink';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';

export const DefaultBackLink = () => {
    return (
        <IconProvider library={regularIcons}>
            <BackLink 
                to="#"
                text="Back to article"
            />
        </IconProvider>
    );
};