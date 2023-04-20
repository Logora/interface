import React from 'react';
import { ExpandableText } from './ExpandableText';
import { faker } from '@faker-js/faker';

let text = faker.lorem.paragraph(35);

export const DefaultExpandableText = () => {
    return (
        <ExpandableText 
            expandable
            expandText={"Read more"}
            collapseText={"Read less"}
            maxHeight='20'
        >
            <div>
                {text}
            </div>
        </ExpandableText>
    )
}

export const DefaultDarkBackgroundExpandableText = () => {
    return (
        <div style={{ background: "#000", padding: "50px" }}>
            <ExpandableText 
                expandable
                expandText={"Read more"}
                collapseText={"Read less"}
                maxHeight='100'
                backgroundColor='#000'
            >
                <div style={{ color: "#FFF" }}>
                    {text}
                </div>
            </ExpandableText>
        </div>
    )
}