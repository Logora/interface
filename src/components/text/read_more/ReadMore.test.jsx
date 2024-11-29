import React from 'react';
import { ReadMore } from './ReadMore';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { faker } from '@faker-js/faker';

let text = faker.lorem.paragraph(10);
let url = faker.internet.url();

describe('ReadMore', () => {
    it('should render the full content when not expandable', () => {
        render(
            <ReadMore
                content={text}
                expandable={false}
                readMoreText="Read more"
                readLessText="Read less"
            />
        );

        expect(screen.getByText(text)).toBeInTheDocument();
        expect(screen.queryByText(/Read more/i)).not.toBeInTheDocument();
    });

    describe('with charCount', () => {
        it('should expand and reduce text on click', async () => {
            render(
                <ReadMore
                    content={text}
                    charCount={250}
                    readMoreText="Read more"
                    readLessText="Read less"
                />
            );


            const readMoreButton = screen.queryByText(/Read more/i)
            expect(readMoreButton).toBeTruthy()
            expect(screen.queryByText(text)).not.toBeInTheDocument()

            await userEvent.click(readMoreButton)

            const readLessButton = screen.queryByText(/Read less/i)
            expect(readLessButton).toBeTruthy()
            expect(screen.getByText(text)).toBeInTheDocument()

            await userEvent.click(readLessButton)
            expect(readMoreButton).toBeTruthy()
            expect(screen.queryByText(text)).not.toBeInTheDocument()
        });

        it('should not show read more option if content is short', () => {
            const shortText = faker.lorem.words(3);

            render(
                <ReadMore
                    content={shortText}
                    charCount={250}
                    readMoreText="Read more"
                    readLessText="Read less"
                />
            );

            expect(screen.queryByText(/Read more/i)).not.toBeInTheDocument();
            expect(screen.getByText(shortText)).toBeInTheDocument();
        });
    })

    describe('with lineCount', () => {
        it('should not show read more option if content is short', () => {
            const shortText = faker.lorem.words(3);

            render(
                <ReadMore
                    content={shortText}
                    lineCount={4}
                    readMoreText="Read more"
                    readLessText="Read less"
                />
            );

            expect(screen.queryByText(/Read more/i)).not.toBeInTheDocument();
            expect(screen.getByText(shortText)).toBeInTheDocument();
        });

    })
});