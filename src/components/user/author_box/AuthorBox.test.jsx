import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from '@logora/debate.data.config_provider';
import { IntlProvider } from 'react-intl';
import { AuthorBox } from './AuthorBox';
import { Location } from '@logora/debate.util.location';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';
import { faker } from '@faker-js/faker';

const author = {
    image_url: faker.image.avatar(),
    full_name: faker.name.fullName(),
    hash_id: faker.lorem.slug(),
    points: 52,
    eloquence_title: faker.science.chemicalElement().symbol,
    occupation: faker.vehicle.bicycle(),
    last_activity: faker.date.recent(),
    description: faker.name.jobTitle(),
  };
  

let UserShowLocation = new Location('espace-debat/user/:userSlug', { userSlug: "" })

const routes = {
    userShowLocation: UserShowLocation,
}

describe('AuthorBox', () => {
    it('should render with author data', () => {
        const { getByText, getByAltText, getAllByRole } = render(
            <BrowserRouter>
                <ConfigProvider config={{}} routes={{ ...routes }}>
                    <IntlProvider locale="en">
                        <IconProvider library={regularIcons}>
                            <AuthorBox
                                fullName={author.full_name}
                                avatarUrl={author.image_url}
                                slug={author.hash_id}
                                points={author.points}
                                eloquenceTitle={author.eloquence_title}
                                lastActivity={author.last_activity}
                                showBadge={false}
                            />
                        </IconProvider>
                    </IntlProvider>
                </ConfigProvider>
            </BrowserRouter>
        );

        const avatarImg = getByAltText(author.full_name + "'s profile picture");
        expect(avatarImg).toBeInTheDocument();
        expect(avatarImg).toHaveAttribute('src', author.image_url);
        expect(getByText(author.full_name)).toBeTruthy();
        //expect(getByText("1.5K points")).toBeTruthy();
        expect(getByText("Eloquence title")).toBeTruthy();

        const authorLinkElements = getAllByRole('link');
        expect(authorLinkElements.length).toBe(2);
        expect(authorLinkElements[0]).toHaveAttribute(
            'href',
            `/espace-debat/user/${author.hash_id}`
        );
    });

    it('should render without links', () => {
        const { getByText, queryByRole } = render(
            <BrowserRouter>
                <ConfigProvider routes={{ ...routes }}>
                    <IntlProvider locale="en">
                        <IconProvider library={regularIcons}>
                            <AuthorBox 
                                fullName={author.full_name}
                                avatarUrl={author.image_url}
                                slug={author.hash_id}
                                points={author.points}
                                eloquenceTitle={author.eloquence_title}
                                lastActivity={author.last_activity} 
                                showBadge={false}
                                disableLinks={true} 
                            />
                        </IconProvider>
                    </IntlProvider>
                </ConfigProvider>
            </BrowserRouter>
        );

        expect(getByText(author.full_name)).toBeTruthy();
        //expect(getByText("1.5K points")).toBeTruthy();
        expect(getByText("Eloquence title")).toBeTruthy();
        expect(queryByRole('link')).not.toBeInTheDocument();
    });

    it('should render occupation if author has one', () => {
        const { getByText } = render(
            <BrowserRouter>
                <ConfigProvider routes={{...routes}}>
                    <IntlProvider locale="en">
                        <IconProvider library={regularIcons}>
                            <AuthorBox 
                                fullName={author.full_name}
                                avatarUrl={author.image_url}
                                slug={author.hash_id}
                                points={author.points}
                                eloquenceTitle={author.eloquence_title}
                                lastActivity={author.last_activity} 
                                occupation={author.occupation}
                                showBadge={false}
                                disableLinks={true}
                            />
                        </IconProvider>
                    </IntlProvider>
                </ConfigProvider>
            </BrowserRouter>
        );

        expect(getByText(author.occupation)).toBeInTheDocument();
    });

    it('should show is expert', () => {
        const { getByText } = render(
            <BrowserRouter>
                <ConfigProvider routes={{ ...routes }}>
                    <IntlProvider locale="en">
                        <IconProvider library={regularIcons}>
                            <AuthorBox 
                                fullName={author.full_name}
                                avatarUrl={author.image_url}
                                slug={author.hash_id}
                                points={author.points}
                                eloquenceTitle={author.eloquence_title}
                                lastActivity={author.last_activity} 
                                occupation={author.occupation}
                                showBadge={true}
                            />
                        </IconProvider>
                    </IntlProvider>
                </ConfigProvider>
            </BrowserRouter>
        );

        expect(getByText('Journalist')).toBeInTheDocument();
    });

    it('should show deleted user', () => {
        const { queryByText, getByText } = render(
            <BrowserRouter>
                <ConfigProvider routes={{ ...routes }}>
                    <IntlProvider locale="en">
                        <IconProvider library={regularIcons}>
                            <AuthorBox 
                                fullName={author.full_name}
                                avatarUrl={author.image_url}
                                slug={author.hash_id}
                                points={author.points}
                                eloquenceTitle={author.eloquence_title}
                                lastActivity={author.last_activity} 
                                occupation={author.occupation}
                                isDeleted={true}
                            />
                        </IconProvider>
                    </IntlProvider>
                </ConfigProvider>
            </BrowserRouter>
        );

        expect(queryByText(author.full_name)).toBeNull();
        expect(getByText("Deleted")).toBeTruthy();
    });
});