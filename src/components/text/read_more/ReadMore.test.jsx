import React from 'react';
import { ReadMore } from './ReadMore';
import { render, screen, fireEvent } from '@testing-library/react';
import { faker } from '@faker-js/faker';

let text = faker.lorem.paragraph(35);
let url = faker.internet.url();

it('should render correctly with sliced content', () => {
    render(
        <ReadMore 
            content={text}
            contentCharCount={250}
            to={url}
            readMoreText="Read more"
            readLessText="Read less"
            target="_top"
            external
        />
    );
    const slicedText = text.slice(0, 250) + "...";
    expect(screen.getByText(slicedText)).toBeTruthy();
    expect(screen.getByText("Read more")).toBeTruthy();
});

it('should render correctly with content even if content is shorter than contentCharCount', () => {
    render(
        <ReadMore 
            content={text}
            contentCharCount={2500}
            to={url}
            readMoreText="Read more"
            readLessText="Read less"
            target="_top"
            external
        />
    );
    expect(screen.getByText(text + "...")).toBeTruthy();
    expect(screen.getByText("Read more")).toBeTruthy();
});


it('should render correct url', () => {
    render(
        <ReadMore 
            content={text}
            contentCharCount={250}
            to={url}
            readMoreText="Read more"
            readLessText="Read less"
            target="_top"
            external
        />
    );
    const slicedText = text.slice(0, 250) + "...";
    expect(screen.getByText(slicedText)).toBeTruthy();
    expect(screen.getByRole('link').getAttribute('href')).toEqual(url);
});

it('should show all content when clicking on "Read more" if url is not provided', () => {
    render(
        <ReadMore 
            content={text}
            contentCharCount={250}
            readMoreText="Read more"
            readLessText="Read less"
        />
    );
    const slicedText = text.slice(0, 250) + "...";
    const readMoreButton = screen.getByText("Read more");
    expect(screen.getByText(slicedText)).toBeTruthy();

    fireEvent.click(readMoreButton);
    const readLessButton = screen.getByText("Read less");
    expect(screen.getByText(text + "...")).toBeTruthy();
    expect(readLessButton).toBeTruthy();
});

it('should toggle content when clicking on text', () => {
    render(
        <ReadMore 
            content={text}
            contentCharCount={250}
            readMoreText="Read more"
            readLessText="Read less"
        />
    );
    const slicedText = text.slice(0, 250) + "...";
    const contentElement = screen.getByText(slicedText);
    expect(contentElement).toBeTruthy();

    fireEvent.click(contentElement);
    expect(screen.getByText(text + "...")).toBeTruthy();
    expect(screen.getByText("Read less")).toBeTruthy();

    fireEvent.click(contentElement);
    expect(screen.getByText(slicedText)).toBeTruthy();
    expect(screen.getByText("Read more")).toBeTruthy();
});