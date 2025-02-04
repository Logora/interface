import React from 'react';
import { MemoryRouter } from "react-router-dom";
import { IntlProvider } from 'react-intl';
import { render, screen } from '@testing-library/react';
import { InformationBox } from './InformationBox';
import { Suggestion } from '@logora/debate.icons.regular_icons';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';

it('should render with icon, title and description', () => {
	const container = render(
		<MemoryRouter>
            <IntlProvider locale="en">
                <IconProvider library={regularIcons}>
                    <InformationBox 
                        icon={<Suggestion />}
                        title={"Title"}
                        points={100} 
                        description={"Description"}
                        textLink={"View suggestions"}
                        link={"https://example.fr/test/"}
                        isActive={true}
                    />
                </IconProvider>
            </IntlProvider>
        </MemoryRouter>
	);
    expect(container.queryByTestId('icon')).toBeTruthy();
    expect(screen.getByText("Title")).toBeTruthy();
    expect(screen.getByText("Description")).toBeTruthy();
});

it('should render with link', () => {
	const container = render(
		<MemoryRouter>
            <IntlProvider locale="en">
                <IconProvider library={regularIcons}>
                    <InformationBox 
                        icon={<Suggestion />}
                        title={"Title"}
                        points={100} 
                        description={"Description"}
                        textLink={"View suggestions"}
                        link={"/link"}
                        isActive={true}
                    />
                </IconProvider>
            </IntlProvider>
        </MemoryRouter>
	);
    const link = screen.queryAllByRole("link");
    expect(link).toHaveLength(1);
    expect(link[0]).toHaveAttribute('href', '/link');
});

it('should render with disabled module text', () => {
	const container = render(
		<MemoryRouter>
            <IntlProvider locale="en">
                <IconProvider library={regularIcons}>
                    <InformationBox 
                        icon={<Suggestion />}
                        title={"Title"}
                        points={100} 
                        description={"Description"}
                        textLink={"View suggestions"}
                        link={"https://example.fr/test/"}
                    />
                </IconProvider>
            </IntlProvider>
        </MemoryRouter>
	);
    expect(screen.getByText("Module not available on this debate space")).toBeTruthy();
});

it('should render with points number', () => {
	const container = render(
		<MemoryRouter>
            <IntlProvider locale="en">
                <IconProvider library={regularIcons}>
                    <InformationBox 
                        icon={<Suggestion />}
                        title={"Title"}
                        points={100} 
                        description={"Description"}
                        textLink={"View suggestions"}
                        link={"https://example.fr/test/"}
                    />
                </IconProvider>
            </IntlProvider>
        </MemoryRouter>
	);
    expect(screen.getByText("From 100 eloquence points")).toBeTruthy();
});