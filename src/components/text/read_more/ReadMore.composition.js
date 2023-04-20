import React from 'react';
import { ReadMore } from './ReadMore';
import { faker } from '@faker-js/faker';
import { IntlProvider } from 'react-intl';

let text = faker.lorem.paragraph(35);

export const DefaultReadMore = () => {
    return (
        <IntlProvider locale='en'>
            <ReadMore 
                content={text}
                contentCharCount={250}
                readMoreUrl={"https://google.fr"}
            />
        </IntlProvider>
    )
}

export const LineClampedReadMore = () => {
    return (
        <IntlProvider locale='en'>
            <ReadMore 
                content={text}
                contentCharCount={250}
                readMoreUrl={"https://google.fr"}
                lineCount={3}
            />
        </IntlProvider>
    )
}

export const NextLineReadMore = () => {
    return (
        <IntlProvider locale='en'>
            <ReadMore 
                content={text}
                contentCharCount={250}
                readMoreUrl={"https://google.fr"}
                nextLine={true}
                nextLineSpacing={30}
            />
        </IntlProvider>
    )
}

export const ButtonReadMore = () => {
    return (
        <IntlProvider locale='en'>
            <ReadMore 
                content={text}
                contentCharCount={250}
            />
        </IntlProvider>
    )
}

export const ButtonNextLineReadMore = () => {
    return (
        <IntlProvider locale='en'>
            <ReadMore 
                content={text}
                contentCharCount={250}
                nextLine={true}
            />
        </IntlProvider>
    )
}