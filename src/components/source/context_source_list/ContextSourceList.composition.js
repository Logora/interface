import React from 'react';
import { IntlProvider } from 'react-intl';
import { ContextSourceList } from './ContextSourceList';
import { faker } from '@faker-js/faker';

const createSource = () => {
    return {
        id: faker.datatype.number(10000000),
        title: faker.music.songName(),
        source_url: faker.internet.url(),
        origin_image_url: faker.image.nature(),
        publisher: faker.vehicle.manufacturer(),
        published_date: faker.date.recent()
    };
};

const sources = Array.from([1, 2, 3], s => createSource());

export const DefaultContextSourceList = () => {
    return (
        <IntlProvider locale="en">
            <ContextSourceList sources={sources} />
        </IntlProvider>
    );
};