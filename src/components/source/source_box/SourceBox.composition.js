import React from 'react';
import { SourceBox } from './SourceBox';
import { faker } from '@faker-js/faker';

const source = { 
    title: faker.music.songName(),
    description: faker.lorem.sentence(),
    url: faker.internet.url(),
    imageUrl: faker.image.nature(),
    publisher: faker.vehicle.manufacturer()
};

export const DefaultSourceBox = () => {
    return (
        <SourceBox
            title={source.title} 
            description={source.description}
            publisher={source.publisher}
            url={source.url}
            imageUrl={source.imageUrl}
        />
    );
};