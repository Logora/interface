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
                isCollapsedByDefault={false}
            >
                <div>Voici le contenu de la section.</div>
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
            <div>Voici le contenu de la section.</div>
        </SectionBox>
    );
};

