import React from 'react';
import { render } from '@testing-library/react';
import { ContextSourceBox } from './ContextSourceBox';
import { IntlProvider } from 'react-intl';
import { faker } from '@faker-js/faker';

const source = {
    imageUrl: faker.image.nature(),
    author: faker.vehicle.manufacturer(),
    date: faker.date.recent(),
    title: faker.music.songName()
}

describe('ContextSourceBox', () => {
    it('should render with the correct text', () => {
        const box = render(
            <IntlProvider locale="en">
                <ContextSourceBox 
                    imageUrl={source.imageUrl}
                    author={source.author}
                    date={source.date}
                    title={source.title}
                />
            </IntlProvider>
        );
        expect(box.getByText(source.title)).toBeTruthy();
        expect(box.getByText(source.author)).toBeTruthy();
        expect(box.getByAltText('')).toHaveAttribute('src', source.imageUrl);
    });

    it('should render without author and separator if author empty', () => {
        const box = render(
            <IntlProvider locale="en">
                <ContextSourceBox 
                    imageUrl={source.imageUrl}
                    date={source.date}
                    title={source.title}
                />
            </IntlProvider>
        );
        expect(box.getByText(source.title)).toBeTruthy();
        expect(box.queryByText(source.author)).toBeNull();
        expect(box.queryByText("•")).toBeNull();
        expect(box.getByAltText('')).toHaveAttribute('src', source.imageUrl);
    });
});