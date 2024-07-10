import React from 'react';
import { IntlProvider } from 'react-intl';
import { ContextSourceBox } from './ContextSourceBox';
import { faker } from '@faker-js/faker';

const source = {
    imageUrl: faker.image.nature(),
    author: faker.vehicle.manufacturer(),
    date: faker.date.recent(),
    title: faker.music.songName()
}

export const DefaultContextSourceBox = () => {
    return (
        <IntlProvider locale="en">
            <ContextSourceBox 
                imageUrl={source.imageUrl}
                author={source.author}
                date={source.date}
                title={source.title}
            />
        </IntlProvider>
    );
};

export const ContextSourceBoxWithoutAuthor = () => {
    return (
        <IntlProvider locale="en">
            <ContextSourceBox 
                imageUrl={source.imageUrl}
                date={source.date}
                title={source.title}
            />
        </IntlProvider>
    );
};