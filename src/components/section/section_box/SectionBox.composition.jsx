import React from 'react';
import { SectionBox } from './SectionBox';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';


export const DefaultSectionBox = () => {
    return (

        <IconProvider library={regularIcons}>
            <SectionBox
                title="Section Title"
                subTitle="Ceci est une section"
                isCollapsible={true}
                isCollapsibleByDefault={false}
            >
                <p>Voici le contenu de la section.</p>
            </SectionBox>
        </IconProvider>
    );
};

export const NoCollapsibleSectionBox = () => {
    return (
        <SectionBox
            title="Section Non Repliable"
            subTitle="Ceci est une section"
            isCollapsible={false}
        >
            <p>Voici le contenu de la section.</p>
        </SectionBox>
    );
};

