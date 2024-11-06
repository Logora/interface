import React from 'react';
import { ReadMore } from './ReadMore';
import { faker } from '@faker-js/faker';

let text = faker.lorem.paragraph(40);
let url = faker.internet.url();

export const LineCountReadMore = () => {
    return (
        <ReadMore 
            content={text}
            lineCount={4}
            readMoreText="Read more"
            readLessText="Read less"
        />
    )
}

export const LineCountWithShortText = () => {
    const shortText = faker.lorem.words(3);

    return (
        <ReadMore 
            content={shortText}
            lineCount={4}
            readMoreText="Read more"
            readLessText="Read less"
        />
    );
};


export const CharCountReadMore = () => {
    return (
        <ReadMore 
            content={text}
            charCount={200}
            readMoreText="Read more"
            readLessText="Read less"
        />
    )
}

export const CharCountWithShortText = () => {
    const shortText = faker.lorem.words(3);

    return (
        <ReadMore 
            content={shortText}
            charCount={400}
            readMoreText="Read more"
            readLessText="Read less"
        />
    );
};

export const ReadMoreWithLink = () => {
    return (
        <ReadMore 
            content={text}
            lineCount={4}
            to={url}
            readMoreText="Read more"
            readLessText="Read less"
            target="_top"
            external
        />
    )
}

export const DisabledReadMore = () => {
    return (
        <ReadMore 
            content={text}
            contentCharCount={250}
            expandable={false}
            readMoreText="Read more"
            readLessText="Read less"
        />
    )
}