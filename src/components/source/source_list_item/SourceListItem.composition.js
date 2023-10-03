import React from 'react';
import { SourceListItem } from './SourceListItem';

export const DefaultSourceListItem = () => {
    return (
        <SourceListItem 
            publisher={"source.com"} 
            url={"https://source.com"} 
            title={"Source list item component"} 
            index={0}
        />
    )
};

export const LineClampedSourceListItem = () => {
    return (
        <div style={{width: "250px"}}>
            <SourceListItem 
                publisher={"source.com"} 
                url={"https://source.com"} 
                title={"Super long title article, Super long title article, Super long title article, Super long title article, Super long title article, Super long title article"} 
                index={0}
            />
        </div>
    )
};