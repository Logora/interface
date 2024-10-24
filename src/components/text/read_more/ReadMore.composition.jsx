import React from 'react';
import { ReadMore } from './ReadMore';
import { faker } from '@faker-js/faker';

let text = faker.lorem.paragraph(35);
let url = faker.internet.url();

export const DefaultReadMore = () => {
    return (
        <ReadMore 
            content={text}
            contentCharCount={250}
            lineCount={4}
            readMoreText="Read more"
            readLessText="Read less"
            target="_top"
            external
        />
    )
}

export const LineClampedReadMore = () => {
    return (
        <ReadMore 
            content={text}
            contentCharCount={250}
            to={url}
            lineCount={3}
            readMoreText="Read more"
            readLessText="Read less"
            target="_top"
            external
        />
    )
}



export const ButtonReadMore = () => {
    return (
        <ReadMore 
            content={text}
            contentCharCount={250}
            readMoreText="Read more"
            readLessText="Read less"
            target="_top"
            external
        />
    )
}


export const ExpandableReadMore = () => {
    return (
        <ReadMore 
            content={text}
            contentCharCount={250}
            to={url}
            expandable={false}
            readMoreText="Read more"
            readLessText="Read less"
            target="_top"
            external
        />
    )
}