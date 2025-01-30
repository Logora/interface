import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { SectionBox } from './SectionBox';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';

const callback = jest.fn();

it('should render with the correct text', () => {
	const section = render(
		<IconProvider library={regularIcons}>
			<SectionBox
				title="Section Title"
				subtitle="Sub Title"
			>
				<p>Voici le contenu de la section.</p>
			</SectionBox>
		</IconProvider>
	);
	const renderedSection = section.getByText(/section title/i);
	expect(renderedSection).toBeTruthy();
});

it('should toggle content visibility when clicked', () => {
	const { getByText, queryByText } = render(
		<IconProvider library={regularIcons}>
			<SectionBox
				title="Section Title"
				subtitle="Sub Title"
				isCollapsible={true}
				isCollapsedByDefault={false}
			>
				<p>Voici le contenu de la section.</p>
			</SectionBox>
		</IconProvider>
	);

	const expandedContent = getByText(/Voici le contenu de la section/i);
	expect(expandedContent).toBeTruthy();
});




