import React from 'react';
import { SectionBox } from './SectionBox';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';




export const DefaultSectionBox = () => {
    return (

        <IconProvider library={regularIcons}>
            <SectionBox
                title="Section Title"
                isCollapsible={true}
                isExpandedByDefault={false}
            >
                <p>Voici le contenu de la section.</p>
            </SectionBox>
        </IconProvider>
    );
};
