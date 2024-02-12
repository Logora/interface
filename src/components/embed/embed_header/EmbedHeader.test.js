import React from 'react';
import { render, screen } from '@testing-library/react';
import { EmbedHeader } from './EmbedHeader';
import { IntlProvider } from 'react-intl';
import { faker } from '@faker-js/faker';

const title = 'Test Title';
const titleRedirectUrl = '/test-url';
const headerLabel = 'Test Label';
const onlineUsersCount = 5;
const textLeft = true;
const logo = faker.image.cats();

describe('EmbedHeader', () => {
    it('renders header label, title and link with correct href value', () => {
        const { getByText } = render(
            <IntlProvider locale="en">
                <EmbedHeader title={title} titleRedirectUrl={titleRedirectUrl} headerLabel={headerLabel} />
            </IntlProvider>
        );
        expect(getByText(headerLabel)).toBeInTheDocument();
        expect(getByText(title)).toBeInTheDocument();
        expect(screen.getByText(/Test Title/i).closest('a')).toHaveAttribute('href', '/test-url');
    });

    it('renders online users count if provided', () => {
        const { getByTestId } = render(
            <IntlProvider locale="en">
                <EmbedHeader onlineUsersCount={onlineUsersCount} headerLabel={headerLabel} />
            </IntlProvider>
        );
        expect(getByTestId('online-users-count')).toHaveTextContent(`${onlineUsersCount} online users`);
        expect(getByTestId('online-users-count-mobile')).toHaveTextContent(`${onlineUsersCount} online`);
    });

    it('applies textLeft className when prop is provided', () => {
        const { getByTestId } = render(
            <IntlProvider locale="en">
                <EmbedHeader textLeft={textLeft} />
            </IntlProvider>
        );
        expect(getByTestId('debate-name')).toHaveClass('left');
    });

    it('renders only title', () => {
        const { queryByText } = render(
            <IntlProvider locale="en">
                <EmbedHeader title={title} titleRedirectUrl={titleRedirectUrl} />
            </IntlProvider>
        );
        expect(queryByText('Test Label')).toBeNull();
        expect(queryByText('online users')).toBeNull();
        expect(queryByText('Test Title')).toBeInTheDocument();
    });

    it('renders logo without header label', () => {
        const { queryByText, getByAltText } = render(
            <IntlProvider locale="en">
                <EmbedHeader title={title} titleRedirectUrl={titleRedirectUrl} headerLabel={headerLabel} logoUrl={logo} logoAlt={"My Logo"}/>
            </IntlProvider>
        );
        expect(queryByText('Test Label')).toBeNull();
        expect(queryByText('online users')).toBeNull();
        expect(queryByText('Test Title')).toBeInTheDocument();

        const customLogo = getByAltText("My Logo");
        expect(customLogo).toBeInTheDocument();
        expect(customLogo).toHaveAttribute("src", logo);
    });
});
