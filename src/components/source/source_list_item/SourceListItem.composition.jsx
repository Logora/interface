import React from 'react';
import { SourceListItem } from './SourceListItem';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';

export const DefaultSourceListItem = () => {
    return (
        <IconProvider library={regularIcons}>
            <SourceListItem 
                publisher={"source.com"} 
                url={"https://source.com"} 
                title={"Source list item component"} 
                index={0}
            />
        </IconProvider>
    )
};

export const LineClampedSourceListItem = () => {
    return (
        <div style={{width: "250px"}}>
            <IconProvider library={regularIcons}>
                <SourceListItem 
                    publisher={"source.com"} 
                    url={"https://source.com"} 
                    title={"Super long title article, Super long title article, Super long title article, Super long title article, Super long title article, Super long title article"} 
                    index={0}
                />
            </IconProvider>
        </div>
    )
};