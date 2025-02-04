import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router';
import { ConfigProvider } from '@logora/debate.data.config_provider';
import { Location } from '@logora/debate.util.location';
import { SummaryContentBox } from './SummaryContentBox';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';
import { faker } from '@faker-js/faker';

const author = {
    image_url: faker.image.avatar(),
    full_name: faker.name.fullName(),
    hash_id: faker.lorem.slug(),
    slug: faker.lorem.slug(),
    points: 52,
    role:"contributor",
    last_activity: new Date(),
    description: faker.name.jobTitle()
}
  
const argument = {
    id: 43,
    author: author,
    title: faker.lorem.sentence(1),
    created_at: faker.date.recent(),
    content: faker.lorem.sentences(5),
    position: {
      name: faker.lorem.word()
    }
}
  
const debateUrl = faker.internet.url() + "/#argument_" + argument.id;
  
const routes = {
    userShowLocation: new Location('espace-debat/user/:userSlug', { userSlug: '' })
};
  
describe('SummaryContentBox', () => {
    it('renders basic info correctly', () => {
        const { getByText, queryByText } = render(
            <BrowserRouter>
                <ConfigProvider routes={{ ...routes }}>
                    <IconProvider library={regularIcons}>
                        <IntlProvider locale="en">
                            <SummaryContentBox 
                                author={author} 
                                tag={argument.position?.name}
                                date={argument.created_at}
                                content={argument.content}
                                link={debateUrl}
                                tagClassName="argument-for"
                            />
                        </IntlProvider>
                    </IconProvider>
                </ConfigProvider>
            </BrowserRouter>
        );

        expect(getByText(argument.author.full_name)).toBeInTheDocument();
        expect(getByText(argument.position.name)).toBeInTheDocument();
        expect(getByText("52 points")).toBeInTheDocument();
        expect(getByText(argument.content.slice(0, 50), { exact: false })).toBeInTheDocument();
        expect(queryByText(argument.title)).not.toBeInTheDocument();
        // const readMoreLink = screen.getByText("Read more").parentElement;
        // expect(readMoreLink.href).toBe(debateUrl);
    });

    it('renders title if passed', () => {
        const { getByText, queryByText } = render(
            <BrowserRouter>
                <ConfigProvider routes={{ ...routes }}>
                    <IconProvider library={regularIcons}>
                        <IntlProvider locale="en">
                            <SummaryContentBox 
                                author={author} 
                                tag={argument.position?.name}
                                date={argument.created_at}
                                title={argument.title}
                                content={argument.content}
                                link={debateUrl}
                                tagClassName="argument-for"
                            />
                        </IntlProvider>
                    </IconProvider>
                </ConfigProvider>
            </BrowserRouter>
        );

        expect(getByText(argument.content.slice(0,50), { exact: false })).toBeInTheDocument();
        expect(queryByText(argument.title)).toBeInTheDocument();
    });

    it('renders header in one line if headerOneLine prop is true', () => {
        const { getByText, queryByText } = render(
            <BrowserRouter>
                <ConfigProvider routes={{ ...routes }}>
                    <IconProvider library={regularIcons}>
                        <IntlProvider locale="en">
                            <SummaryContentBox 
                                author={author} 
                                tag={argument.position?.name}
                                date={argument.created_at}
                                content={argument.content}
                                link={debateUrl}
                                headerOneLine
                            />
                        </IntlProvider>
                    </IconProvider>
                </ConfigProvider>
            </BrowserRouter>
        );

        expect(getByText(argument.author.full_name)).toBeInTheDocument();
        expect(getByText(argument.position.name)).toBeInTheDocument();
        expect(queryByText(argument.author.points)).not.toBeInTheDocument();
    });

    it('does not render the footer if showFooter prop is false', () => {
        const { queryByText } = render(
            <BrowserRouter>
                <ConfigProvider routes={{ ...routes }}>
                    <IconProvider library={regularIcons}>
                        <IntlProvider locale="en">
                            <SummaryContentBox 
                                author={author} 
                                tag={argument.position?.name}
                                date={argument.created_at}
                                content={argument.content}
                                link={debateUrl}
                                contentCount={12}
                                showFooter={false}
                            />
                        </IntlProvider>
                    </IconProvider>
                </ConfigProvider>
            </BrowserRouter>
        );

        const expectedLinkText = `Read 12 arguments "${argument.position.name}"`;
        expect(queryByText(expectedLinkText)).not.toBeInTheDocument();
    });

    it('renders the footer if showFooter prop is true', () => {
        const { getByText } = render(
            <BrowserRouter>
                <ConfigProvider routes={{ ...routes }}>
                    <IconProvider library={regularIcons}>
                        <IntlProvider locale="en">
                            <SummaryContentBox 
                                author={author} 
                                tag={argument.position?.name}
                                date={argument.created_at}
                                content={argument.content}
                                link={debateUrl}
                                contentCount={12}
                                showFooter
                            />
                        </IntlProvider>
                    </IconProvider>
                </ConfigProvider>
            </BrowserRouter>
        );

        const expectedLinkText = `Read 12 arguments "${argument.position.name}"`;
        expect(getByText(expectedLinkText)).toBeInTheDocument();
    });
});