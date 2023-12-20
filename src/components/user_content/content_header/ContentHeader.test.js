import React from 'react';
import { render } from '@testing-library/react';
import { faker } from '@faker-js/faker';
import { DefaultContentHeader, ContentHeaderWithoutTag, ContentHeaderWithoutDate, ContentHeaderWithOneLine, ContentHeaderWithoutLinks, ContentHeaderSelected } from './ContentHeader.composition';

const author = {
    image_url: 'https://via.placeholder.com/150',
    full_name: faker.name.fullName(),
    slug: faker.lorem.slug(),
    hash_id: faker.lorem.slug(),
    last_activity: faker.date.recent(),
    points: 1234,
    eloquence_title: 'gold',
    occupation: faker.name.jobTitle(),
}

const date = faker.date.past(2);
const tag = faker.name.jobType();

describe('ContentHeader component', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should render with correct data', () => {
        const { getByText, getByAltText, getAllByRole } = render(
            <DefaultContentHeader author={author} tag={tag} date={date} />
        );

        const avatarImg = getByAltText(author.full_name + "'s profile picture");
        expect(avatarImg).toBeInTheDocument();
        expect(avatarImg).toHaveAttribute('src', author.image_url);
        expect(getByText(author.full_name)).toBeInTheDocument();
        expect(getByText('1.2K points')).toBeInTheDocument();
        expect(getByText('Eloquence title')).toBeInTheDocument();
        expect(getByText(author.occupation)).toBeInTheDocument();
        
        const authorLinkElements = getAllByRole('link');
        expect(authorLinkElements.length).toBe(2);
        expect(authorLinkElements[0]).toHaveAttribute(
            'href',
            `/espace-debat/user/${author.hash_id}`
        );

        const tagElement = getByText(tag);
        expect(tagElement).toBeInTheDocument();

        const relativeTimeElement = getByText('1 month ago');
        expect(relativeTimeElement).toBeInTheDocument();
    });

    it('should not render tag if not present', () => {
        const { getByText, queryByText } = render(
            <ContentHeaderWithoutTag author={author} date={date} />
        );

        expect(getByText(author.full_name)).toBeInTheDocument();
        expect(queryByText(tag)).not.toBeInTheDocument();
    });

    it('should not render date if not present', () => {
        const { getByText, queryByTestId } = render(
            <ContentHeaderWithoutDate author={author} tag={tag} />
        );

        expect(getByText(author.full_name)).toBeInTheDocument();
        expect(queryByTestId('content-header-date')).toBeNull();
    });
  
    it('should render without links if disabledLinks is true', () => {
        const { getByText, queryByRole } = render(
            <ContentHeaderWithoutLinks author={author} tag={tag} date={date} disableLinks />
        );

        expect(getByText(author.full_name)).toBeInTheDocument();
        expect(queryByRole('link')).not.toBeInTheDocument();
    });

    it('should render with selected div if selectedContent is true', () => {
        const { getByText } = render(
            <ContentHeaderSelected author={author} tag={tag} date={date} selectedContent />
        );

        expect(getByText('Selected by editor')).toBeInTheDocument();
    });

    it('should render on one line if oneLine is true', () => {
        const { queryByText, getByText, queryByTestId } = render(
            <ContentHeaderWithOneLine author={author} tag={tag} date={date} oneLine />
        );

        expect(getByText(author.full_name)).toBeInTheDocument();
        expect(getByText(tag)).toBeInTheDocument();
        expect(queryByTestId('content-header-date')).not.toBeInTheDocument();
        expect(queryByText('1.2K points')).toBeNull();
    });
});
