import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ContextSourceList } from './ContextSourceList';
import { IntlProvider } from 'react-intl';
import { ResponsiveProvider } from '@logora/debate.hooks.use_responsive';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';
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

describe('ContextSourceList', () => {
    it('should render with the correct text', () => {
        const box = render(
            <IntlProvider locale="en">
                <ResponsiveProvider>
                    <IconProvider library={regularIcons}>
                        <ContextSourceList
                            sources={sources}
                        />
                    </IconProvider>
                </ResponsiveProvider>
            </IntlProvider>
        );
        fireEvent.click(screen.getByText("Debate context"));

        expect(screen.getByText("Debate context")).toBeTruthy();
        const links = screen.queryAllByRole("link");
        expect(links).toHaveLength(3);
        expect(screen.getByText(sources[0].title)).toBeTruthy();
        expect(screen.getByText(sources[1].title)).toBeTruthy();
        expect(screen.getByText(sources[2].title)).toBeTruthy();
        expect(links[0]).toHaveAttribute('href', sources[0].source_url);
        expect(links[1]).toHaveAttribute('href', sources[1].source_url);

    });
});