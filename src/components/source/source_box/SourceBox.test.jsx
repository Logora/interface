import React from 'react';
import { render } from '@testing-library/react';
import { SourceBox } from './SourceBox';
import { faker } from '@faker-js/faker';

const source = { 
    title: faker.music.songName(),
    description: faker.lorem.sentence(),
    url: faker.internet.url(),
    imageUrl: faker.image.nature(),
    publisher: faker.vehicle.manufacturer()
};

describe('SourceBox', () => {
    it('should render a source box with the correct text', () => {
        const sourceBox = render(
            <SourceBox
                title={source.title} 
                description={source.description}
                publisher={source.publisher}
                url={source.url}
                imageUrl={source.imageUrl}
            />
        );
        
        expect(sourceBox.getByText(source.publisher)).toBeTruthy();
        expect(sourceBox.getByText(source.title)).toBeTruthy();
        expect(sourceBox.getByText(source.description)).toBeTruthy();
    });
});