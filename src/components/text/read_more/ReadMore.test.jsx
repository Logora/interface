import React from 'react';
import { ReadMore } from './ReadMore';
import { render, screen, fireEvent } from '@testing-library/react';
import { faker } from '@faker-js/faker';
import { IntlProvider } from 'react-intl';

let text = faker.lorem.paragraph(35);
let url = faker.internet.url();

it('should render correctly with sliced content', () => {
    render(
        <IntlProvider locale="en">
            <ReadMore 
                content={text}
                contentCharCount={250}
                readMoreUrl={url}
            />
        </IntlProvider>
    );
    const slicedText = text.slice(0, 250) + "...";
    expect(screen.getByText(slicedText)).toBeTruthy();
    expect(screen.getByText("Read more")).toBeTruthy();
});


it('should render correct url', () => {
    render(
        <IntlProvider locale="en">
            <ReadMore 
                content={text}
                contentCharCount={250}
                readMoreUrl={url}
            />
        </IntlProvider>
    );
    const slicedText = text.slice(0, 250) + "...";
    expect(screen.getByText(slicedText)).toBeTruthy();
    expect(screen.getByRole('link').getAttribute('href')).toEqual(url);
});

it('should show all content when clicking on "Read more" if url is not provided', () => {
    render(
        <IntlProvider locale="en">
            <ReadMore 
                content={text}
                contentCharCount={250}
                readMoreUrl={url}
            />
        </IntlProvider>
    );
    const slicedText = text.slice(0, 250) + "...";
    const readMoreButton = screen.getByText("Read more");
    expect(screen.getByText(slicedText)).toBeTruthy();
    expect(screen.getByRole('link').getAttribute('href')).toEqual(url);

    fireEvent.click(readMoreButton);
    expect(screen.getByText(slicedText)).toBeTruthy();
});